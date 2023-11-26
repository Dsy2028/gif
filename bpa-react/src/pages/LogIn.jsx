import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import GoogleAuth from "../components/GoogleAuth";

export default function LogIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const res = await fetch("/api/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="login-section">
      <div className="login-container1">
        <form onSubmit={handleSubmit}>
          <div className="form-contain1">
            <label htmlFor="email" placeholder="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
            />
            <div id="error emailError" />
          </div>
          <div className="form-contain1">
            <div className="forgot-pass">
              <label htmlFor="password" placeholder="password">
                Password
              </label>
              <Link to={"/#"} className="text-blue-700 ml">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
            <div id="errorOutput" />
            <div className="btn-holder">
              <button
                disabled={loading}
                className="login-btn text-white uppercase hover:opacity-90 disabled:opacity-80"
                id="log-btn1"
              >
                {loading ? "Loading.." : "Log In"}
              </button>
            </div>
            <p id="noAccount">
              dont have an account?{" "}
              <Link to={"/sign-up"} className="text-blue-700">
                Sign Up!
              </Link>
            </p>
          </div>
          {error && <p className="text-red-600 mt-5">{error}</p>}
          <div className="or-hold">
            <div className="or ml-2"></div>
            <span> or </span>
            <div className="or"></div>
          </div>
          <GoogleAuth />
        </form>
      </div>
    </div>
  );
}
