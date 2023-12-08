import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';



export default function signup() {
  const [formData, setFormData] = useState({})
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/log-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
  }
  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };
  
  return (
<>

  <div className="login-holder">
    <div className="login-container">
      <div className="field-left" id="back">
        <ul className="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <div className="notha-holda">
          <h1>Sign Up</h1>
          <p className=''>
            Are you tired of the same old, passive learning methods that put you
            to sleep? It's time to supercharge your education with our
            interactive learning website!
            <br />
            <br /> Imagine a world where learning is fun, engaging, and tailored
            to your unique style. Whether you're a visual learner, a hands-on
            enthusiast, or a fan of lively discussions, our platform has it all.
            <br />
            <br /> Join a vibrant community of fellow students and embark on a
            learning journey that's not just educational but also entertaining.
            Don't miss out on the opportunity to revolutionize your learning
            experience. Sign up today and unlock a world of interactive
            knowledge waiting for you!
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="fields-holder">
        <div className="holder">
          <div className="form-contain">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" required="" onChange={handleChange}/>
          </div>
          <div className="form-contain">
            <label htmlFor="lastName" placeholder="lastName">
              Last Name
            </label>
            <input type="text" name="lastName" id="lastName" required=""onChange={handleChange} />
          </div>
          <div className="form-contain">
            <label htmlFor="email" placeholder="email">
              Email
            </label>
            <input type="text" name="email" id="email" required="" onChange={handleChange}/>
            <div id="error emailError" />
          </div>
          <div className="form-contain">
            <label htmlFor="password" placeholder="password">
              Create Password
            </label>
            <input type="password" name="password" id="password" onChange={handleChange}/>
            <div id="errorOutput" />
            {/*<span>must contain atleast 8 characters, one uppercase and atleast 1 number</span>*/}
          </div>
        </div>
        <div className="form-contain">
          <label htmlFor="role">Select Role</label>
          <select id="role" name="role" onChange={handleRoleChange} value={formData.role}>
            <option value="user">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="sign-up-button-div">
          <button disabled={loading} className="login-btn text-white" id="log-btn">
            {loading ? 'Loading..' : 'Sign Up'}
          </button>
          <p>
            already have an account?<Link to={"/log-in"}><span className="text-blue-700 ml-2">Log In</span></Link>
          </p>
        </div>
        {error && <p className='text-red-600 mt-5'>{error}</p>}
      </div>
      </form>
    </div>
  </div>
  <Footer/>
</>

  )
}
