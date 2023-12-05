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
        const res = await fetch('/api/auth/logout');
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
      <div className="absolute h-72 w-32 mt-2 z-50 bg-white p-2 rounded-lg shadow">
       <Link to={'/profile'}><button className='w-4/5 h-10 main-color text-white roboto'>Manage your Account</button></Link>
        <ul className="flex flex-col">
            <li className="w-full p-1 h-fit color-main font-normal hover:bg-gray-200 rounded">
              Profile
            </li>
          <li className="py-1 px-2 color-main font-normal hover:bg-gray-200 rounded"></li>
          <li className="py-1 px-2 color-main font-normal hover:bg-gray-200 rounded">hold</li>
          <li className="py-1 px-2 color-main font-normal hover:bg-gray-200 rounded">hold</li>
          <li className="py-1 px-2 color-main  font-normal hover:bg-gray-200 rounded">
            Support
          </li>
          <li
            onClick={handleLogout}
            className="py-1 px-2 mt-7 text-red-700 hover:bg-gray-200 rounded"
          >
            Log Out
          </li>
        </ul>
      </div>
    )}
  </div>
  )
}
