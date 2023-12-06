import React,{ useEffect,useRef , useState} from "react";
import DashboardNav from "../components/DashboardNav";
import TeacherFooter from "../components/TeacherFooter";
import { XYPlot, RadialChart } from "react-vis";
import TeacherDropdown from "../components/TeacherDropdown.jsx";
import  {Doughnut } from 'react-chartjs-2';

export default function Dashboard() {
    const data = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];
    const [open_Table, setisOpenTable] = useState(false);
    const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);
    const [notiDropdownOpen, setNotiDropdownOpen] = useState(false);
    const dropdownRef = useRef(false);
  
    const notiDropdown = () => {
      setNotiDropdownOpen((prevOpen) => !prevOpen);
      console.log('noti opened')
    };
  
    const closeNotiDropdown = () => {
      setNotiDropdownOpen(false);
    };
  
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
    return (
        
      <div className="flex h-screen ">
        <DashboardNav />
        < div className="flex flex-col flex-grow pl-56">
            <div className='h-28 bg-black w-20 fixed top-32 right-32' style={{ display: open_Table ? 'block' : 'none' }}>
                
            </div>
          <div className="flex w-full h-14 justify-between items-center p-5 ">
            <h1 className='poppins'>Dashboard</h1>
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
                <div className="relative">
              <i className="fa-regular fa-bell ml-4 fa-xl cursor-pointer" onclick={notiDropdown}></i>
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
              <i class="fa-solid fa-gear fa-xl"></i>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 p-5">
            <div className="border-[2px] rounded border-gray-200 flex items-center justify-center">
              <RadialChart data={data} height={200} width={200} />
            </div>
            <div className="border-[2px] rounded border-gray-200e">
              <h1>prof</h1>
            </div>
            <div className="border-[2px] rounded border-gray-200">
              <h1>prof</h1>
            </div>
            <div className="border-[2px] rounded border-gray-200">
              <h1>prof</h1>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 p-5">
            <div className="border-[2px] rounded border-gray-200 grid place-items-center">
            <RadialChart data={data} height={300} width={200} />
            </div>
            <div className="border-[2px] rounded border-gray-200 grid place-items-center">
            <RadialChart data={data} height={300} width={200} />
            </div>
            <div className="border-[2px] rounded border-gray-200 grid place-items-center">
           
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 p-5'>
            <div className='border-[2px] rounded border-gray-200'>
            </div>
            <div className='border-[2px] rounded border-gray-200 p-4'>
                <div className='flex justify-between mb-3'>
                    <h1 className='font-medium poppins text-lg'>All Classes</h1>
                    <i onclick={closeTable} class="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
                </div>
                <table className='w-full text-center'>
                    <tr className='font-semibold text-gray-400 border-b-[2px] text-lg'>
                        <th>Classes</th>
                        <th>Students</th>
                        <th>Assignments</th>
                        <th>Due</th>
                    </tr>
                    <tr className='border-b-[2px] p-5'>
                        <td>2nd Period</td>
                        <td>20</td>
                        <td>10</td>
                        <td>2</td>
                    </tr>
                    <tr className='border-b-[2px]'>
                        <td>4th Period</td>
                        <td>20</td>
                        <td>10</td>
                        <td>2</td>
                    </tr>
                    <tr className='border-b-[2px]'>
                        <td>7th Period</td>
                        <td>20</td>
                        <td>10</td>
                        <td>2</td>
                    </tr>
                    <tr className='border-b-[2px] p-3'>
                        <td>9th Period</td>
                        <td>20</td>
                        <td>10</td>
                        <td>2</td>
                    </tr>
                </table>
            </div>
          </div>
          <br></br>
          <br></br>
          <TeacherFooter />
        </div>
      </div>
    );
  }