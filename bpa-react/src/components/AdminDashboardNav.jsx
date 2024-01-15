import React from 'react'
import TeacherDropdown from './TeacherDropdown'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import fetchUser from './fetchUser';


export default function AdminDashboardNav() {
    const { currentUser, loading} = useSelector((state) => state.user);
    const { user, error } = fetchUser(currentUser);
   
  return (
    <>
    <div className="fixed bg-fuchsia-600 h-[35rem] flex flex-col w-[4rem] p-3 rounded text-white ml-[2rem] items-center">
      <div className="grid place-items-center  border-b-[1px] border-gray-200 ">
      <h1 className="text-2xl">LX</h1>
      </div>
      <div className=" flex flex-col justify-evenly mt-6 text-xl ">
        <div className=" grid place-items-center p-3">
      <Link to={'/admin-dashboard'}><i class="fa-solid fa-chart-pie cursor-pointer fa-xl hover:text-purple-500"></i></Link>
      </div>
      <div className=" grid place-items-center p-3 mt-4">
      <Link to={'/admin-add'}><i class="fa-solid fa-plus cursor-pointer fa-xl hover:text-purple-500"></i></Link>
      </div>
      <div className=" grid place-items-center p-3 mt-4">
      <Link to={'/admin-courses'}><i class="fa-solid fa-book cursor-pointer fa-xl hover:text-purple-500"></i></Link>
      </div>
      <div className=" grid place-items-center p-3 mt-4">
      <Link to={'/admin-users'}><i class="fa-solid fa-user  cursor-pointer fa-xl hover:text-purple-500"></i></Link>
      </div>
      <div className=" grid place-items-center p-3 mt-4">
      <Link to={'/admin-help'}><i class="fa-solid fa-question cursor-pointer fa-xl hover:text-purple-500"></i></Link>
      </div>
      </div>
    </div>
    </>
  )
}
