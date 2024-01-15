import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('https://bpa-api1.onrender.com/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL ,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  return (
    <div className="external-icons mt-3 ">
      <div className="external-icon cursor-pointer h-6 p-6 rounded hover:opacity-90 dark:bg-violet-700" onClick={handleGoogleClick}>
        <i className="fa-brands fa-google fa-2xl" style={{ color: "#fff" }} />
      </div>
      {/* Additional icons go here */}
    </div>
  );
}
