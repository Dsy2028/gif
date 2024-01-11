import React from 'react'
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//all of this is text code I have not yet tested them yet
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

const ChatNavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className='navbar'>
      <span className='logo'>Chat</span>
      <div className="user">
        <img src={currentUser.Avatar} alt="" />
        <span>{currentUser.firstName}</span>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
}

export default ChatNavBar
