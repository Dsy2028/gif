import React from 'react'
import logo from '../imgs/Logo.png';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
export default function Nav() {
 // const {currentUser} = useSelector(state => state.user)
 const { currentUser } = useSelector(state => {
  console.log(state.user.currentUser); // Log the currentUser
  return state.user;
});
  return (
    <>
    {currentUser ? (
            <header>
            <nav>
              <Link to={'/'}><img className="logo " src={logo} /></Link>
              <div className="search">
                <input
                  id="search"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  type="text"
                  spellCheck="false"
                  placeholder="Search"
                />
                <div className="search-icon">
                <button>
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
                </div>
              </div>
              <ul className="nav-links items-center justify-center flex">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/courses"}>Courses</Link>
                </li>
                <li>
                  <ProfileDropdown/>
                </li>
              </ul>
            </nav>
          </header>

    ) : (
      <header>
      <nav>
        <Link to={"/"}><img src={logo} className="logo" alt="Logo" /></Link>
        <ul className="nav-links">
          <Link to={"/courses"}><li>Courses</li></Link>
          <li>Teachers</li>
          <Link to={"/sign-up"}><li>Sign Up</li></Link>
        </ul>
        <Link className="btn" to={'/log-in'}>
          <button className="nav-btn">Login</button>
        </Link>
      </nav>
    </header>
    )}
    
  </>

  )
}
