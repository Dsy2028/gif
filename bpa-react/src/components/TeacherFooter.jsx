import React from 'react';
import { Link } from 'react-router-dom';

export default function TeacherFooter() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
  return (
    <div className='flex justify-between bg-zinc-100  p-4 items-center dark:bg-slate-800  mt-9'>
      <div className='dark:text-white'>
        {currentYear} &copy; LearnX all rights reserved
      </div>
      <div className='w-60'>
        <ul className='flex gap-3'>
          <li className='hover:text-blue-700 dark:text-white'key="about"><Link to="/about">About Us</Link></li>
          <li className='hover:text-blue-700 dark:text-white' key="help"><Link to="/help">Help</Link></li>
          <li className='hover:text-blue-700 dark:text-white' key="contact"><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </div>
  );
}