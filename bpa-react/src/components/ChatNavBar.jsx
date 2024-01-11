import React from 'react'
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//all of this is text code I have not yet tested them yet

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
      </div>
    </div>
  )
}

export default ChatNavBar
