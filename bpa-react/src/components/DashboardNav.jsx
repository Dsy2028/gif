import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardNav() {
  return (
    <div className='h-screen bg-zinc-100 w-56 p-3 flex flex-col justify-between'>
      <div className='flex flex-col items-start justify-center gap-2  h-fit border-b-[2px] border-gray-200'>
        <Link className='text-xl font-bold w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
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
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-solid fa-users mr-2"></i>
          Classes
        </Link>
        <Link className='text-xl font-bold  w-full cursor-pointer flex items-center rounded link hover:bg-gray-200'>
          <i class="fa-regular fa-calendar mr-2"></i>
          Calendar
        </Link>
      </div>
      <div className="border-t-[2px] border-gray-200  w-full justify-between flex items-center">
        <div className='flex items-center hover:bg-gray-200 cursor-pointer'>
          <i class="fa-solid fa-user-plus fa-lg cursor-pointer"></i>
          <p className='ml-2 text-md'>Invite</p>
        </div>
        <i class="fa-solid fa-circle-question fa-lg cursor-pointer"></i>
      </div>
    </div>
  )
}
