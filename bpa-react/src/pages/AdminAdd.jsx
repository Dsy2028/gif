import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect } from "react";
import fetchUser from "../components/fetchUser";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TeacherDropdown from "../components/TeacherDropdown";
import AdminDashboardNav from "../components/AdminDashboardNav";
import { useFetch ,createEditFunction,fetchData,  createCloseFunction } from "../functions/add.js";

export default function AdminAdd() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const { user, error } = fetchUser(currentUser);
  const [course, setCourse] = useState(null);
  const [editCourses, setEditCourse] = useState(null);
  const [getCourse, setGetCourse] = useState(null);
  const [add_course, setAddCourse] = useState(false);
  const [addItem, setAddItem] = useState([]);
  const [formData, setFormData] = useState({});
  const [units, setUnits] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [topics, setTopics] = useState(null);
  const [getQuestions, setQuestions] = useState(null);
  const [editLesson, setEditLessons] = useState(false);
  const [getLesson, setGetLesson] = useState(null);
  const [editUnit, setEditUnits] = useState(false);
  const [getUnit, setGetUnit] = useState(null);
  const [getTopic, setGetTopic] = useState(null);
  const [editTopic, setEditTopics] = useState(false);
  const [addCour, setAddCour] = useState(false);
  const [addUnit, setAddUnit] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [addLesson, setAddLesson] = useState(false);
  const[editCou, setEditCour] = useState(false);
  const[getCou, setGetCour] = useState(null);
  useFetch(`https://bpa-api1.onrender.com/api/courseheader/courses`, setCourse);
  useFetch(`https://bpa-api1.onrender.com/api/units/unit/getUnits`, setUnits);
  useFetch(`https://bpa-api1.onrender.com/api/lessons/getAllLessons`, setLessons);
  useFetch(`https://bpa-api1.onrender.com/api/topics/getAllTopics`, setTopics);
  useFetch(`https://bpa-api1.onrender.com/api/questions/getAllQuestions`, setQuestions);
  const editCourse = createEditFunction(setEditCourse, setGetCourse);
  const editCour = createEditFunction(setEditCour, setGetCour);
  
  
  const closeEditCourse = createCloseFunction(setEditCourse, setGetCourse, setFormData);
  const closeEditCour = createCloseFunction(setEditCour, setGetCour, setFormData);
  const closeEditUnit = createCloseFunction(setEditUnits, setGetUnit, setFormData);
  const editLessons =  createEditFunction(setEditLessons,setGetLesson)
  const editUnits =  createEditFunction(setEditUnits,setGetUnit)
  const editTopics =  createEditFunction(setEditTopics,setGetTopic)
  const closeEditTopics = createCloseFunction(setEditTopics, setGetTopic, setFormData);
  const addCourseHeader = () => {
    setAddCourse(true);
  };
  const addCourse = () => {
    setAddCour(true);
  }
  const unitAdd = () => {
    setAddUnit(true);
  }
  const close = () => {
    setAddCourse(false);
    setAddCour(false);
    setAddUnit(false);
    setAddLesson(false);
    setAddItem([]);
    setFormData("");
  };

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      setAddItem([...addItem, e.target.value]);
      e.target.value = "";
    }
  };
  /*const handleInputChange = (e) => {
    if (e.key === "Enter") {
      setAddItem(prevState => ({
        ...prevState,
        [e.target.id]: [...prevState[e.target.id] || [], e.target.value]
      }));
      e.target.value = "";
    }
  };*/
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const add_course_header_function = () => fetchData(`https://bpa-api1.onrender.com/api/courseheader/courses/add`, "POST", {
    courseHeader: formData.courseHeader,
    courses: addItem,
  });
  const add_course__function = () => fetchData(`https://bpa-api1.onrender.com/api/test/courses/add`, "POST", setFormData(""), close, {
    courseName: formData.courseName,
    units:addItem
  });
  const add_unit__function = () => fetchData(`https://bpa-api1.onrender.com/api/units/unit/add`, "POST", setFormData(""), close, {
    name: formData.name,
    course: formData.course,
    topics: addItem
  });
  const updateCourseHeader = (courseId) => fetchData(`https://bpa-api1.onrender.com/api/courseheader/courses/edit`, "POST",setFormData(""), close, {
    courseId: courseId,
          courseHeader: formData.courseHeader,
          courses: addItem
  });

  const updateCourse = (courseId) => fetchData(`https://bpa-api1.onrender.com/api/test/courses/edit`, "POST",setFormData(), close(), {
    courseId: courseId,
          courseName: formData.courseName,
          units: addItem
  });
 
  const deleteCourses = (courseId, coursesId) => fetchData(`https://bpa-api1.onrender.com/api/courseheader/courses/delete`, "DELETE", {
    courseId: courseId, course: coursesId
  });
  const deleteCourseHeader = (itemId) => fetchData(`https://bpa-api1.onrender.com/api/courseheader/delete`, "DELETE",setFormData(), close(), {
    courseId: itemId
  });
  const deleteCourse = (itemId) => fetchData(`https://bpa-api1.onrender.com/api/test/delete`, "DELETE",setFormData(), close(), {
    courseId: itemId
  });
  const deleteUnit = (itemId) => fetchData(`https://bpa-api1.onrender.com/api/units/delete`, "DELETE",setFormData(), close(), {
    unitId: itemId
  });

  const removeAdd =  (course) => {
    setAddItem(addItem.filter((item) => item !== course));
  }
 
 //.console.log(formData.courseName)
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
          {/**Course Header */}
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
                    id="courseHeader"
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
                      {addItem && addItem.length >= 1
                        ? `Courses Being Added`
                        : ""}
                    </h1>
                    <div className=" w-full flex-wrap gap-3">
                      {addItem &&
                        addItem.map((course, index) => (
                          <div key={index} className="bg-fuchsia-600 text-white px-2 rounded flex items-center justify-between mt-1">
                            <span className="">
                              {course}
                            </span>
                            <i class="fa-solid fa-xmark" onClick={() => removeAdd(course)}></i>
                          </div>
                        ))}
                    </div>
                  </div>
                  <h1 className="font-semibold text-xl nunito mt-3">
                    Delete Courses
                  </h1>
                  <span>
                    {getCourse && getCourse.courses.map((courses, index) => (
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
                  <button className="mt-5 w-full text-white bg-red-600 rounded" onClick={() => deleteCourseHeader(getCourse._id)}>Delete Course Header</button>
                  <button
                    className="mt-5 w-full text-white bg-fuchsia-600 rounded"
                    onClick={() => updateCourseHeader(getCourse._id)}
                  >
                    Update Course
                  </button>
                </div>
              </div>
            </div>
          )}
          {/**Course Header  ENd*/}
          {/**Courses */}
          {editCou && getCou && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
            <div className="bg-white rounded p-3">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl nunito font-semibold">
                  Edit: {getCou.courseName}
                </h1>
                <i
                  class="fa-solid fa-xmark fa-xl cursor-pointer"
                  onClick={closeEditCour}
                ></i>
              </div>
              <div className="flex flex-col">
                <h1>Edit Course Name </h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="courseName"
                  onChange={handleChange}
                />
                <h1>Add Units</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  onKeyDown={handleInputChange}
                />
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl font-semibold nunito">
                    {addItem && addItem.length >= 1
                      ? `Courses Being Added`
                      : ""}
                  </h1>
                  <div className=" w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
                        <div key={index} className="bg-fuchsia-600 text-white px-2 rounded flex items-center justify-between mt-1">
                            <span className="">
                              {course}
                            </span>
                            <i class="fa-solid fa-xmark" onClick={() => removeAdd(course)}></i>
                          </div>
                      ))}
                  </div>
                </div>
                <h1 className="font-semibold text-xl nunito mt-3">
                  Delete Courses
                </h1>
                <span>
                  {getCou && getCou.units.map((units, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-between"
                    >
                      <span>{units.name}</span>
                      <i
                        class="fa-solid fa-trash-can"
                        onClick={() =>
                          deleteCourses(getCou._id, units._id)
                        }
                      ></i>
                    </div>
                  ))}
                </span>
                <button className="mt-5 w-full text-white bg-red-600 rounded" onClick={() => deleteCourse(getCou._id)}>Delete Course Header</button>
                <button
                  className="mt-5 w-full text-white bg-fuchsia-600 rounded"
                  onClick={() => updateCourse(getCou._id)}
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
          )
          }
          {addCour && course && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
              <div className="bg-white rounded p-2 ">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="nunito font-semibold text-xl">Add A Course</h1>
                  <i class="fa-solid fa-xmark fa-xl" onClick={close}></i>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="courseName"
                    className="border-[1px] p-2 focus:outline-[1px] focus:outline-fuchsia-600 focus:shadow-sm focus:shadow-fuchsia-600"
                    placeholder="Course Name"
                    onChange={handleChange}
                  ></input>
                  <input
                    type="text"
                    className="border-[1px] p-2  focus:outline-[1px] focus:outline-fuchsia-600 focus:shadow-sm focus:shadow-fuchsia-600"
                    placeholder="Units"
                    onKeyDown={handleInputChange}
                  />
                </div>
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl">
                    {addItem && addItem.length >= 1
                      ? `Units Being Added`
                      : ""}
                  </h1>
                  <div className="flex w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
                        <div key={index} className="bg-fuchsia-600 text-white px-2 rounded flex items-center justify-between mt-1">
                            <span className="">
                              {course}
                            </span>
                            <i class="fa-solid fa-xmark" onClick={() => removeAdd(course)}></i>
                          </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="w-fit bg-fuchsia-600 text-white px-5 rounded"
                    onClick={() => add_course__function()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

          )}
          {/**Courses End */}
          {/**Units Start */}
          {editUnit && getUnit && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
            <div className="bg-white rounded p-3">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl nunito font-semibold">
                  Edit: {getUnit.name}
                </h1>
                <i
                  class="fa-solid fa-xmark fa-xl cursor-pointer"
                  onClick={closeEditUnit}
                ></i>
              </div>
              <div className="flex flex-col">
                <h1>Edit UnitName </h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="unitName"
                  onChange={handleChange}
                />
                <h1>Add Units</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  onKeyDown={handleInputChange}
                />
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl font-semibold nunito">
                    {addItem && addItem.length >= 1
                      ? `Courses Being Added`
                      : ""}
                  </h1>
                  <div className=" w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
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
                  {getUnit && getUnit.topics.map((topics, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-between"
                    >
                      <span>{topics.topicName}</span>
                      <i
                        class="fa-solid fa-trash-can"
                        onClick={() =>
                          deleteCourses(getUnit._id, topics._id)
                        }
                      ></i>
                    </div>
                  ))}
                </span>
                <button className="mt-5 w-full text-white bg-red-600 rounded" onClick={() => deleteUnit(getUnit._id)}>Delete Unit</button>
                <button
                  className="mt-5 w-full text-white bg-fuchsia-600 rounded"
                  onClick={() => updateCourse(getUnit._id)}
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
          )
          }
          {addUnit && units && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
              <div className="bg-white rounded p-2 ">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="nunito font-semibold text-xl">Add A Unit</h1>
                  <i class="fa-solid fa-xmark fa-xl" onClick={close}></i>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="name"
                    className="border-[1px] p-2 focus:outline-[1px] focus:outline-fuchsia-600 focus:shadow-sm focus:shadow-fuchsia-600"
                    placeholder="Course Name"
                    onChange={handleChange}
                  ></input>
                  <input
                    type="text"
                    id="course"
                    className="border-[1px] p-2 focus:outline-[1px] focus:outline-fuchsia-600 focus:shadow-sm focus:shadow-fuchsia-600"
                    placeholder="Course"
                    onChange={handleChange}
                  ></input>
                  <input
                    type="text"
                    className="border-[1px] p-2  focus:outline-[1px] focus:outline-fuchsia-600 focus:shadow-sm focus:shadow-fuchsia-600"
                    placeholder="topics"
                    onKeyDown={handleInputChange}
                  />
                </div>
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl">
                    {addItem && addItem.length >= 1
                      ? `Units Being Added`
                      : ""}
                  </h1>
                  <div className="flex w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
                        <div key={index} className="bg-fuchsia-600 text-white px-2 rounded flex items-center justify-between mt-1">
                            <span className="">
                              {course}
                            </span>
                            <i class="fa-solid fa-xmark" onClick={() => removeAdd(course)}></i>
                          </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="w-fit bg-fuchsia-600 text-white px-5 rounded"
                    onClick={() => add_unit__function()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

          )}
          {/**Units End */}
          {/**Lesson start */}
          {editLesson && getLesson && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
            <div className="bg-white rounded p-3">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl nunito font-semibold">
                  Edit: {getLesson.lessonName}
                </h1>
                <i
                  class="fa-solid fa-xmark fa-xl cursor-pointer"
                  onClick={closeEditUnit}
                ></i>
              </div>
              <div className="flex flex-col">
                <h1>Edit Name </h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="lessonName"
                  onChange={handleChange}
                />
                <h1>Edit Course Name</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="lessonCourseName"
                  onChange={handleChange}
                />
                 <h1>Edit Description</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="lessonCourseName"
                  onChange={handleChange}
                />
                <h1>Image</h1>
                <input type="radio"></input>
                <h1>Completion</h1>
                <input type="radio"></input>
                <h1>Add Units</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  onKeyDown={handleInputChange}
                />
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl font-semibold nunito">
                    {addItem && addItem.length >= 1
                      ? `Courses Being Added`
                      : ""}
                  </h1>
                  <div className=" w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
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
                  {getUnit && getUnit.topics.map((topics, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-between"
                    >
                      <span>{topics.topicName}</span>
                      <i
                        class="fa-solid fa-trash-can"
                        onClick={() =>
                          deleteCourses(getUnit._id, topics._id)
                        }
                      ></i>
                    </div>
                  ))}
                </span>
                <button className="mt-5 w-full text-white bg-red-600 rounded">Delete Unit</button>
                <button
                  className="mt-5 w-full text-white bg-fuchsia-600 rounded"
                  onClick={() => updateCourse(getUnit._id)}
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
          )
          }
          {addLesson && lessons && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
              <div className="bg-white rounded p-2  " style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="nunito font-semibold text-xl">Add A Lesson</h1>
                  <i class="fa-solid fa-xmark fa-xl" onClick={close}></i>
                </div>
                <div className="flex flex-col gap-4">
                <h1>Edit Name </h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="lessonName"
                  onChange={handleChange}
                />
                <h1>Edit Course Name</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="lessonCourseName"
                  onChange={handleChange}
                />
                 <h1>Edit Description</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="lessonCourseName"
                  onChange={handleChange}
                />
                <h1>Image</h1>
                <label className="flex gap-2">
                <input type="radio" name="math" value="math"></input>
                Math
                </label>
                <label className="flex gap-2">
                <input type="radio" name="math" value="math"></input>
                Straw
                </label>
                <label className="flex gap-2">
                <input type="radio" name="math" value="math"></input>
                Dragon
                </label>
                <label className="flex gap-2">
                <input type="radio" name="math" value="math"></input>
                Fishing Rod
                </label>
                <h1>Completion</h1>
                <input type="radio"></input>
                <input type="radio"></input>
                <input type="radio"></input>
                <input type="radio"></input>
                <h1>Add Units</h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  onKeyDown={handleInputChange}
                />
                </div>
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl">
                    {addItem && addItem.length >= 1
                      ? `Units Being Added`
                      : ""}
                  </h1>
                  <div className="flex w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
                        <div key={index} className="bg-fuchsia-600 text-white px-2 rounded flex items-center justify-between mt-1">
                            <span className="">
                              {course}
                            </span>
                            <i class="fa-solid fa-xmark" onClick={() => removeAdd(course)}></i>
                          </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="w-fit bg-fuchsia-600 text-white px-5 rounded"
                    onClick={() => add_unit__function()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

          )}
          {/**Lesson End */}
          {/**topicss start*/}
          {editTopic && getTopic && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
            <div className="bg-white rounded p-3">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl nunito font-semibold">
                  Edit: {getTopic.topicName}
                </h1>
                <i
                  class="fa-solid fa-xmark fa-xl cursor-pointer"
                  onClick={closeEditTopics}
                ></i>
              </div>
              <div className="flex flex-col">
                <h1>Edit Topic Name </h1>
                <input
                  type="text"
                  className="border-[1px] mb-3"
                  id="topicName"
                  onChange={handleChange}
                />
                <h1>Add Questions</h1>
                <input
                  type="text"
                  id="questions"
                  className="border-[1px] mb-3"
                  onKeyDown={handleInputChange}
                />
                <h1>Add Harder Questions</h1>
                <input
                  type="text"
                  id="harderQuestions"
                  className="border-[1px] mb-3"
                  onKeyDown={handleInputChange}
                />
                 <h1>Add Quiz Questions</h1>
                <input
                  type="text"
                  id="quiz"
                  className="border-[1px] mb-3"
                  onKeyDown={handleInputChange}
                />
                <div className="mt-4 flex flex-col ">
                  <h1 className="text-xl font-semibold nunito">
                    {addItem && addItem.length >= 1
                      ? `Courses Being Added`
                      : ""}
                  </h1>
                  <div className=" w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
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
                  {getTopic && getTopic.questions.map((question, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-between flex-wrap break-word"
                    >
                      <span>{question.questionText}</span>
                      <i
                        class="fa-solid fa-trash-can"
                        onClick={() =>
                          deleteCourses(getTopic._id, question._id)
                        }
                      ></i>
                    </div>
                  ))}
                  {getTopic && getTopic.harderQuestions.map((question, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-between"
                    >
                      <span>{question.questionText}</span>
                      <i
                        class="fa-solid fa-trash-can"
                        onClick={() =>
                          deleteCourses(getTopic._id, question._id)
                        }
                      ></i>
                    </div>
                      ))}
                </span>
                <button className="mt-5 w-full text-white bg-red-600 rounded">Delete Unit</button>
                <button
                  className="mt-5 w-full text-white bg-fuchsia-600 rounded"
                  onClick={() => updateCourse(getUnit._id)}
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
          )
          }
          {/**topicss end*/}
          
          {addQuestion && getQuestions &&
          <div>
          </div>

          }
          {add_course && course && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
              <div className="bg-white rounded p-2">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="nunito font-semibold text-xl">Add A Course</h1>
                  <i class="fa-solid fa-xmark fa-xl" onClick={close}></i>
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
                    {addItem && addItem.length >= 1
                      ? `Courses Being Added`
                      : ""}
                  </h1>
                  <div className="flex w-full flex-wrap gap-3">
                    {addItem &&
                      addItem.map((course, index) => (
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
                    onClick={() => add_course_header_function()}
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
                onClick={() => addCourseHeader()}
              ></i>
            </div>
          </div>
          <div className="pl-[8rem]  text-white nunito font-semibold mt-3 text-xl">
            <h1>Edit Courses</h1>
            {course && (
              <div className="  grid grid-cols-6 ">
                {course.map((course, index) => (
                  <div key={index} className=" ">
                    <div className=" rounded px-2 text-white nunito font-semibold flex justify-between items-center">
                      <div className=" w-full ">
                        {course.courses.map((course, index) => (
                          <div key={index} className="flex bg-slate-700 rounded px-2 py-1 w-full justify-between items-center mt-3">
                            <h1>{course.courseName}</h1>
                          <i
                        class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer"
                        onClick={() => editCour(course)}
                      ></i>
                          </div>
                          
                        ))} 
                      </div> 
                    </div>
                  </div>
                ))}
                <div className=" flex bg-slate-700 rounded px-2 py-1 justify-between items-center mt-3 w-full">
                  <h1 className="nunito font-semibold text-xl text-white">
                    Add New Course
                  </h1>
                  <i
                    class="fa-solid fa-plus fa-xl text-white cursor-pointer"
                    onClick={() => addCourse()}
                  ></i>
                  
                </div>
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
                       onClick={() => editUnits(unit)}
                      ></i>
                </div>
              </div>
            
            ))}
            <div className="bg-slate-700 rounded flex justify-between items-center py-1 px-1">
              <h1>Add Unit</h1>
              <i
                    class="fa-solid fa-plus fa-xl text-white cursor-pointer"
                    onClick={() => unitAdd()}
                  ></i>
            </div>
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
            <div className="bg-slate-700 rounded flex justify-between items-center py-1 px-1">
              <h1>Add Lesson</h1>
              <i
                    class="fa-solid fa-plus fa-xl text-white cursor-pointer"
                    onClick={() => setAddLesson(true)}
                  ></i>
            </div>
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
                        onClick={() => editTopics(topic)}
                      ></i>
                </div>
              </div>
            
            ))}
            <div className="bg-slate-700 rounded flex justify-between items-center py-1 px-1">
              <h1>Add Topic</h1>
              <i
                    class="fa-solid fa-plus fa-xl text-white cursor-pointer"
                    onClick={() => addTopic(true)}
                  ></i>
            </div>
          </div>
          </div>
          <div className="pl-[8rem] text-white nunito font-semibold  mt-3 text-xl">
            <h1 className="text-2xl">Edit Questions</h1>
            <div className="grid grid-cols-6 gap-3">
              {getQuestions && getQuestions.map((question, index) => (
                <div key={index} className="bg-slate-700  p-1 rounded">
                <div className=" flex break-words flex-wrap " >
                  <h1>{question.questionText}</h1>
                </div>
                <button className="bg-fuchsia-600 w-fit px-2 rounded mt-2" onClick={() => setAddQuestion(true)}>Edit</button>
                </div>
              ))}
              <div className="bg-slate-700 rounded flex justify-between items-center py-1 px-1">
              <h1>Add Question</h1>
              <i
                    class="fa-solid fa-plus fa-xl text-white cursor-pointer"
                    onClick={() => addQuestion(true)}
                  ></i>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
