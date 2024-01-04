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
        days.push(<li className="inactive border-[1px] mr-1 rounded bg-slate-200 border-gray-200 text-2xl">{lastDateofLastMonth - i + 1}</li>);
      }
  
      for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === currentDate.getDate() && currentMonth === new Date().getMonth() 
                     && currentYear === new Date().getFullYear() ? "main-color text-white dark:bg-violet-700" : "";
        days.push(<li className={`border-[1px] rounded mr-1 border-gray-200 text-2xl ${isToday}`}>{i}</li>);
      }
  
      for (let i = lastDayofMonth; i < 6; i++) {
        days.push(<li className="inactive border-[1px] rounded bg-slate-200 mr-1 border-gray-200 text-2xl">{i - lastDayofMonth + 1}</li>);
      }
  
      return days;
    };
  
    const changeMonth = (direction) => {
      let newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
      setCurrentDate(newDate);
    };
    const day = () => {
      switch (currentDate.getDay()) {
        case 1:
          return 'Monday';
        case 2:
          return 'Tuesday';
          case 3:
          return 'Wednesday';
          case 4:
            return 'Thursday';
            case 5:
              return 'Friday';
              case 6:
                return 'Saturday'
                case 0:
                  return 'Sunday'
        default:
          return '1';
      }
    }; const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <>
    <DashboardNav/>
    <div className='pl-56 dark:bg-slate-700'>
      <DashNav/>
      <div className='flex flex-col items-center justify-center h-screen '>
        <h1 className='text-3xl font-bold dark:text-white'>Calender</h1>
        <div className='grid w-cal h-cal  '>
          <h1 className="nunito font-semibold text-lg dark:text-white">{`${day()} ${months[currentDate.getMonth()]} ${currentDate.getDate()} , ${currentDate.getFullYear()}`}</h1>
          <ul className='grid grid-cols-7  dark:text-white '>
          {dayNames.map(day => <li key={day}>{day}</li>)}
            {renderCalendar()}
          </ul>
        </div>
        <div className='flex justify-between mt-4 w-32'>
        <button id="prev"  onClick={() => changeMonth(-1)}><i class="fa-solid fa-chevron-left color-main fa-2xl dark:text-violet-700"></i></button>
          <button  onClick={() => changeMonth(1)}><i class="fa-solid fa-chevron-right fa-2xl color-main dark:text-violet-700"></i></button>
        </div>
      </div>
    </div>
  </>
  )
}
