import React from 'react'
import { ReactDOM } from 'react';
import { useState,useEffect } from 'react'
import fetchUser from '../components/fetchUser'
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import TeacherDropdown from '../components/TeacherDropdown';
import AdminDashboardNav from '../components/AdminDashboardNav';

export default function AdminAdd() {
    const { currentUser, loading} = useSelector((state) => state.user);
    const { user, error } = fetchUser(currentUser);
    const [course, setCourse] = useState(null);
    const [editCourses, setEditCourse] = useState(null);
    const [getCourse, setGetCourse] = useState(null);
    useEffect(() => {
      fetch(`http://localhost:3000/api/courseheader/courses`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
         // console.log('Fetched data:', data);
          setCourse(data);
     
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }, []);
    const editCourse = (course) => {
        setEditCourse(true);
        setGetCourse(course);
    }
   // console.log(getCourse)
  return (
    <>
    <div className="p-1 bg-slate-800 min-h-screen">
    <div className="flex justify-between mr-4 mt-3">
        <h1 className="text-white nunito font-semibold ml-[10rem] text-xl">Add Or Edit Courses</h1>
      <TeacherDropdown/>
    </div>
    <div className="flex mt-3">
    <AdminDashboardNav/>
    {editCourses && getCourse && 
    <div className="fixed z-50 inset-0 flex items-center justify-center ">
      <div className="bg-white">
        <h1>{getCourse.courseHeader}</h1>
  <form onSubmit={handleUpdate}>
    <input type="text" defaultValue={editingCourse.courseHeader} ref={courseHeaderRef} />
    <input type="text" defaultValue={editingCourse.courses.courseName} ref={courseNameRef} />
    <button type="submit">Update Course</button>
  </form>
      </div>
    </div>
    }
    <div className="grid grid-cols-4  pl-[4rem] pr-[5rem] gap-4 mt-3">
        {course && course.map((course,index) => (
            <div key={index}>
            <div className="bg-slate-700 rounded px-2 text-white nunito font-semibold flex justify-between items-center">
            <h2 className="text-xl font-medium uppercase dark:text-white">{course.courseHeader}</h2>
            <i class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer" onClick={() => editCourse(course)}></i>
            </div>
            </div>
        ))}
        
        <div className="flex items-center justify-between bg-slate-700 rounded h-fit px-2">
            <h1 className="nunito font-semibold text-xl text-white">Add New Course</h1>
        <i class="fa-solid fa-plus fa-xl text-white cursor-pointer" onClick={''}></i>
        </div>
    </div>
    </div>
    </div>
    </>
  )
}
