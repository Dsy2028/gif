/**
 * This pages is for login.
 * 
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import GoogleAuth from "../components/GoogleAuth";
import background from "../imgs/background.svg";
import background1 from "../imgs/background1.svg";
import { Checkbox, Label } from 'flowbite-react';
import { resetError } from "../redux/user/userSlice";
export default function LogIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(false);
  const [showPass, setPass] = useState(false);
  const { currentUser } = useSelector(state => {
    return state.user;
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("https://bpa-api1.onrender.com/api/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setMessage(true);
        return;
      }
      document.cookie = `access_token=${data.token}; path=/`;
      dispatch(signInSuccess(data));
      if (data.role === 'teacher') {
        navigate(`/dashboard/${currentUser._id}`);
      }if(data.role === 'admin'){
        navigate('/admin-dashboard');
      }
       else {
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      setMessage(true);
    }
  };

  const closePopup = () => {
    document.querySelector('.popup').classList.add('animate__fadeOutDown', 'animate__animated' );
    setTimeout(() => {
      setMessage(false);
      dispatch(resetError());
    }, 500);
  }
  return (
    <div className="login-section" style={{ backgroundImage: ` url(${background1})`}}>
       {message && error && 
       <div  onClick={closePopup}  role="alert" className="animate__backInDown animate__animated fixed top-11 z-50 popup alert alert-error w-96 bg-red-500">
       <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
       <div className='flex items-center justify-between'>
       <span>{error}</span>
       
       </div>
     </div>
       }
      <div className="bg-white h-[35rem] w-[28rem] rounded p-8 dark:bg-slate-800 ">
        <h1 className="font-bold nunito text-xl mb-3 dark:text-white">Sign in to your account</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex  flex-col mb-6">
            <label htmlFor="email" placeholder="email" className="nunito dark:text-white">
              Email
            </label>
            <input
            className="border-[1px] p-1 rounded border-gray-200 w-full"
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex  flex-col">
              <label htmlFor="password" placeholder="password" className="nunito dark:text-white">
                Password
              </label>
              <div className="relative">
            <input
            className="border-[1px] rounded p-1 border-gray-200 bg-[] w-full"
              type={showPass ? "text":"password"}
              name="password"
              id="password"
              onChange={handleChange}
              
            />
            <div className="search-icon">
            <i class="fa-solid fa-eye-slash cursor-pointer" onClick={() => setPass(!showPass)}></i>
            </div>
            </div>
          </div>
          <div className="mt-5 flex w-full justify-between ">
            <div className="flex items-center">
            <span className="mr-3 dark:text-white">Remember Me</span>
            <Checkbox id="accept" className="h-fit w-fit" defaultChecked />
          </div>
          <Link to={"/#"} className="text-blue-700 ">
                Forgot password?
              </Link>
          </div>
          <div className="btn-holder mt-3">
              <button
                disabled={loading}
                className="rounded h-9 nunito w-full main-color cursor-pointer mt-3  text-white uppercase hover:opacity-90 disabled:opacity-80 dark:bg-violet-700"
                
              >
                {loading ? "Loading.." : "Sign In"}
              </button>
            </div>
          <div className=" flex items-center justify-center mt-5">
            <div className="border-[1px] border-gray-200 w-5/6"></div>
            <span className="mr-1 ml-1 dark:text-white"> or </span>
            <div className="border-[1px] border-gray-200 w-5/6"></div>
          </div>
          <GoogleAuth />
          <div className="mt-3 text-center">
          <p  className="dark:text-white" >
              dont have an account?{" "}
              <Link to={"/sign-up"} className="text-blue-700">
                Sign Up!
              </Link>
            </p>
           </div>
        </form>
      </div>
    </div>
  );
}
