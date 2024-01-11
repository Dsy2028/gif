import React from 'react'
import GoogleAuth from "../components/GoogleAuth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart, updateUserStart } from '../redux/user/userSlice.js';

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user...'/>
      </div>
      <div className="userChat">
        <img src="https://retratosbarcelona.com/wp-content/uploads/2022/09/Retratos-Barcelona-Linkedin-Photography-Alejandra.jpg" alt="" />
        <div className="userChatInfo">
          <span>person</span>
        </div>
      </div>
    </div>
  )
}

export default Search
