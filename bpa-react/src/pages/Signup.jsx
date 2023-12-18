import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import background1 from "../imgs/background1.svg";


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

  /*        <ul className="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>*/
  
  return (
<>

  <div className="grid place-items-center h-screen" style={{ backgroundImage: ` url(${background1})`}}>
    <div className="w-[27rem] h-[33rem] bg-white rounded p-6">
      <form onSubmit={handleSubmit}>
        <h1 className="font-semibold nunito text-xl">Create your account</h1>
          <div className="flex flex-col mt-4">
            <label htmlFor="firstName">Name</label>
            <div className="flex">
            <input className="border-[1px] rounded border-gray-200 w-full" placeholder="First Name"  type="text" name="firstName" id="firstName" required="" onChange={handleChange}/>
            <input className="border-[1px] rounded border-gray-200 w-full ml-3" placeholder="Last Name" type="text" name="lastName" id="lastName" required=""onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-col mt-5 ">
            <label htmlFor="email" placeholder="email">
              Email
            </label>
            <input className="border-[1px] rounded border-gray-200 w-full" type="text" name="email" id="email" required="" onChange={handleChange}/>
            <div id="error emailError" />
          </div>
          <div className="flex flex-col mt-5 ">
            <label htmlFor="password" placeholder="password">
              Create Password
            </label>
            <input className="border-[1px] rounded border-gray-200 w-full" type="password" name="password" id="password" onChange={handleChange}/>
            <div id="errorOutput" />
            {/*<span>must contain atleast 8 characters, one uppercase and atleast 1 number</span>*/}
          </div>
        
        <div className=" mt-5">
          <label htmlFor="role">Select Role:</label>
          <select id="role" name="role" onChange={handleRoleChange} value={formData.role} className="ml-4">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="">
          <button disabled={loading} className="rounded h-9 nunito w-full main-color cursor-pointer mt-4  text-white uppercase hover:opacity-90 disabled:opacity-80">
            {loading ? 'Loading..' : 'Sign Up'}
          </button>
        </div>
        <p className="text-center mt-3">
            already have an account?<Link to={"/log-in"}><span className="text-blue-700 ml-2">Log In</span></Link>
          </p>
        {error && <p className='text-red-600 mt-5'>{error}</p>}
      
      </form>
    </div>
  </div>
</>

  )
}
