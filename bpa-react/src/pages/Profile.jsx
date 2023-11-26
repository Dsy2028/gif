import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ProfilePicture from '../imgs/police.svg'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {getStorage,ref,uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { app } from '../firebase';
import Footer from '../components/Footer'

export default function Profile() {
  /*
        allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
      */
  const Ref = useRef(null)
  const[file,setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const {currentUser, loading,error} = useSelector((state) => state.user)
  console.log(filePerc)
  console.log(formData)
  console.log(fileUploadError)
  useEffect(() =>{
    if(file){
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
          setFile(undefined); // Reset the file state after successful upload
        });
      }
    );
  };
  
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  console.log(file);
    const openEditProfilePopup = () => {
      setIsEditProfilePopupOpen(true);
    };
  
    const closeEditProfilePopup = () => {
      setIsEditProfilePopupOpen(false);
    };

    const handleOverlayClick = (e) => {
      if (e.target.className === 'overlay') {
        closeEditProfilePopup();
      }
    };
  return (
    <>
    <div className='h-full w-full'>

    <div className={`overlay ${isEditProfilePopupOpen ? 'show' : ''}`} onClick={handleOverlayClick}></div>
    <div className="flex w-full h-screen bg-slate-100">
    <div className='w-max p-6 flex flex-col relative items-center bg-white' id="math-nav">
      <div className='grid grid-cols-1 h-full'>
        <Link to={'/#'} >
          <div className="flex items-center mt-5 color-main ">
            <div className="hover" />
            <i className="fa-solid fa-user fa-2xl" />
            <h2 className="roboto">Dashboard</h2>
          </div>
        </Link>
        <Link to={'/#'}>
          <div className="flex items-center mt-5">
            <i className="fa-solid fa-users fa-2xl" />
            <h2  className="roboto">Profile</h2>
            
          </div>
        </Link>
        <Link to={'/#'}>
          <div className="flex items-center mt-5">
            <div className="hover" />
            <i className="fa-solid fa-school fa-2xl" />
            <h2 className="roboto">Assigned</h2>
          </div>
        </Link>
        <Link to={'/#'}>
          <div className="flex items-center mt-5">
            <div className="hover" />
            <i className="fa-solid fa-book-open fa-2xl" />
            <h2 className="roboto">Study</h2>
          </div>
        </Link>
        <Link to={'/#'}>
          <div className="flex items-center mt-5">
            <div className="hover" />
            <i className="fa-solid fa-message fa-2xl" />
            <h2 className="roboto">Chat</h2>
          </div>
        </Link>
        <Link to={'/#'}>
          <div className="flex items-center mt-5">
            <div className="hover" />
            <i className="fa-solid fa-gear fa-2xl" />
            <h2 className="roboto">Settings</h2>
          </div>
        </Link>
      </div>
    </div>
    <div className="grid grid-cols-1 w-full h-full p-7 gap-y-5 relative">
      <div className="hidden z-10 top-1/3 rounded-lg right-1/3 fixed p-5 w-2/5 h-72 bg-white transition ease-out duration-200 edit-profile-popup outline" style={{ display: isEditProfilePopupOpen ? 'block' : 'none' }}>
        <div className="top-edit-profile-popup  justify-between flex items-center">
          <h1 className='text-2xl'>Edit Profile</h1>
          <i id="close-profile-popup" className="fa-solid fa-x fa-2xl cursor-pointer " onClick={closeEditProfilePopup} />
        </div>
        <div className="form-cont  h-full ">
          <form action="" className='h-full'>
            <div className="form-0 items-center flex flex-col">
              <h3>Edit Username</h3>
              <input type="text" name="edit-email" placeholder='email' className='border p-3 border-slate-500' />
            </div>
            <div className="form-0 items-center flex flex-col">
              <h3>Edit Password</h3>
              <input type="text" name="edit-pass" placeholder='password' className='border p-3 border-slate-500'  />
            </div>
            <div className="flex w-full  justify-between mt-12">
            <div className="">
                <span className='text-red-700'>Delete Account</span>
              </div>
              <button className='text-white main-color rounded w-32 h-9 text-lg font-semibold'>Save</button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex rounded-xl p-6 bg-white">
        <div className="w-1/5">
          <div className="h-1/6 w-full">
            <h1 className='text-3xl font-semibold text-center'>Profile</h1>
          </div>
          <div className="flex justify-center items-center mt-1 flex-col">
            <form>
              <input onChange={(e)=> setFile(e.target.files[0])}type='file' ref={Ref} hidden accept='image/*'></input>
            <img onClick={()=> Ref.current.click()} src={currentUser.avatar} alt="profile-picture" className='rounded-full cursor-pointer h-40 w-40 object-cover '/>
            </form>
            <p>{fileUploadError ? (<span className='text-red-700'>Error Uploading Image</span>) : filePerc > 0 && filePerc < 100 ? (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>) : filePerc === 100 ? (<span className='text-green-500'>Image Uploaded Succesfully</span>) : ""}</p>
          </div>
        </div>
        <div className=" ml-3" />
        <div className="ml-4 w-9/12">
          <div className="flex w-full h-1/6 items-center justify-between">
            <h1 className='text-3xl font-semibold mb-6 '>Statistics</h1>
            <button className="text-white border-none rounded main-color cursor-pointer h-3/4 w-2/12 " onClick={openEditProfilePopup}>Edit Profile</button>
          </div>
          <div className="w-full flex items-center justify-center h-4/5">
            <div className="flex justify-center w-9/12">
              <div className="flex flex-col ml-4">
                <h3>Join Date</h3>
                <p>99/99/9999</p>
              </div>
              <div className="flex flex-col ml-4">
                <h3>Total Topics Learned</h3>
                <p style={{ textAlign: "center", marginTop: "5%" }}>999</p>
              </div>
              <div className="flex flex-col ml-4">
                <h3>Teachers</h3>
                <p style={{ textAlign: "center", marginTop: "5%" }}>999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid p-6 rounded-xl bg-white">
        <h1 className='text-3xl font-semibold text-center'>Badge Counts</h1>
        <div className="flex flex-wrap w-full items-center justify-center">
          <div className="flex flex-col items-center h-1/5 w-1/12 mt-8 mr-8">
            <i className="fa-solid fa-hat-wizard fa-2xl " />
            <p className='mt-4'>1</p>
          </div>
          <div className="flex flex-col items-center h-1/5 w-1/12 mt-8 mr-8">
            <i className="fa-solid fa-chess-knight fa-2xl" />
            <p className='mt-4'>1</p>
          </div>
          <div className="flex flex-col items-center h-1/5 w-1/12 mt-8 mr-8">
            <i className="fa-solid fa-dragon fa-2xl" />
            <p className='mt-4'>1</p>
          </div>
          <div className="flex flex-col items-center h-1/5 w-1/12 mt-8 mr-8">
            <i className="fa-solid fa-ghost fa-2xl" />
            <p className='mt-4'>1</p>
          </div>
        </div>
      </div>
      <div className="profile-container bg-white rounded-lg">
        <h1 className='text-3xl font-semibold text-center'>Main Topics</h1>
      </div>
    </div>
  </div>
  <Footer/>
  </div>  
</>

  )
}
