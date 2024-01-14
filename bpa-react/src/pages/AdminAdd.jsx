import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect } from "react";
import fetchUser from "../components/fetchUser";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TeacherDropdown from "../components/TeacherDropdown";
import AdminDashboardNav from "../components/AdminDashboardNav";

export default function AdminAdd() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const { user, error } = fetchUser(currentUser);
  const [course, setCourse] = useState(null);
  const [editCourses, setEditCourse] = useState(null);
  const [getCourse, setGetCourse] = useState(null);
  const [add_course, setAddCourse] = useState(false);
  const [addCourses, setaddCourses] = useState([]);
  const [formData, setFormData] = useState({});
  const [units, setUnits] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [topics, setTopics] = useState(null);
  const [editLesson, setEditLessons] = useState(false);
  const [getLesson, setGetLesson] = useState(null);
  const [editUnit, setEditUnits] = useState(false);
  const [getUnit, setGetUnit] = useState(null);
  const [getTopic, setGetTopic] = useState(null);
  const [editTopic, setEditTopics] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/courseheader/courses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Fetched data:', data);
        setCourse(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/units/unit/getUnits`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setUnits(data);
     // console.log(data)
    })
    .catch((error) => {
      console.error('error' ,error);
    });
  }, [])
  useEffect(() => {
    fetch(`http://localhost:3000/api/lessons/getAllLessons`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setLessons(data);
      //console.log(data)
    })
    .catch((error) => {
      console.error('error' ,error);
    });
  }, [])
  useEffect(() => {
    fetch(`http://localhost:3000/api/topics/getAllTopics`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setTopics(data)
     // console.log(data)
    })
    .catch((error) => {
      console.error('error' ,error);
    })
  }, []);
  const editCourse = (course) => {
    setEditCourse(true);
    setGetCourse(course);
  };
  const editLessons = (lesson) => {
    setEditLessons(true);
    setGetLesson(lesson);
  }
  const editUnits = (unit) => {
    setEditUnits(true);
    setGetUnit(unit);
  }
  const editTopics = (topic) => {
    setEditTopics(true);
    setGetTopic(topic);
  }
  const closeEditCourse = () => {
    setEditCourse(false);
    setGetCourse(null);
    setFormData("");
  };
  const addCourse = () => {
    setAddCourse(true);
  };
  const closeCourse = () => {
    setAddCourse(false);
    setaddCourses([]);
    setFormData("");
  };

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      setaddCourses([...addCourses, e.target.value]);
      e.target.value = "";
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const add_course_function = async () => {
    try {
      const res = await fetch(`/api/courseheader/courses/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseHeader: formData.courseHeader,
          courses: addCourses,
        }),
      });
      const data = await res.json();
      setFormData("");
      closeCourse();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateCourse = async (courseId) => {
    console.log(courseId);
    try {
      const res = await fetch(`/api/courseheader/courses/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
          courseHeader: formData.courseHead,
          courses: addCourses,
        }),
      });
      const data = await res.json();
      setFormData("");
      closeCourse();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteCourses = async (courseId, coursesId) => {
    try {
      const res = await fetch(`/api/courseheader/courses/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: courseId, course: coursesId }),
      });
      const data = await res.json();
      closeCourse();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOverlayClick = (e) => {
    if (e.target.className === "overlay") {
      closeEditProfilePopup();
    }
  };

  //console.log(formData.courseHead)
  //console.log(addCourses)
  return (
    <>
      <div className="p-1 bg-slate-800 min-h-screen">
        <div className="flex justify-between mr-4 mt-3">
          <h1 className="text-white nunito font-semibold ml-[10rem] text-xl">
            Add Or Edit Courses
          </h1>
          <TeacherDropdown />
        </div>
        <div className="flex mt-3 flex-col">
          <AdminDashboardNav />
          {editCourses && getCourse && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
              <div className="bg-white rounded p-3">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl nunito font-semibold">
                    Edit: {getCourse.courseHeader}
                  </h1>
                  <i
                    class="fa-solid fa-xmark fa-xl cursor-pointer"
                    onClick={closeEditCourse}
                  ></i>
                </div>
                <div className="flex flex-col">
                  <h1>Edit Course Header</h1>
                  <input
                    type="text"
                    className="border-[1px] mb-3"
                    id="courseHead"
                    onChange={handleChange}
                  />
                  <h1>Add Courses</h1>
                  <input
                    type="text"
                    className="border-[1px] mb-3"
                    onKeyDown={handleInputChange}
                  />
                  <div className="mt-4 flex flex-col ">
                    <h1 className="text-xl font-semibold nunito">
                      {addCourses && addCourses.length >= 1
                        ? `Courses Being Added`
                        : ""}
                    </h1>
                    <div className=" w-full flex-wrap gap-3">
                      {addCourses &&
                        addCourses.map((course, index) => (
                          <div key={index}>
                            <span className="bg-fuchsia-600 text-white px-2 rounded">
                              {course}{" "}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <h1 className="font-semibold text-xl nunito mt-3">
                    Delete Courses
                  </h1>
                  <span>
                    {getCourse.courses.map((courses, index) => (
                      <div
                        key={index}
                        className=" flex items-center justify-between"
                      >
                        <span>{courses.courseName}</span>
                        <i
                          class="fa-solid fa-trash-can"
                          onClick={() =>
                            deleteCourses(getCourse._id, courses._id)
                          }
                        ></i>
                      </div>
                    ))}
                  </span>
                  <button
                    className="mt-5 w-full text-white bg-fuchsia-600 rounded"
                    onClick={() => updateCourse(getCourse._id)}
                  >
                    Update Course
                  </button>
                </div>
              </div>
            </div>
          )}
          {add_course && course && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
              <div className="bg-white rounded p-2">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="nunito font-semibold text-xl">Add A Course</h1>
                  <i class="fa-solid fa-xmark fa-xl" onClick={closeCourse}></i>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="courseHeader"
                    className="border-[1px] p-2 focus:outline-[1px] focus:outline-fuchsia-600 focus:shadow-sm focus:shadow-fuchsia-600"
                    placeholder="Course Header"
                    onChange={handleChange}
                  ></input>
                  <input
                    type="text"
                    className="border-[1px] p-2  focus:outline-[1px] focus:outline-fuchsia-600 focus:shadow-sm focus:shadow-fuchsia-600"
                    placeholder="Courses"
                    onKeyDown={handleInputChange}
                  />
                </div>
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl">
                    {addCourses && addCourses.length >= 1
                      ? `Courses Being Added`
                      : ""}
                  </h1>
                  <div className="flex w-full flex-wrap gap-3">
                    {addCourses &&
                      addCourses.map((course, index) => (
                        <div key={index}>
                          <span className="bg-fuchsia-600 text-white px-2 rounded">
                            {course}{" "}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="w-fit bg-fuchsia-600 text-white px-5 rounded"
                    onClick={() => add_course_function()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-4  pl-[8rem] pr-[5rem] gap-4 mt-3 ">
            {course &&
              course.map((course, index) => (
                <div key={index}>
                  <div className="bg-slate-700 rounded px-2 text-white nunito font-semibold flex justify-between items-center">
                    <h2 className="text-xl font-medium uppercase dark:text-white">
                      {course.courseHeader}
                    </h2>
                    <i
                      class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer"
                      onClick={() => editCourse(course)}
                    ></i>
                  </div>
                </div>
              ))}

            <div className="flex items-center justify-between bg-slate-700 rounded h-fit px-2">
              <h1 className="nunito font-semibold text-xl text-white">
                Add New Course
              </h1>
              <i
                class="fa-solid fa-plus fa-xl text-white cursor-pointer"
                onClick={() => addCourse()}
              ></i>
            </div>
          </div>
          <div className="pl-[8rem]  text-white nunito font-semibold mt-3 text-xl">
            <h1>Edit Courses</h1>
            {course && (
              <div className="  grid grid-cols-6">
                {course.map((course, index) => (
                  <div key={index} className=" ">
                    <div className=" rounded px-2 text-white nunito font-semibold flex justify-between items-center">
                      <div className=" w-full ">
                        {course.courses.map((course, index) => (
                          <div key={index} className="flex bg-slate-700 rounded px-2 py-1 w-full justify-between items-center mt-3">
                            <h1>{course.courseName}</h1>
                          <i
                        class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer"
                        onClick={() => editCourse(course)}
                      ></i>
                          </div>
                          
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pl-[8rem] text-white nunito font-semibold mt-3 text-xl">
            <h1 className="mb-2">Edit Units</h1>
            <div className="grid grid-cols-4 gap-4">
            { units && units.map((unit,index) => (
              <div key={index} className=" ">
                <div className="bg-slate-700 rounded flex justify-between items-center py-1 px-1">
                  <h1>{unit.name}</h1>
                  <i
                        class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer"
                       
                      ></i>
                </div>
              </div>
            
            ))}
            </div>
          </div>
          <div className="pl-[8rem] text-white nunito font-semibold mt-3 text-xl">
            <h1>Edit Lessons</h1>
            <span className="text-sm">*these are going to be the same as the topics</span>
            <div className="grid grid-cols-4 gap-4">
            { lessons && lessons.map((lesson,index) => (
              <div key={index} className=" ">
                <div className="bg-slate-700 rounded flex justify-between items-center py-1 px-1">
                  <h1>{lesson.lessonName}</h1>
                  <i
                        class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer"
                       
                      ></i>
                </div>
              </div>
            
            ))}
          </div>
          </div>
          <div className="pl-[8rem] text-white nunito font-semibold mt-3 text-xl">
            <h1 className="text-2xl">Edit Topics</h1>
            <div className="grid grid-cols-4 gap-4">
            { topics && topics.map((topic,index) => (
              <div key={index} className=" ">
                <div className="bg-slate-700 rounded flex justify-between items-center py-1 px-1">
                  <h1>{topic.topicName}</h1>
                  <i
                        class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer"
                       
                      ></i>
                </div>
              </div>
            
            ))}
          </div>
          </div>
          <div className="pl-[8rem] text-white nunito font-semibold  mt-3 text-xl">
            <h1>Edit Questions</h1>
          </div>
        </div>
      </div>
    </>
  );
}
