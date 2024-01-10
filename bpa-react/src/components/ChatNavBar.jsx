import React from 'react'
import GoogleAuth from "../components/GoogleAuth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart, updateUserStart } from '../redux/user/userSlice.js';

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
  return (
    <div className='navbar'>
        <span className='logo'>Chat</span>
        <div className="user">
            <img src={result.user.photoURL} alt="" />
            <span>{currentUser._id}</span>
            <button>onClick={handleLogout}</button>
        </div>
    </div>
  )
}

export default ChatNavBar
