import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ApexCharts from 'apexcharts'
import ProfilePicture from '../imgs/police.svg'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { XYPlot, RadialChart } from "react-vis";
import Calender from './Calender.jsx';
import Footer from '../components/Footer.jsx'



export default function Profile() {
  /*
        allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
      */

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

  const data = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];
  const Ref = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user)
  console.log(filePerc)
  console.log(formData)
  console.log(fileUploadError)
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
          setFile(undefined); // reset the file state after successful upload
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
                    <input type="text" name="edit-pass" placeholder='password' className='border p-3 border-slate-500' />
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
                    <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={Ref} hidden accept='image/*'></input>
                    <img onClick={() => Ref.current.click()} src={currentUser && currentUser.avatar} alt="profile-picture" className='rounded-full cursor-pointer h-40 w-40 object-cover ' />
                  </form>
                  <p>{fileUploadError ? (<span className='text-red-700'>Error Uploading Image</span>) : filePerc > 0 && filePerc < 100 ? (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>) : filePerc === 100 ? (<span className='text-green-500'>Image Uploaded Succesfully</span>) : ""}</p>
                </div>
              </div>
              <div className=" ml-3" />
              <div className="ml-4 w-9/12">
                <div className="flex w-full h-1/6 items-center justify-between">

                  <div className="flex flex-col ml-4">
                    <h3></h3>
                    <p style={{ textAlign: "center", marginTop: "5%" }}></p>
                  </div>
                  <button className="text-white border-none rounded main-color cursor-pointer h-3/4 w-2/12 " onClick={openEditProfilePopup}>Edit Profile</button>
                </div>
                <div className="w-full flex items-center justify-center h-4/5">
                  <div className="flex justify-center w-9/12">
                    <div className="flex flex-col ml-4">
                      <h3>Join Date</h3>
                      <p>99/99/9999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="grid p-6 rounded-xl bg-white">
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
            </div> */}

            <div className="grid p-6 rounded-xl bg-white">
              <h1 className='text-3xl font-semibold text-center'>Completed</h1>
              <div className="flex flex-wrap w-full items-center justify-center">
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
                  <div className='flex items-center'>
                    <h1 className='nunito font-bold text-xl ml-3'>Math</h1>
                  </div>
                  <RadialChart data={data} height={300} width={300} />
                </div>
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
                  <div className='flex items-center'>
                    <h1 className='nunito font-bold text-xl ml-3'>English</h1>
                  </div>
                  <RadialChart data={data} height={300} width={300} />
                </div>
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
                  <div className='flex items-center'>
                    <h1 className='nunito font-bold text-xl ml-3'>History</h1>
                  </div>
                  <RadialChart data={data} height={300} width={300} />
                </div>
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
                  <div className='flex items-center'>
                    <h1 className='nunito font-bold text-xl ml-3'>Science</h1>
                  </div>
                  <RadialChart data={data} height={300} width={300} />
                </div>
              </div>
            </div>
{/* 
            <div className="grid p-6 rounded-xl bg-black">
              <div className="flex flex-wrap w-full items-center justify-center">
                <div className='pl-35 ' >
                  <div className='flex flex-col items-center justify-center '>
                    <h1 className='text-3xl font-bold'></h1>
                    <div className='grid w-cal h-cal border-[130px] rounded border-gray-100 '>
                      <h1>{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h1>
                      <ul className='grid grid-cols-12 '>
                        {renderCalendar()}
                      </ul>
                    </div>
                    <div className='flex justify-between mt-1 w-32'>
                      <button id="prev" onClick={() => changeMonth(-1)}><i class="fa-solid fa-chevron-left color-main fa-1xl"></i></button>
                      <button onClick={() => changeMonth(1)}><i class="fa-solid fa-chevron-right fa-1xl color-main"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="profile-container bg-white rounded-lg">
              <h1 className='text-3xl font-semibold text-center'>Student's Class</h1>
              <div className="grid grid-cols-4 gap-4 mt-4 p-5">
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
                  <div className='flex items-center'>
                    <h1 className='nunito font-bold text-xl ml-3 '>Teachers</h1>
                  </div>
                  <div className="border-[1px] rounded border-gray-300 p-20 shadow-lg flex flex-col">
                    <button class="graph-button">4</button>
                  </div>
                </div>
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
                  <div className='flex items-center'>
                    <h1 className='nunito font-bold text-xl ml-3'>Total Topics Learned</h1>
                  </div>
                  <RadialChart data={data} height={300} width={300} />
                </div>
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
                  <div className='flex items-center'>
                    <h1 className='nunito font-bold text-xl ml-3'>Progress With topics </h1>

                  </div>

                  <div className="grid p-6 rounded-xl bg-black">
                    <h1 className='text-3xl font-semibold text-center'>Completed 1</h1>
                    <div className="flex flex-wrap w-full items-center justify-center"></div>
                  </div>
                  <br></br>
                  <div className="grid p-6 rounded-xl bg-black">
                    <h1 className='text-3xl font-semibold text-center'>Completed 2</h1>
                    <div className="flex flex-wrap w-full items-center justify-center"></div>
                  </div>
                  <br></br>
                  <div className="grid p-6 rounded-xl bg-black">
                    <h1 className='text-3xl font-semibold text-center'>Completed 3</h1>
                    <div className="flex flex-wrap w-full items-center justify-center"></div>
                  </div>
                  {/* <div class="grid-cols-1 sm:grid md:grid-cols-2 ">
                    <div class="p-18">93%</div>
                    <div class="p-18">93%</div>
                    </div>
                    <div class="grid-cols-1 sm:grid md:grid-cols-2 ">
                    <div class="p-18">93%</div>
                    <div class="p-18">93%</div>
                    </div> */}

                </div>
                <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg">
                  <div className='flex items-center'>

                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <Footer />
      </div>
    </>

  )
}





















{/* <div class="datepicker">
                      <div class="datepicker-top">
                        <div class="month-selector">
                        </div>
                      </div>
                      <div class="datepicker-calendar">
                        <span class="day">Mo</span>
                        <span class="day">Tu</span>
                        <span class="day">We</span>
                        <span class="day">Th</span>
                        <span class="day">Fr</span>
                        <span class="day">Sa</span>
                        <span class="day">Su</span>
                        <button class="date">1</button>
                        <button class="date">2</button>
                        <button class="date">3</button>
                        <button class="date">4</button>
                        <button class="date">5</button>
                        <button class="date">6</button>
                        <button class="date">7</button>
                        <button class="date">8</button>
                        <button class="date ">9</button>
                        <button class="date">10</button>
                        <button class="date">11</button>
                        <button class="date">12</button>
                        <button class="date">13</button>
                        <button class="date">14</button>
                        <button class="date">15</button>
                        <button class="date">16</button>
                        <button class="date">17</button>
                        <button class="date">18</button>
                        <button class="date">19</button>
                        <button class="date">20</button>
                        <button class="date">21</button>
                        <button class="date">22</button>
                        <button class="date">23</button>
                        <button class="date">24</button>
                        <button class="date">25</button>
                        <button class="date">26</button>
                        <button class="date">27</button>
                        <button class="date">28</button>
                        <button class="date">29</button>
                        <button class="date">30</button>
                        <button class="date">31</button>
                      </div>
</div> */}