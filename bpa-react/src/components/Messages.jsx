import React from 'react'
import Message from "./Message";
import GoogleAuth from "../components/GoogleAuth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart, updateUserStart } from '../redux/user/userSlice.js';

const Messages = () => {
  return (
    <div className='messages'>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default Messages