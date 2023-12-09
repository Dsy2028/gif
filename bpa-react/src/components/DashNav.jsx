import React,{ useRef,useState } from 'react'
import TeacherDropdown from './TeacherDropdown.jsx'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'animate.css';

export default function DashNav() {
    const data = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];
    const [open_Table, setisOpenTable] = useState(false);
    const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);
    const [notiDropdownOpen, setNotiDropdownOpen] = useState(false);
    const dropdownRef = useRef(false);
    const location = useLocation();
    const notiDropdown = () => {
     setNotiDropdownOpen((prevOpen) => !prevOpen);
     
    };
  
    const closeNotiDropdown = () => {
      setNotiDropdownOpen(false);
    };
    const openSetting = () => {
        setSettingDropdownOpen((prevOpen) => !prevOpen);
    }
    const closedSetting = () => {
      document.querySelector('.setting').classList.add('animate__slideOutRight','animate__animated');
      setTimeout(() => {
        setSettingDropdownOpen(false);
      }, 500);
    }
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeNotiDropdown();
      }
    };
    const openTable = () => {
        setisOpenTable(true);
    }
    const closeTable = () => {
        setisOpenTable(false);
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
      const getPageName = () => {
        switch (location.pathname) {
          case '/dashboard':
            return 'Dashboard';
          case '/classes':
            return 'Classes';
            case '/calender':
            return 'Calender';
          default:
            return '';
        }
      };
      
  return (
    <>
    {settingDropdownOpen && 
     <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>
     </div>
    }
    <div className="flex w-full h-14 justify-between items-center p-5 ">
    <h1 className='poppins'>{getPageName()}</h1>
    <div className="flex items-center  justify-evenly w-400">
      <div className="search w-48 ">
        <input
          id="search"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          type="text"
          spellCheck="false"
          placeholder="Search"
          className="w-48"
        />
        <div className="search-icon">
          <button>
            <i className="fa-solid fa-magnifying-glass " />
          </button>
        </div>
      </div>
        <div className="relative ">
      <i className="fa-regular fa-bell ml-4 fa-xl cursor-pointer" onClick={notiDropdown}></i>
      {notiDropdownOpen && (
        <div
          className="absolute h-44 w-28 mt-2 z-50 bg-black p-2 rounded-lg shadow"
        >
          <ul className="flex flex-col">
            <li className="text-gray-400 text-sm">Notifications</li>
            <li className="text-gray-400 text-sm">Messages</li>
            <li className="text-gray-400 text-sm">Events</li>
            <li className="text-gray-400 text-sm">Help</li>
          </ul>
        </div>
      )}
      </div>
      <TeacherDropdown/>
      <i class="fa-solid fa-gear fa-xl cursor-pointer" onClick={openSetting}></i>
      {settingDropdownOpen && 
      <div className="fixed setting  h-screen w-48 bg-white border-[2px]  border-gray-200  right-0 z-50 top-0 p-2">
        <div className="flex justify-end  h-8 items-center">
        <i class="fa-solid fa-x cursor-pointer fa-xl" onClick={closedSetting}></i>
        </div>
        <div className='flex outline items-center justify-center'>
        <i class="fa-solid fa-sun fa-xl mr-2"></i>
        <div className='flex '>
          <input type="checkbox" name="site-mode" id="site-mode" className="w-4"></input>
          <input type="checkbox" name="site-mode" id="site-mode" className="w-4"></input>
        </div>
        <i class="fa-solid fa-moon fa-xl ml-2"></i>
          </div>
        </div>
      }
    </div>
  </div>
  </>
  )
}
