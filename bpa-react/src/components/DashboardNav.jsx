import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function DashboardNav() {
  const [showInvite, setShowInvite ] = useState(false);
  const {teacherId} = useParams();
  const { currentUser } = useSelector(state => {
    return state.user;
  });

  const openInvite = () => {
    setShowInvite(true);
  }
  const closeInvite = () => {
    setShowInvite(false);
  }
  return (
    <>
    {showInvite && 
    <div className='fixed opacity-100  w-screen h-screen bg-black bg-opacity-50'>

    </div>

    }
    <div className='h-screen fixed bg-zinc-100 w-48 p-3 flex flex-col justify-between dark:bg-slate-800 '>
      {showInvite &&
      <div className="fixed z-50 inset-0 flex items-center justify-center ">
      <div className='  w-[30rem] h-96 bg-white rounded p-4 '>
        <div className="flex justify-between">
          <h1 className='font-semibold nunito'>Invite Students to Your Class</h1>
        <button onClick={closeInvite} className="w-20 main-color text-white rounded">Close</button>
        </div>
        <div className="mt-3 flex gap-4">
          <h1 >From:</h1>
          {currentUser.email}
        </div>
        <div className="mt-3 flex gap-11">
          <placeholder>To:</placeholder>
        <input className="border-[2px] rounded border-gray-200"></input>
        </div>
        <div className="mt-3 flex">
          <placeholder>Message:</placeholder>
          <textarea className="border-[2px] rounded border-gray-200 h-[10rem] w-[18.583rem] resize-none">
            Hello!
            This is your below is the code that you will use to join this class!
          </textarea>
        </div>
        <div className="flex justify-end mt-11">
        <button className="w-24 main-color text-white rounded">Send Invite</button>
        </div>
      </div>
        </div>
      }
      <div className='flex flex-col items-start justify-center gap-4 border-b-[2px] border-gray-200 '>
        <Link to={`/dashboard/${currentUser._id}`} className='text-xl font-bold w-full cursor-pointer flex items-center rounded  hover:bg-gray-200 dark:text-white'>
          <i class="fa-solid fa-house mr-2"></i>
          Home
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded  hover:bg-gray-200 dark:text-white'>
          <i class="fa-solid fa-inbox mr-2"></i>
          Inbox
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded  hover:bg-gray-200 dark:text-white'>
          <i class="fa-solid fa-chart-line mr-2"></i>
          Dashboards
        </Link>
        <Link to={`/classes/${currentUser._id}`} className='text-xl font-bold  w-full cursor-pointer  flex items-center rounded  hover:bg-gray-200 dark:text-white'>
          <i class="fa-solid fa-users mr-2"></i>
          Classes
        </Link>
        <Link to={"/calender"}className='text-xl font-bold  w-full cursor-pointer flex items-center rounded  mb-2 hover:bg-gray-200 dark:text-white'>
          <i class="fa-regular fa-calendar mr-2"></i>
          Calendar
        </Link>
      </div>
      <div className='gap-4 grid'>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded  hover:bg-gray-200 dark:text-white'>
          <i class="fa-solid fa-book mr-2"></i>
          Library
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded  hover:bg-gray-200 dark:text-white' to={'/teacher-courses'}>
          <i class="fa-solid fa-book-reader mr-2"></i>
          Courses
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded  hover:bg-gray-200 dark:text-white'>
          <i class="fa-solid fa-clipboard-list mr-2"></i>
          Chat
        </Link>
      </div>
      <div className="border-t-[2px] border-gray-200  w-full justify-between flex items-center">
        <div className='flex items-center hover:bg-gray-200 cursor-pointer' onClick={openInvite}>
          <i class="fa-solid fa-user-plus fa-lg cursor-pointer dark:text-white"></i>
          <p className='ml-2 text-md dark:text-white'>Invite</p>
        </div>
        <i class="fa-solid fa-circle-question fa-lg cursor-pointer dark:text-white"></i>
      </div>
    </div>
    </>
  )
}