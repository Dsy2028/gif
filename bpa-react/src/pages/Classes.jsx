import React from 'react'
import DashboardNav from '../components/DashboardNav'
import DashNav from '../components/DashNav'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux/es/hooks/useSelector';
export default function Classes() {
    const [showPopup, setShowPopup] = useState(false);
    const [code, setCode] = useState('');
    const { currentUser } = useSelector(state => {
      console.log(state.user.currentUser); // Log the currentUser
      return state.user;
    });
    const createClass = async () => {
        const response = await fetch('http://localhost:3000/api/classes/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ code, teacher: currentUser._id })
        });
        const data = await response.json();
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
      createClass(code);
    }
    const closePopup = () => {
        document.querySelector('.popup').classList.add('animate__fadeOutDown', 'animate__animated' );
        setTimeout(() => {
          setShowPopup(false);
        }, 500);
      }
      const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
      }
    
  return (
    <>
    {showPopup &&
    <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>

    </div>

    }
      <DashboardNav/>
      <div className='pl-56'>
        <DashNav/>
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
      </div>
    </>
  )
}
