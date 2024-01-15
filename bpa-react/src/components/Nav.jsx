import React from 'react';
import logo from '../imgs/Logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
import searchBar from './searchBar';
import { useState } from 'react';
import { useEffect } from 'react';
import Switch from "react-switch";
import data from './MOCK_DATA'
import { Navigate } from 'react-router-dom';


export default function Nav() {
  // const {currentUser} = useSelector(state => state.user)
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector(state => {
    //  console.log(state.user.currentUser); // Log the currentUser
    return state.user;
  });
  const [join, setJoin] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(null);
  const [joinMessage, setJoinMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [bars, setBars] = useState(window.innerWidth <= 768);
  const [value, setValue] = useState("");


  useEffect(() => {
    const handleResize = () => {
      setBars(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const localDarkMode = window.localStorage.getItem('darkMode') === 'true';
    setDarkMode(localDarkMode);
    if (localDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
  const handleChange = (e) => {
    setClassCode(e.target.value);
    setFormData({
      ...formData,
      join: e.target.value, // Assuming your input name is 'join'
    });
  };
  const openJoin = () => {
    setJoin(true);
  }
  const closeJoin = () => {
    setJoin(false);
  }
  const joinClass = async (e, code) => {
    e.preventDefault();

    try {
      const token = currentUser._id;

      const response = await fetch('/api/classes/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, student: currentUser._id }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to join class: ${errorMessage}`);
      }

      const joinedClass = await response.json();
      console.log('Successfully joined class:', joinedClass);
      setJoinMessage('Successfully Joined Class');
    } catch (error) {
      console.error('Error joining class:', error);
      setError(error.message);
      setMessage(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    joinClass(e, classCode);
  };

  const closePopup = () => {
    document
      .querySelector('.popup')
      .classList.add('animate__fadeOutDown', 'animate__animated');
    setTimeout(() => {
      setMessage(false);
      setError(false);
    }, 500);
  };

  const handleDarkModeToggle = (checked) => {
    setDarkMode(checked);
    if (checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  // nav search things

  const onChange = (event) => {
    setValue(event.target.value);
  }
  console.log(value)
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    //api to fetch the search result
    console.log("search ", searchTerm)
  }

  return (
    <>

      {currentUser ? (
        <>
          {message && error &&
            <div onClick={closePopup} role="alert" className="cursor-pointer animate__backInDown animate__animated fixed top-11 z-50 popup alert alert-error w-96 bg-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div className='flex items-center justify-between'>
                <span>{error}</span>

              </div>
            </div>
          }
          <div>
            {/* ... */}
            {joinMessage && (
              <div className="p-3 w-40 h-32 outline fixed top-0 z-50">
                <h1>{joinMessage}</h1>
              </div>
            )}
            {/* ... */}
          </div>
          {join &&
            <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>

            </div>

          }
          <header>
            <nav className="navbar-fixed-top dark:bg-slate-800">
              <Link to={'/'}><img className="logo " src={logo} /></Link>
              {/*search bar */}
              <div className="navdrop-place{">

              <div className="search ">
                <div className="search-inner">
                  <input
                    id="search"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    type="text"
                    value={value}
                    onChange={onChange}
                    spellCheck="false"
                    placeholder="Search"
                  />
                    <div className="search-icon">
                      <button onClick={() => onSearch(value ? `${value}` : 'Not Found')}  >
                        <i className="fa-solid fa-magnifying-glass dark:text-white" />
                      </button>
                    </div>

                  </div>
                </div>
                     
                    {value &&
                      <div>
                        <div className="nav-dropdown">
                          {data.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const pageTitle = item.page_title.toLowerCase();

                            return searchTerm && pageTitle.startsWith(searchTerm) && pageTitle !== searchTerm;
                          }).slice(0, 5)
                            .map((item) => (
                              <div onClick={() => onSearch(item.page_title)}
                                className="nav-dropdown-row" key={item.page_title}>{item.page_title}</div>
                            ))}
                        </div>
                      </div>
                    }
                  </div>
              <ul className="nav-links items-center justify-center flex">
                <li className='mr-2'>
                  <div className='flex items-center justify-center'>
                    <i class="fa-solid fa-sun fa-xl mr-2 text-amber-300"></i>
                    <div className='flex '>
                      <Switch onChange={handleDarkModeToggle} checked={darkMode} offColor="#bbbbbb" onHandleColor="#6c28d9" offHandleColor="#FFBF00" height={20} width={48} handleDiameter={18} onColor="#1f1b24" uncheckedIcon={false} checkedIcon={false} />
                    </div>
                    <i class="fa-solid fa-moon fa-xl ml-2 text-violet-700"></i>
                  </div>
                </li>
                <li className='nav-li'>
                  <i class="fa-solid fa-plus fa-lg dark:text-white" onClick={openJoin} title={"Join Class"}></i>
                </li>
                <li className='nav-li dark:text-white'>
                  <Link to={"/courses"}>Courses</Link>
                </li>
                <li className='nav-li'>
                  <ProfileDropdown />
                </li>
              </ul>
            </nav>
          </header>
          {join &&
            <div className='fixed z-50 inset-0 flex items-center justify-center'>
              <form onSubmit={handleSubmit} className='p-3 w-96 h-[10rem] bg-white rounded'>
                <div className="flex justify-end">
                  <button className="main-color nunito p-0 w-20 rounded text-white" onClick={closeJoin}>Close</button>
                </div>
                <div>
                  <placeholder className='text-xl font-semibold nunito'>Enter Class Code</placeholder>
                  <input type="text" name="join" id="join" value={classCode} onChange={handleChange} className="border-[2px] rounded border-gray-200 w-full"></input>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="main-color nunito p-0 w-20 rounded text-white mt-3">Join</button>
                </div>
              </form>
            </div>
          }
        </>

      ) : (
        <header>
          <nav className="dark:bg-slate-800">
            <Link to={"/"}><img src={logo} className="logo" alt="Logo" /></Link>
            <ul className="nav-links nav-links2">
              <Link to={"/courses"}><li className='nav-li'>Courses</li></Link>
              <li className='nav-li'>Teachers</li>
              <Link to={"/sign-up"}><li className='nav-li'>Sign Up</li></Link>
            </ul>
            <Link className="" to={'/log-in'}>
              <button className="nav-btn">Login</button>
            </Link>
          </nav>
        </header>
      )}

    </>

  )
}