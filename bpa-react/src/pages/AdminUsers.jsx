/**
 * This pages lets the admin see all the users who have signed into this website they can remove accounts and change their information. 
 * 
 */

import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect } from "react";
import fetchUser from "../components/fetchUser";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TeacherDropdown from "../components/TeacherDropdown";
import AdminDashboardNav from "../components/AdminDashboardNav";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { registerables } from "chart.js";

export default function AdminUsers() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const { user, error } = fetchUser(currentUser);
  const [allUsers, setAllUsers] = useState(null);
  const [editUsers, setEditUsers] = useState(false);
  const [use, setUse] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
const itemsPerPage = 25;
const numbersPerPage = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    ChartJS.register(...registerables);
    fetch(`https://bpa-api1.onrender.com/api/user/getUsers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAllUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const update = async (userId) => {

    try {
      const res = await fetch(`https://bpa-api1.onrender.com/api/user/update/users/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, ...formData }),
      });
      const data = await res.json();
      closeEdit();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleOverlayClick = (e) => {
    if (e.target.className === "overlay") {
      closeEditProfilePopup();
    }
  };
  

  const editUser = (user) => {
    setEditUsers(true);
    setUse(user);
  };
  const closeEdit = () => {
    setEditUsers(false);
    setUse(null);
    setFormData(null)
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allUsers && (searchTerm
    ? allUsers.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    : allUsers)
    .slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  const numberOfGroups = Math.ceil(allUsers && allUsers.length / (itemsPerPage * numbersPerPage));
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber % numbersPerPage === 0) {
      setCurrentGroup(prevGroup => prevGroup + 1);
    } else if ((pageNumber - 1) % numbersPerPage === 0 && pageNumber !== 1) {
      setCurrentGroup(prevGroup => prevGroup - 1);
    }
  };
  for (let i = 1; i <= Math.ceil( allUsers && allUsers.length / itemsPerPage); i++) {
    if (i > (currentGroup - 1) * numbersPerPage && i <= currentGroup * numbersPerPage) {
      pageNumbers.push(i);
    }
  }
  const deleteUser = async (userId) => {

    const c = window.confirm(
      "Are you sure you want to delete this account? This action cannot be undone."
    );

    if (!c) {
      return;
    }
    try {
      const res = await fetch(`https://bpa-api1.onrender.com/api/user/delete/users/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
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
  const handleNextClick = () => {
    if (currentGroup < numberOfGroups) {
      setCurrentGroup(prevGroup => prevGroup + 1);
      setCurrentPage(prevPage => prevPage + numbersPerPage);
    }
  };
  
  const handlePrevClick = () => {
    if (currentGroup > 1) {
      setCurrentGroup(prevGroup => prevGroup - 1);
      setCurrentPage(prevPage => prevPage - numbersPerPage);
    }
  };
  const renderPageNumbers = pageNumbers.map(number => {
    return (
        <div>
        
             <button
             className="flex rounded w-[2rem] bg-fuchsia-600 items-center justify-center "
        key={number}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </button>    
     
      </div>
    );
  });

  

  return (
    <>
      <div className="p-1 bg-slate-800 min-h-screen">
        <div className="flex justify-between mr-4 mt-3">
          <h1 className="text-white nunito font-semibold ml-[10rem] text-xl">
            Find & Edit Users
          </h1>
          <TeacherDropdown />
        </div>
        <div className="flex mt-3">
          <AdminDashboardNav />
          {editUsers && use && (
            <div className="fixed z-50 inset-0 flex items-center justify-center ">
              <div className="bg-white rounded p-4 ">
                <div className="flex justify-between items-center">
                  <h1 className="nunito font-semibold text-xl">
                    Edit: {use.email}
                  </h1>
                  <i
                    class="fa-solid fa-x cursor-pointer"
                    onClick={closeEdit}
                  ></i>
                </div>
                <div className="mt-3 flex border-b-[1px] border-gray-200 p-1">
                  <h1 className="nunito text-lg">First Name</h1>
                  <input
                    id="firstName"
                    type="text"
                    onChange={handleChange}
                    className="border-[1px] border-gray-200 rounded ml-8 w-full p-1"
                  />
                </div>
                <div className="mt-3 flex border-b-[1px] border-gray-200 p-1">
                  <h1 className="nunito text-lg">Last Name</h1>
                  <input
                    id="lastName"
                    type="text"
                    onChange={handleChange}
                    className="border-[1px] border-gray-200 rounded ml-8 w-full p-1"
                  />
                </div>
                <div className="mt-3 flex border-b-[1px] border-gray-200 p-1">
                  <h1 className="nunito text-lg">Email</h1>
                  <input
                    id="email"
                    type="text"
                    onChange={handleChange}
                    className="border-[1px] border-gray-200 rounded ml-8 w-full p-1"
                  />
                </div>
                <div className="mt-3 flex border-b-[1px] border-gray-200 p-1">
                  <h1 className="nunito text-lg">Password</h1>
                  <input
                    id="password"
                    type="text"
                    onChange={handleChange}
                    className="border-[1px] border-gray-200 rounded ml-1 w-full p-1"
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <button
                    className="bg-red-500 rounded px-2 w-[7rem]  "
                    onClick={() => deleteUser(use._id)}
                  >
                    Delete User
                  </button>
                  <button className="bg-fuchsia-600 rounded px-2 w-[7rem] text-white" onClick={() => update(use._id)}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col w-full pl-[6rem]">
            <div className="pl-5 mb-2">
            <input id="search" className="rounded p-2" placeholder='Search For Users' onChange={(e) => setSearchTerm(e.target.value)} ></input>
            </div>
            <div className="w-full pl-5 pr-5 mb-4">
              <table className="w-full text-center ">
                <tr className="font-semibold text-gray-400 border-b-[2px] text-lg dark:text-slate-300">
                  <th>User ID</th>
                  <th>Avatar</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                </tr>
                {allUsers &&
                  currentItems.map((user, index) => (
                    <tr className="border-b-[2px]  text-white" key={index}>
                      <td>{user._id}</td>
                      <td>
                        {
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.avatar}
                          />
                        }
                      </td>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.role}</td>
                      <td>
                        <i
                          class="fa-solid fa-ellipsis-vertical fa-xl cursor-pointer"
                          onClick={() => editUser(user)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="flex w-full pl-5 pr-5 mb-4 justify-center gap-2">
            {currentGroup > 1 && <button onClick={handlePrevClick} className=" rounded text-white w-fit px-3 bg-fuchsia-600">Prev</button>}
            {renderPageNumbers}
            {currentGroup < numberOfGroups &&  <button onClick={handleNextClick} className=" rounded text-white w-fit px-3 bg-fuchsia-600">Next</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
