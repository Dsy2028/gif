import React from 'react'
import img from "../imgs/img.png";
import Attatch from "../imgs/attach.png";
import { logOutUserSuccess, logOutUserStart, logOutUserFailure } from '../redux/user/userSlice';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type Something...' />
      <div className="send">
        <label htmlFor="file">
          <img src={Attatch} alt="" />
        </label>
        <input type="file" style={{ display: "none" }} id='file' />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button>send</button>
      </div>
    </div>
  )
}

export default Input