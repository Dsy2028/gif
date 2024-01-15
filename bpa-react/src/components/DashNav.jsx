import React,{ useRef,useState } from 'react'
import TeacherDropdown from './TeacherDropdown.jsx'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'animate.css';
import Switch from "react-switch";

export default function DashNav() {
    const data = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];
    const [open_Table, setisOpenTable] = useState(false);
    const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);
    const [notiDropdownOpen, setNotiDropdownOpen] = useState(false);
    const dropdownRef = useRef(false);
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);

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
      const handleDarkModeToggle = (checked) => {
        setDarkMode(checked);
        if (checked) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      };
      
  return (
    <>
    {settingDropdownOpen && 
     <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>
     </div>
    }
    <div className="flex w-full h-14 justify-between items-center p-5 ">
    <h1 className='poppins dark:text-white'>{getPageName()}</h1>
    <div className="flex items-center  justify-evenly w-[10rem] ">
      <div className='flex '>
        <Switch onChange={handleDarkModeToggle} checked={darkMode} offColor="#bbbbbb" onHandleColor="#6c28d9" offHandleColor="#FFBF00" height={20} width={48} handleDiameter={18} onColor="#1f1b24" uncheckedIcon={false} checkedIcon={false} />
      </div>
      <TeacherDropdown/>
    </div>
  </div>
  </>
  )
}
