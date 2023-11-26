import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';

export default function ProfileDropdown() {
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
        <div
          className="absolute h-40 w-28 mt-2 z-50 bg-white p-2 rounded-lg shadow"
        >
          <ul className="flex flex-col">
            <Link to="/profile">
              <li className="py-1 px-2 color-main font-normal hover:bg-gray-200 rounded">
                Profile
              </li>
            </Link>
            <li className="py-1 px-2 color-main font-normal hover:bg-gray-200 rounded"></li>
            <li className="py-1 px-2 color-main font-normal hover:bg-gray-200 rounded">hold</li>
            <li className="py-1 px-2 color-main font-normal hover:bg-gray-200 rounded">hold</li>
            <li className="py-1 px-2 color-main  font-normal hover:bg-gray-200 rounded">
              Settings
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
  );
}
