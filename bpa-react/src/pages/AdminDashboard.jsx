import React from 'react'
import { ReactDOM } from 'react';
import { useState,useEffect } from 'react'
import fetchUser from '../components/fetchUser'
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import TeacherDropdown from '../components/TeacherDropdown';
import AdminDashboardNav from '../components/AdminDashboardNav';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import { registerables } from 'chart.js';

// import moment from 'moment';



export default function AdminDashboard() {
  const { currentUser, loading} = useSelector((state) => state.user);
  const { user, error } = fetchUser(currentUser);
  const [allUsers, setAllUsers] = useState(null);
  const [roleCounts, setRoleCounts] = useState({});
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();
 
  useEffect(() => {
   ChartJS.register(...registerables);
    fetch(`http://localhost:3000/api/user/getUsers`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
       // console.log('Fetched data:', data);
        setAllUsers(data);
     //   console.log(data.map((user, index) => {
       //   return user.email
        //}))
        let roleCounts = data.reduce((acc, user) => {
          if (acc[user.role]) {
            acc[user.role]++;
          } else {
            acc[user.role] = 1;
          }
          return acc;
        }, {});
        const countsByDate = data.reduce((counts, user) => {
          const date = new Date(user.createdAt).toISOString().split('T')[0];
          if (counts[date]) {
            counts[date]++;
          } else {
            counts[date] = 1;
          }
          return counts;
        }, {});

        const dates = Object.keys(countsByDate).sort();
        const counts = dates.map(date => countsByDate[date]);
       
        

        setChartData({
          labels: dates, // array of dates
          datasets: [
            {
              label: 'New Users',
              data: counts, // array of counts
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
        
        setRoleCounts(roleCounts);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);
 // console.log(chartData);
  const deleteUser = async (userId) => {
    
    const c = window.confirm(
      "Are you sure you want to delete this account? This action cannot be undone."
    );

    if (!c) {
      return;
    }
    console.log(userId)
    try {
      const res = await fetch(`/api/user/delete/users/user`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId}),
      });
     /* const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }*/
     window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
   <>
   <div className="p-1 bg-slate-800 min-h-screen">
   <div className="flex justify-end mr-4 mt-3">
      <TeacherDropdown/>
    </div>
    <div className="flex mt-3">
    <AdminDashboardNav/>
    <div className="grid  w-full ml-4 px-3 pl-[6rem]">
      <div className=" grid grid-cols-4 gap-3 h-fit">
        <div className="bg-slate-700 flex p-3">
        <div className="rounded-full grid place-items-center bg-fuchsia-600 w-12 h-12">
        <i class="fa-solid fa-user fa-2xl"></i>
        </div>
        <div className="flex flex-col ml-3">
          <h1 className="nunito text-white font-semibold text-xl">Total Users</h1>
          <span className="nunito text-white">{allUsers && allUsers.length} Users</span>
        </div>
        </div>
        <div className="bg-slate-700 flex p-3">
        <div className="rounded-full grid place-items-center bg-fuchsia-600 w-12 h-12">
        <i class="fa-solid fa-user fa-2xl"></i>
        </div>
        <div className="flex flex-col ml-3">
          <h1 className="nunito text-white font-semibold text-xl">Total Teachers</h1>
          <span className="nunito text-white">{allUsers && roleCounts.teacher} Teachers</span>

        </div>
        </div>
        <div className="bg-slate-700 flex p-3">
        <div className="rounded-full grid place-items-center bg-fuchsia-600 w-12 h-12">
        <i class="fa-solid fa-user fa-2xl"></i>
        </div>
        <div className="flex flex-col ml-3">
          <h1 className="nunito text-white font-semibold text-xl">Total Students</h1>
          <span className="nunito text-white">{allUsers && roleCounts.student} Students</span>
        </div>
        </div>
        <div className="bg-slate-700 flex p-3">
        <div className="rounded-full grid place-items-center bg-fuchsia-600 w-12 h-12">
        <i class="fa-solid fa-user fa-2xl"></i>
        </div>
        <div className="flex flex-col ml-3 ">
          <h1 className="nunito text-white font-semibold text-xl">Total Admins</h1>
          <span className="nunito text-white">{allUsers && roleCounts.admin} Admins</span>
        </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-11 mb-11">
        <h1 className="nunito text-2xl font-semibold text-white mb-4">New Users</h1>
        <div style={{ height: '500px', width: '100%' }}>
       {allUsers && chartData && <Line data={chartData} options={{
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
}}/>}
</div>
        
      </div>
    </div>
    </div>
   </div>
   </>
  )
}
