import React from 'react'
import DashboardNav from '../components/DashboardNav'
import DashNav from '../components/DashNav'
import { useState } from 'react';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Classes() {
    const [showPopup, setShowPopup] = useState(false);
    const [code, setCode] = useState('');
    const [getCode, setGetCode] = useState({});
    const [hasCode, setHasCode] = useState(false);
    const [open, setOpenClass] = useState(false);
    const [className, setClassName] = useState('');
    const [classId, setClassId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [course, setCourse] = useState(false);
    const[topic, setTopic] = useState(false);
    const [test, setTest] = useState(null);
    const { currentUser } = useSelector(state => {
      return state.user;
    });
    const {teacherId} = useParams();
    const handleChange = (e) => {
      setClassName(e.target.value);
    };
    const generateCode = () => {
      const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let randomString = '';
      const length = 12;
      for (let i = 0; i < length; i++) {
        randomString += characters[Math.floor(Math.random() * characters.length)];
      }
      setCode(randomString);
      setShowPopup(true);
      createClass(randomString);
      
    }
    const createClass = async (code) => {
      const response = await fetch('http://localhost:3000/api/classes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code, teacher: currentUser._id })
      });
      const data = await response.json();
      
    };

    useEffect(() => {
      fetch(`http://localhost:3000/api/classes/${teacherId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setGetCode(data);
          setHasCode(true);
          console.log(data) // Update the condition
          data.forEach(classItem => {
            classItem.students.forEach(student => {
              console.log(student.firstName); // Log the email field of each student
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, []);
    
    
  /* useEffect(() => {
      if (getCode && getCode.length > 0) {
        getCode.forEach(classItem => {
          console.log(classItem.students.firstName); // Log the email field of each
        });
      }
    }, [getCode]);
*/

const selectCourse = () =>{
  setCourse(true);
  setTopic(false);
}

const selectTopic =  (course) => {
  setTopic(true);
  setTest(course.topics);
  setCourse(false);
}

const closeCourse = () => {
  setCourse(false);
}
    
  
    
    const closePopup = () => {
        document.querySelector('.popup').classList.add('animate__fadeOutDown', 'animate__animated' );
        setTimeout(() => {
          setShowPopup(false);
          window.location.reload();
        }, 500);
      }
      const openClass = (id) => {
        setClassId(id);
        setOpenClass(true);
      }
      const closeClass = () => {
        setOpenClass(false);
      }
      const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
      }


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (!classId) {
            console.error('Class ID is not defined');
            return;
          }
          const response = await fetch('/api/classes/className', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              className: className,
              classId: classId,
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setGetCode((prevGetCode) =>
            prevGetCode.map((classItem) =>
              classItem._id === classId ? { ...classItem, className: className } : classItem
            )
          );
          setOpenClass(false);
          setClassName(''); 
        } catch (error) {
          console.error('Error updating class name:', error);
        }
      };

      const deleteClassName = async (classCodeToDelete) => {
        try {
          const response = await fetch('/api/classes/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              code: classCodeToDelete,
            }),
          });
          window.location.reload();
      
          if (!response.ok) {
          }
        } catch (error) {
          console.error('Error deleting class:', error);
        }
      };

      const courses = [
        { 
          name: 'Math: Pre-K - 8th Grade',
          topics: [
            { name: 'Pre-K', skills: 10 },
            { name: 'Early-Math', skills: 8 },
            { name: "2nd Grade", skills: 8 },
            { name: '3rd Grade', skills: 8 },
            { name: '4th Grade', skills: 8 },
            { name: '5th Grade', skills: 8 },
            { name: '6th Grade', skills: 8 },
            { name: '7th Grade', skills: 8 },
            { name: '8th Grade', skills: 8 },
          ]
        },
        { 
            name: "Math: High school+",
            topics: [
              { name: "Algebra 1", skills: 32 },
              { name: "Calculus", skills:21 },
              { name: "Geometry", skills: 28 },
              { name: "Statistics", skills: 18 },
              { name: "Trigonometry", skills: 25 },
              { name: "Pre-Calculus", skills: 24},
              { name: "AP Calculus AB", skills: 8 },
              { name: "AP Calculus BC", skills: 8 },
              { name: "AP Statistics", skills: 8 },
              { name: "Algebra 2", skills: 22 },
              { name: "Differntial Equations", skills: 8 },
          
            ]
          },
          { 
            name: "Science",
            topics: [
              { name: "Elementery Science", skills: 10 },
              { name: "Middle School Science", skills: 8 },
              { name: "Biology", skills: 8 },
              { name: "Chemistry", skills: 8 },
              {name: "Physics", skills: 32},
              {name: "Environmental Science", skills: 8},
              {name: 'Anatomy & Physiology', skills: 8},
              {name: 'Health & Medicine', skills: 8},
              
            ]
          },
          { 
            name: "English & Language Arts",
            topics: [
              { name: 'Pre-K', skills: 10 },
              { name: '2nd Grade', skills: 8 },
              {name: '3rd Grade', skills: 8},
              {name: '4th Grade', skills: 8},
              {name: '5th Grade', skills: 8},
              {name: '6th Grade', skills: 8},
              {name: '7th Grade', skills: 8},
              {name: '8th Grade', skills: 8},
              {name: 'High School', skills: 8},
        
            ]
          },
          { 
            name: "Social Studies",
            topics: [
              { name: 'World History', skills: 10 },
              { name: 'US History', skills: 8 },
              { name: 'Economics', skills: 8 },
              { name: 'Ancient History', skills: 8 },
              { name: 'US Gov & Civics', skills: 8 },
       
            ]
          },
          { 
            name: "Computer Science",
            topics: [
              { name: 'Data Structures & Algorithims', skills: 10 },
              { name: 'Intro to Object Oriented Programming', skills: 8 },
             
            ]
          },
          { 
            name: "Test Prep",
            topics: [
              { name: 'ACT', skills: 10 },
              { name: 'SAT', skills: 8 },
              
            ]
          },
        
      ];
      
  return (

    <>
    {showPopup || open  && 
    <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>

    </div>

    }
     {course  && 
    <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>

    </div>

    }
    {topic  && 
    <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>

    </div>

    }
      <DashboardNav/>
      <div className='pl-56 dark:bg-slate-700 min-h-screen'>
        <DashNav/>
        { hasCode ? (
          <>
          <div className="flex  justify-between items-center pr-5 mt-3">
          <h1 className="text-2xl font-semibold nunito dark:text-white">Your Classes</h1>
          <button onClick={generateCode} className='bg-blue-500 text-white px-4 py-2 nunito rounded dark:text-white'>Create Class</button>
          </div>
          {showPopup && 
            <div className='popup p-3 z-50 bg-white fixed left-[30rem]  top-60 border-[2px] rounded border-gray-200  h-48  '>
                <div className='flex'>
                <div className='rounded-full bg-green-500 w-7 grid place-items-center'>
                <i class="fa-solid fa-check text-white"></i>
                </div>
            <h1 className='text-xl font-bold ml-2 '>Class Created!</h1>
              </div>
              <div className='text-center mt-3 '>
              <p className="" >Your Code: {code}</p>
              <span className='text-center'> share this with students!</span>
              </div>
              <div className='place-items-center grid  mt-11'>
              <button className='bg-green-500 w-96 p-1 rounded-sm poppins text-white' onClick={closePopup}>Close</button>
              </div>
            </div>
          }
          <div className="grid grid-cols-1 p-4">
          { open && 
          <form onSubmit={handleSubmit}>
            <div className=" fixed w-48 h-fit rounded p-3 bg-white top-[10rem] right-[40rem] z-50">
              <div className="flex justify-end mb-2">
                <button className="main-color text-white rounded w-14" onClick={closeClass}>Close</button>
                </div>
              <div className="flex flex-col">
                <placeholder htmlFor="className">Enter Your Class Name</placeholder>
                <input name="className" value={className} onChange={handleChange} className="border-[2px] rounded border-gray-200 w-full"></input>
              </div>
              <div className="flex justify-end">
              <button type="submit" className="main-color text-white rounded w-14 mt-3">Save</button>

              </div>
            </div>
            </form>
        }
        { course &&
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="rounded p-5 bg-white  ">
            <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl nunito font-semibold">Select Course</h1>
          <i class="fa-solid fa-xmark fa-lg cursor-pointer" onClick={closeCourse}></i>
          </div>
          {courses.map((course, index) => (
          <div key={index} className="">
            <div className="grid grid-cols-1  grid-rows-2 ">
            <button className=" main-color rounded text-white text-xl font-medium uppercase dark:bg-violet-700" onClick={() => selectTopic(course)}>{course.name}</button>
            </div>
          </div>
        ))}
          </div>
        </div>
        }
        
      {course !== null && topic && test && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="rounded p-5 bg-white">
            <div className="flex justify-between">
            <h1 className="text-2xl nunito font-semibold">Select Course</h1>
            <button className="rounded w-[4rem] main-color  text-white nunito dark:bg-violet-700 " onClick={selectCourse}>Back</button>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-5">
            {test.map((topic, index) => (
              <div key={index}>
               <button className=" main-color rounded text-white text-xl font-medium uppercase px-3 dark:bg-violet-700"> {topic.name}</button>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}
       
            {[...getCode.classes, ...getCode.classToGet].map((classItem, index) => (
             
              <div key={index} className="border-[2px] rounded border-gray-200 p-3 mt-3 dark:bg-slate-600 dark:border-none">
                <div className="flex justify-between">
             <h2 className="text-xl dark:text-white">Class Code: {classItem.code}</h2>
             <button className="btn btn-neutral btn-xs sm:btn-sm md:btn-md dark:text-white " onClick={() => openClass(classItem._id)}> {classItem.className ? 'Change Class Name' : 'Add Class Name'}</button>
             </div>
             <h1 className="text-xl mb-2 dark:text-white">{classItem.className}</h1>
             <div className="flex items-center">
             <h1 className="text-xl mb-2 dark:text-white">Courses</h1>
             <h1></h1>
             </div>
             <div className="flex justify-between">
              <h1 className='text-lg dark:text-white'>Students</h1>
              <button className='main-color rounded text-white w-[8rem] dark:bg-violet-700' onClick={selectCourse}>Select Course</button>
              </div>
              <div className="grid grid-cols-5 w-5/6 p-2 gap-3  mb-3">
              {classItem.students &&
    classItem.students.map((student, studentIndex) => (
      student && (
        <div key={studentIndex} className=" rounded  text-white flex items-center main-color p-1 w-fit dark:bg-violet-700">
          <img className="rounded-full h-7 mr-2"src={student.avatar}/>
                  <h1>
          {student.firstName && student.lastName 
            ? `${student.firstName} ${student.lastName}` 
            : student.email}
        </h1>
        </div>
      )
    ))}
              </div>
              
              <div className="flex justify-end">
              <button className="w-[8rem] bg-red-500 rounded nunito" onClick={() => deleteClassName(classItem.code)}>Delete Class</button>
              </div>
              </div>
            ))}

          </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center h-screen '>
          <h1 className='text-3xl font-bold'>Classes</h1>
          <p className='text-xl'>You have no classes yet</p>
          <button onClick={generateCode} className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>Create Class</button>
          {showPopup && 
            <div className='popup p-3 z-50 bg-white fixed  top-60 border-[2px] rounded border-gray-200  h-48  '>
                <div className='flex'>
                <div className='rounded-full bg-green-500 w-7 grid place-items-center'>
                <i class="fa-solid fa-check text-white"></i>
                </div>
            <h1 className='text-xl font-bold ml-2'>Class Created!</h1>
              </div>
              <div className='text-center mt-3'>
              <p>Your Code: {code}</p>
              <span className='text-center'> share this with students!</span>
              </div>
              <div className='place-items-center grid  mt-11'>
              <button className='bg-green-500 w-96 p-1 rounded-sm poppins text-white' onClick={closePopup}>Close</button>
              </div>
            </div>
          }
        </div>

        )

        }
      </div>
    </>
  )
}