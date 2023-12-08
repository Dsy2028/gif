import React, { useEffect, useState } from 'react';
import DashNav from '../components/DashNav'
import DashboardNav from '../components/DashboardNav'

export default function Calender() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];
  
    useEffect(() => {
      renderCalendar();
    }, [currentDate]);
  
    const renderCalendar = () => {
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth();
      let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();
      let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();
      let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
      let days = [];
     
      for (let i = firstDayofMonth; i > 0; i--) {
        days.push(<li className="inactive border-[2px] rounded border-gray-200 text-2xl">{lastDateofLastMonth - i + 1}</li>);
      }
  
      for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === currentDate.getDate() && currentMonth === new Date().getMonth() 
                     && currentYear === new Date().getFullYear() ? "activ" : "";
        days.push(<li className={`border-[2px] rounded border-gray-200 text-2xl${isToday}`}>{i}</li>);
      }
  
      for (let i = lastDayofMonth; i < 6; i++) {
        days.push(<li className="inactive border-[2px] rounded border-gray-200 text-2xl">{i - lastDayofMonth + 1}</li>);
      }
  
      return days;
    };
  
    const changeMonth = (direction) => {
      let newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
      setCurrentDate(newDate);
    };
  return (
    <>
    <DashboardNav/>
    <div className='pl-56'>
      <DashNav/>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold'>Calender</h1>
        <div className='grid w-cal h-cal border-[2px] rounded border-gray-200 '>
          <h1>{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h1>
          <ul className='grid grid-cols-7  '>
            {renderCalendar()}
          </ul>
        </div>
        <div className='flex justify-between mt-4 w-32'>
        <button id="prev" onClick={() => changeMonth(-1)}><i class="fa-solid fa-chevron-left color-main fa-2xl"></i></button>
          <button  onClick={() => changeMonth(1)}><i class="fa-solid fa-chevron-right fa-2xl color-main"></i></button>
        </div>
      </div>
    </div>
  </>
  )
}
