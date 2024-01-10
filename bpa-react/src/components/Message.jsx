import React from 'react'
import GoogleAuth from "../components/GoogleAuth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart, updateUserStart } from '../redux/user/userSlice.js';

const Message = () => {
  return (
    <div className='message owner'>    
      <div className="messageInfo">
        <img src="data:image/jpeg;base64,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" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src="data:image/jpeg;base64,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" alt="" />

      </div>
    </div>

  )
}

export default Message