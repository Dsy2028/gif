import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function DashboardNav() {
  const [showInvite, setShowInvite ] = useState(false);

  const openInvite = () => {
    setShowInvite(true);
  }
  const closeInvite = () => {
    setShowInvite(false);
  }
  return (
    <div className='h-screen fixed bg-zinc-100 w-48 p-3 flex flex-col justify-between '>
      {showInvite &&
      <div className='fixed z-50  w-96 h-96 bg-white outline '>
        <button onClick={closeInvite}>Close</button>
      </div>
        
      }
      <div className='flex flex-col items-start justify-center gap-4 border-b-[2px] border-gray-200 '>
        <Link to={"/dashboard"} className='text-xl font-bold w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-house mr-2"></i>
          Home
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-inbox mr-2"></i>
          Inbox
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-chart-line mr-2"></i>
          Dashboards
        </Link>
        <Link to={"/classes"} className='text-xl font-bold  w-full cursor-pointer  flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-users mr-2"></i>
          Classes
        </Link>
        <Link to={"/calender"}className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link mb-2 hover:bg-gray-200'>
          <i class="fa-regular fa-calendar mr-2"></i>
          Calendar
        </Link>
      </div>
      <div className='gap-4 grid'>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-book mr-2"></i>
          Library
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-book-reader mr-2"></i>
          Courses
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-clipboard-list mr-2"></i>
          Chat
        </Link>
      </div>
      <div className="border-t-[2px] border-gray-200  w-full justify-between flex items-center">
        <div className='flex items-center hover:bg-gray-200 cursor-pointer' onClick={openInvite}>
          <i class="fa-solid fa-user-plus fa-lg cursor-pointer"></i>
          <p className='ml-2 text-md'>Invite</p>
        </div>
        <i class="fa-solid fa-circle-question fa-lg cursor-pointer"></i>
      </div>
    </div>
  )
}
