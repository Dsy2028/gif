import React from 'react'
import DashboardNav from '../components/DashboardNav'
import DashNav from '../components/DashNav'
import { useState } from 'react';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Classes() {
    const [showPopup, setShowPopup] = useState(false);
    const [code, setCode] = useState('');
    const [getCode, setGetCode] = useState(0);
    const [hasCode, setHasCode] = useState(false);
    const [open, setOpenClass] = useState(false);
    const [className, setClassName] = useState('');
    const [classId, setClassId] = useState(null);
    const { currentUser } = useSelector(state => {
      return state.user;
    });
    const {teacherId} = useParams();
    const handleChange = (e) => {
      setClassName(e.target.value);
    };
    const generateCode = () => {
      const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*?';
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
          if (data && data.length > 0) {
            setGetCode(data);
            setHasCode(true);
            
          } else {
            console.error("Fetched data is empty or no classes");
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, []);
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

      const deleteClassName = async (classIdToDelete) => {
        try {
          // Make a DELETE request to remove the class name
          const response = await fetch('/api/classes/className', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              classId: classIdToDelete,
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // Update the local state to reflect the deletion
          setGetCode((prevGetCode) =>
            prevGetCode.filter((classItem) => classItem._id !== classIdToDelete)
          );
      
          // Handle success scenario
          console.log('Class name deleted successfully');
        } catch (error) {
          // Handle errors
          console.error('Error deleting class name:', error);
        }
      };

      const handleDeleteClassName = async (classIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
          await deleteClassName(classIdToDelete);
        }
        window.location.reload();
      };

      
      
  return (
    <>
    {showPopup || open && 
    <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>

    </div>

    }
      <DashboardNav/>
      <div className='pl-56'>
        <DashNav/>
        { hasCode ? (
          <>
          <div className="flex  justify-between items-center pr-5 mt-3">
          <h1 className="text-2xl font-semibold nunito">Your Classes</h1>
          <button onClick={generateCode} className='bg-blue-500 text-white px-4 py-2 nunito rounded'>Create Class</button>
          </div>
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
            {getCode.map((classItem, index) => (
              <div key={index} className="border-[2px] rounded border-gray-200 p-3 mt-3">
                <div className="flex justify-between">
             <h2 className="text-xl">Class Code: {classItem.code}</h2>
             <button className="btn btn-neutral btn-xs sm:btn-sm md:btn-md " onClick={() => openClass(classItem._id)}> {classItem.className ? 'Change Class Name' : 'Add Class Name'}</button>
             </div>
             <h1 className="text-xl mb-2">{classItem.className}</h1>
             
              <h1 className='text-lg'>Students</h1>
              <div className="flex justify-end">
              <button className="w-[8rem] bg-red-500 rounded nunito" onClick={() => handleDeleteClassName(classItem._id)}>Delete Class</button>
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