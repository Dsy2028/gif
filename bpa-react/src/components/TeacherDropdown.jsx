import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';

export default function TeacherDropdown() {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(false);
  
    const toggleProfileDropdown = () => {
      setProfileDropdownOpen((prevOpen) => !prevOpen);
    };
  
    const closeProfileDropdown = () => {
      setProfileDropdownOpen(false);
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeProfileDropdown();
      }
    };
  
    const handleLogout = async () => {
      try {
        dispatch(logOutUserStart());
        const res = await fetch('https://bpa-api1.onrender.com/api/auth/logout');
        const data = await res.json();
        if (data.success === false) {
          dispatch(logOutUserFailure(data.message));
          return;
        }
        dispatch(logOutUserSuccess(data));
        navigate('/');
      } catch (error) {
        dispatch(logOutUserFailure(data.message));
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  return (
    <div className="relative">
    <img
      src={currentUser.avatar}
      className="h-9 w-9 rounded-full cursor-pointer"
      onClick={toggleProfileDropdown}
    />
    {profileDropdownOpen && (
      <div className="absolute  right-0 animate__animated  animate__fadeIn mt-2 min-h-72 w-60 z-50 bg-white p-2 rounded-lg shadow ">
        <div>
          <div className="flex items-center">
            <img className="h-9 w-9 rounded-full" src={currentUser.avatar}/>
            <div className="flex flex-col ml-2">
              <p className="font-bold">{currentUser.firstName} {currentUser.lastName}</p>
              <p className="text-sm text-gray-500 ">{currentUser.email}</p>
              </div>
            </div>
          </div>
        <div className="flex flex-col mt-2 ">
            <Link to={`/prof/${currentUser._id}`}><div className="w-full p-1 cursor-pointer h-fit color-main border-b-[2px] border-gray-200 text-center nunito text-lg font-normal hover:bg-gray-200 rounded">
              Manage your Account
            </div></Link>
          <div className="py-1 px-2 cursor-pointer border-b-[2px] border-gray-200 color-main nunito text-lg font-normal hover:bg-gray-200 rounded">Updates</div>
          <div className="py-1 px-2 cursor-pointer color-main border-b-[2px] border-gray-200  nunito text-lg font-normal hover:bg-gray-200 rounded">Support</div>
          <div className="py-1 px-2 cursor-pointer color-main border-b-[2px] border-gray-200  nunito text-lg  font-normal hover:bg-gray-200 rounded">
            Settings
          </div>
          <div
            onClick={handleLogout}
            className="py-1 px-2 cursor-pointer mt-7 text-red-700 nunito text-lg hover:bg-gray-200  rounded"
          >
            <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>
            Log Out
          </div>
        </div>
      </div>
    )}
  </div>
  )
}
