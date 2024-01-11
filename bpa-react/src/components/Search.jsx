import React from 'react'
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", currentUser.firstName + currentUser.lastName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser._id + user._id
        : user._id + currentUser._id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser._id), {
          [combinedId + ".userInfo"]: {
            _id: user.uid,
            firstName: user.F,
            Avatar: user.Avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            _id: currentUser._id,
            firstName: currentUser.firstName,
            Avatar: currentUser.Avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user...' />
      </div>
      <div className="userChat">
        <img src="{user.Avatar}" alt="" />
        <div className="userChatInfo">
          <span>?</span>
        </div>
      </div>
    </div>
  )
}

export default Search
