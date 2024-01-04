import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ProfilePicture from '../imgs/police.svg'
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import DashNav from './DashNav';
import DashboardNav from './DashboardNav';
import { updateUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart, updateUserStart } from '../redux/user/userSlice.js';


export default function TeacherProfile() {

    const Ref = useRef(null)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const { currentUser, loading, error } = useSelector((state) => state.user)
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      if (file) {
        handleFileUpload(file);
      }
    }, [file]);
  
    
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
          setFile(undefined);
          setFilePerc(0);
          
          fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ avatar: downloadUrl }),
          })
            .then(response => response.json())
            .then(data => {
              dispatch(updateUserSuccess(data));
            })
            .catch(error => {
              console.error('Error:', error);
            });
      });
      }
    );
  };
  
    
    
    const openEdit = () => {
      if (Ref.current) {
        Ref.current.value = "";
      }
      setFile(undefined);
      setFilePerc(0);
      setEdit(true);
    };
  
    const closeEdit = () => {
      if (Ref.current) {
        Ref.current.value = "";
      }
      setFile(undefined);
      setFilePerc(0);
      setEdit(false);
    };
  
    const handleOverlayClick = (e) => {
      if (e.target.className === 'overlay') {
        closeEdit();
      }
    };

    const deleteUser = async () => {
      const c = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  
    if (!c) {
      return;
    }
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const update = async () => {
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        dispatch(updateUserSuccess(data));
        closeEdit();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    const date = new Date(currentUser.createdAt);
  const formattedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
  const [activeTab, setActiveTab] = useState('Testing');
  return (
    <>
        { edit  && 
    <div className='fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>

    </div>

    }
    <DashboardNav/>
    <div className="pl-56 min-h-screen dark:bg-slate-700">
        <DashNav/>
        { edit &&
        
        <div className="fixed z-50 inset-0 flex items-center justify-center ">
            
            <div className="rounded mt-20 p-3 h-[40rem] w-[40rem] bg-white">
              <div className="flex justify-between items-center p-2 border-b-[1px] border-gray-200">
                <h1 className="text-3xl nunito ">Edit Profile</h1>
                <i
                  class="fa-solid fa-xmark fa-2xl cursor-pointer"
                  onClick={closeEdit}
                ></i>
              </div>
              <div className="mt-2 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Edit Photo</h1>
                <div>
                  <form>
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      ref={Ref}
                      hidden
                      accept="image/*"
                    ></input>
                    <img
                      onClick={() => Ref.current.click()}
                      src={currentUser && currentUser.avatar}
                      alt="profile-picture"
                      className="rounded-full cursor-pointer h-40 w-40 object-cover "
                    />
                  </form>
                  <div>
                    {filePerc > 0 && filePerc < 100 && (
                      <div className="flex">
                      <div className=" border-[1px]  rounded-lg mt-2" style={{ width: "13rem " }}>
                        <div
                          className="bg-sky-500 rounded-lg h-3"
                          style={{ width: `${filePerc}%` }}
                        ></div>
                      </div>
                      <span>{filePerc} %</span>
                      </div>
                    )}
                    {filePerc === 100 ? (
                      <span className="text-green-500">Image Successfully Uploaded</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">First Name</h1>
                <input
                  type="text"
                  value={currentUser.firstName}
                  id="firstName"
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded w-full p-1"
                />
              </div>
              <div className="mt-4 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Last Name</h1>
                <input
                id="lastName"
                  type="text"
                  value={currentUser.lastName}
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded w-full p-1"
                />
              </div>
              <div className="mt-3 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Email</h1>
                <input
                  type="text"
                  value={currentUser.email}
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded ml-8 w-full p-1"
                />
              </div>
              <div className="mt-4 flex border-b-[1px] border-gray-200 p-1">
                <h1 className="nunito text-xl">Password</h1>
                <input
                  type="text"
                  name="password"
                  onChange={handleChange}
                  className="border-[1px] border-gray-200 rounded w-full p-1"
                />
              </div>
              <div className=" flex justify-between mt-[4rem]">
                <div>
                  <button
                    onClick={deleteUser}
                    className="bg-red-500 rounded w-[8rem] "
                  >
                    Delete Account
                  </button>
                </div>
                <div className="">
                  <button className="w-[5rem] border-[1px] rounded mr-3">
                    Cancel
                  </button>
                  <button
                    className="w-[5rem] border-[1px] rounded main-color text-white dark:bg-violet-700"
                    onClick={update}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

        </div>

        }
    <div className=" ">
      <div className="profile__container  flex">
        <div className="profile__avatar-container ">
          <img
            className="profile__avatar rounded-full object-cover h-48 w-48"
            src={currentUser.avatar}
            alt="avatar"
          />
        </div>
        <div className="profile__info ml-4">
          <h1 className="profile__name dark:text-white">{currentUser.firstName} {currentUser.lastName}</h1>
          <p className="profile__email dark:text-white">{currentUser.email}</p>
          <p className="profile__date dark:text-white">Joined on {formattedDate}</p>
         <button className="border-[1px] rounded w-[6rem] border-gray-200 mt-3 dark:text-white dark:bg-violet-700" onClick={openEdit}>Edit Profile</button>
        </div>
      </div>
      </div>
      <div className="border-b-2  mt-5">
      <div className="flex">
    <h1 
      className={` w-[6rem] text-center text-xl cursor-pointer dark:text-white ${activeTab === 'Testing' ? 'border-blue-500 border-b-2' : ''}`} 
      onClick={() => setActiveTab('Testing')}
    >
      Testing
    </h1>
    <h1 
      className={`w-[7rem]  text-center text-xl cursor-pointer  dark:text-white ${activeTab === 'InProgress' ? 'border-blue-500 border-b-2 ' : ''}`} 
      onClick={() => setActiveTab('InProgress')}
    >
      In progress
    </h1>
    <h1 
      className={`w-[7rem] text-center text-xl cursor-pointer dark:text-white  ${activeTab === 'InCondis' ? 'border-blue-500 border-b-2' : ''}`} 
      onClick={() => setActiveTab('InCondis')}
    >
      In condis
    </h1>
  </div>
      </div>
    <div className={`${activeTab === 'InCondis' ? 'block ': 'hidden'}`}>
    <h1>asdasdasd</h1>
  </div>
  <div className={` outline ${activeTab === 'InProgress' ? 'block ': 'hidden'}`}>
    <h1>asdasdasd</h1>
  </div>
  <div className={`${activeTab === 'Testing' ? 'block': 'hidden'}`}>
    <h1>asdasdasd</h1>
  </div>
    </div>
    </>
  )
}
