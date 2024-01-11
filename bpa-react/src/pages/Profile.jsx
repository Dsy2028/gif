import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProfilePicture from "../imgs/police.svg";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { XYPlot, RadialChart } from "react-vis";
import Calender from "./Calender.jsx";
import PropTypes from "prop-types";
import Footer from "../components/Footer.jsx";
import { useDispatch } from "react-redux";
import { updateUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart, updateUserStart } from '../redux/user/userSlice.js';
import straw from "../imgs/straw.png"
import doffy from "../imgs/doffy.png"
import ousen from "../imgs/ousen.webp"
import jojo from "../imgs/jojo.png"
import fishing from "../imgs/fishing.png"
import dragon from "../imgs/dragon.png"
import fetchUser from "../components/fetchUser.js";

export default function Profile() {
  /*
        allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
      */

  const Ref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading} = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [teacher, setTeacher] = useState(null);
  //const [user, setUser] = useState(null);
  const { studentId } = useParams();
  const [awardCounts, setAwardCounts] = useState(null);
  const [strawCount, setStrawCount] = useState(0);
  const [doffyCount, setDoffyCount] = useState(0);
  const { user, error } = fetchUser(currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
          setFile(undefined);
          setFilePerc(0);

          fetch(`http://localhost:3000/api/user/update/${studentId}`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar: downloadUrl }),
          })
            .then((response) => response.json())
            .then((data) => {
              dispatch(updateUserSuccess(data));
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    );
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/classes/${studentId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
        } else {
          console.error("Fetched data is empty or no classes");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  //user.completedLessons.map(lesson => console.log(lesson.lessonId));
  useEffect(() => {
    if (user) {
      const strawCount = user.awards.filter(award => award.award === 'straw').length;
      const doffyCount = user.awards.filter(award => award.award === 'doffy').length;
     // setAwardCounts(counts.awardCounts);
   //   console.log(counts.awardCounts);
      setStrawCount(strawCount);
      setDoffyCount(doffyCount);
     
     // console.log(awardCount);
    }
  }, [user]);
  // console.log(file);

  const openEdit = () => {
    setEdit(true);
    document.body.style.overflow = "hidden";
  };

  const closeEdit = () => {
    setEdit(false);
    document.body.style.overflow = "auto";
  };

 
 


  const deleteUser = async () => {
    const c = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!c) {
      return;
    }
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const update = async () => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(updateUserSuccess(data));
      closeEdit();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleOverlayClick = (e) => {
    if (e.target.className === "overlay") {
      closeEditProfilePopup();
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [activeTab, setActiveTab] = useState("My Courses");

  const date = new Date(currentUser.createdAt);
  const formattedDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;
  return (
    <>
    <div className="dark:bg-slate-800">
      {edit && (
        <div className="fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50  "></div>
      )}
      <div className="h-screen p-7">
        {edit && (
          <div className="fixed z-50 inset-0 flex items-center justify-center ">
            <div className="rounded mt-20 p-3 h-[40rem] w-[40rem] bg-white">
              <div className="flex justify-between items-center p-2 border-b-[1px] border-gray-200">
                <h1 className="text-3xl nunito ">Edit Profile</h1>
                <i
                  class="fa-solid fa-xmark fa-2xl cursor-pointer"
                  onClick={closeEdit}
                ></i>
              </div>
              <div className="mt-2 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Edit Photo</h1>
                <div>
                  <form>
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      ref={Ref}
                      hidden
                      accept="image/*"
                    ></input>
                    <img
                      onClick={() => Ref.current.click()}
                      src={currentUser && currentUser.avatar}
                      alt="profile-picture"
                      className="rounded-full cursor-pointer h-40 w-40 object-cover "
                    />
                  </form>
                  <div>
                    {filePerc > 0 && filePerc < 100 && (
                      <div className=" mt-4" style={{ width: "100%" }}>
                        <div
                          className="bg-sky-500 rounded-lg h-4"
                          style={{ width: `${filePerc}%` }}
                        ></div>
                      </div>
                    )}
                    {filePerc === 100 ? (
                      <span>Image Successfully Uploaded</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">First Name</h1>
                <input
                id="firstName"
                  type="text"
                  
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded w-full p-1"
                />
              </div>
              <div className="mt-4 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Last Name</h1>
                <input
                id="lastName"
                  type="text"
                 
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded w-full p-1"
                />
              </div>
              <div className="mt-3 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Email</h1>
                <input
                id="email"
                  type="text"
                 
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded ml-8 w-full p-1"
                />
              </div>
              <div className="mt-4 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Password</h1>
                <input
                id="password"
                  type="text"
                  name="password"
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded w-full p-1"
                />
              </div>
              <div className=" flex justify-between mt-[4.5rem]">
                <div>
                  <button
                    onClick={deleteUser}
                    className="bg-red-500 rounded w-[8rem] "
                  >
                    Delete Account
                  </button>
                </div>
                <div className="">
                  <button className="w-[5rem] border-[1px] rounded mr-3">
                    Cancel
                  </button>
                  <button
                    className="w-[5rem] border-[1px] rounded main-color text-white dark:bg-violet-700"
                    onClick={update}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className=" ">
          <div className="profile__container  flex ">
            <div className="profile__avatar-container">
              <img
                className="profile__avatar rounded-full object-cover h-48 w-48"
                src={`${currentUser.avatar}`}
                alt="avatar"
              />
            </div>
            <div className="profile__info ml-4">
              <h1 className="profile__name dark:text-white">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <p className="profile__email dark:text-white">{currentUser.email}</p>
              <p className="profile__date dark:text-white">Joined on {formattedDate}</p>
              <button
                className="border-[1px] rounded w-[6rem] border-gray-200 mt-3 dark:text-white dark:bg-violet-700"
                onClick={openEdit}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="border-b-2  mt-5">
          <div className="flex">
            <h1
              className={` w-[8rem] text-center text-xl cursor-pointer dark:text-white ${
                activeTab === "My Courses" ? "border-blue-500 border-b-2" : ""
              }`}
              onClick={() => setActiveTab("My Courses")}
            >
              My Courses
            </h1>
            <h1
              className={`w-[7rem]  text-center text-xl cursor-pointer dark:text-white ${
                activeTab === "Progress" ? "border-blue-500 border-b-2 " : ""
              }`}
              onClick={() => setActiveTab("Progress")}
            >
              Progress
            </h1>
            <h1
              className={`w-[7rem] text-center text-xl cursor-pointer dark:text-white  ${
                activeTab === "Teachers" ? "border-blue-500 border-b-2" : ""
              }`}
              onClick={() => setActiveTab("Teachers")}
            >
              Teachers
            </h1>
          </div>
        </div>
        <div className={`${activeTab === "Teachers" ? "block " : "hidden"}`}>
          { user && (
            <div>
              <h1 className="text-2xl nunito mt-3">Teachers</h1>
              <div className="grid grid-cols-3 gap-5 mt-3">
                {user.classes.map((teacher, index) => (
                  <div key={index} className="border-[1px] rounded p-2 dark:bg-slate-700 dark:border-none">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={teacher.teacher.avatar}
                          alt="teacher-avatar"
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div className="ml-2">
                          <h1 className="text-xl">
                            {teacher.teacher.firstName}{" "}
                            {teacher.teacher.lastName}
                          </h1>
                          <h1 className="text-lg">{teacher.email}</h1>
                        </div>
                      </div>
                      <Link
                        to={`/prof/${teacher._id}`}
                        className="btn btn-neutral btn-xs sm:btn-sm md:btn-md "
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={`  ${activeTab === "Progress" ? "block " : "hidden"}`}>
          <div className="grid mt-3 grid-cols-4 gap-5">
            <div className="border-[1px] rounded dark:bg-slate-700 dark:border-none">
              <h1 className="nunito text-2xl dark:text-white">Badges</h1>
              {user && <div className="grid   p-3">
                <div className="grid grid-rows-4 ">
                <div className=" flex items-center dark:text-white">
                  <img className="h-9 " src={straw}/>: {strawCount}
                  </div>
    <div className=" flex items-center ml-2 dark:text-white"> <img className="h-9 " src={doffy}/>: {doffyCount}</div>
    <div className=" flex items-center ml-2 dark:text-white"> <img className="h-9 " src={doffy}/>: {doffyCount}</div>
    <div className=" flex items-center ml-2 dark:text-white"> <img className="h-9 " src={doffy}/>: {doffyCount}</div>
    <div className=" flex items-center ml-2 dark:text-white"> <img className="h-9 " src={doffy}/>: {doffyCount}</div>
                </div>
                </div>}
            </div>
            <div className="border-[1px] rounded dark:bg-slate-700 dark:border-none">
              <h1 className="nunito text-2xl dark:text-white">Completed Lessons</h1>
              {user && user.completedLessons.map((key,index) => (
                <div key={index}>
                  
                  <h1>{key.lessonId.topicName}</h1>
                  {/*key.lessonId.map((lesson, index) => (
                    <div key={index}>

                    </div>
                  ))*/}


                </div>

              ))}
                
                
            </div>
            <div className="border-[1px] rounded dark:bg-slate-700 dark:border-none">
              <h1 className="nunito text-2xl dark:text-white">Non-Completed Lessons</h1>
            </div>
            <div className="border-[1px] rounded dark:bg-slate-700 dark:border-none">
              <h1 className="nunito text-2xl dark:text-white">Time Spent</h1>
            </div>
          </div>
        </div>
        <div className={`${activeTab === "My Courses" ? "block" : "hidden"}`}>
          {user && 
          <div className="">
            {user.classes.map((course, index) => (
              <div key={index} className="">
                <div className="flex gap-9 mt-2 flex-wrap">
                  {course.courses.map((topic, index) => (
                    <div key={index} className="">
                      <h1 className="text-xl nunito font-semibold dark:text-white ">{topic.courseName}</h1>
                    <div>
                     {topic.units.map((unit, index) => (
                        <div key={index} className="">
                          <Link className="nunito dark:text-slate-300" to={`/courses/${topic.courseName}`}>{unit.name}</Link>
                        </div>
                     ))}
                      
                    </div>
                    </div>
                  ))}
                  </div>

                </div>

            ))}
          </div> 
          }
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
}

