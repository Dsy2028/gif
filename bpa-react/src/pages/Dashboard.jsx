import React,{ useEffect,useRef , useState} from "react";
import DashboardNav from "../components/DashboardNav";
import TeacherFooter from "../components/TeacherFooter";
import { XYPlot, RadialChart } from "react-vis";
import TeacherDropdown from "../components/TeacherDropdown.jsx";
import  {Doughnut } from 'react-chartjs-2';
import DashNav from "../components/DashNav.jsx";
import ApexCharts from 'apexcharts'
import { json } from "react-router-dom";
import Chart from "react-apexcharts";
export default function Dashboard() {
    const data = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];
    const [open_Table, setisOpenTable] = useState(false);
    const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);
    const [notiDropdownOpen, setNotiDropdownOpen] = useState(false);
    const [chart, setChart] = useState({});
    const dropdownRef = useRef(false);

    useEffect(() => {
      fetch("")
      .then(res => res.json())
      .then(res => {
        const {data} = json
        setChart({
        })
      })
    })
  /** <Chart type='donut' options={chartOptions} series={chartSeries}/> */
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
        < div className="flex flex-col flex-grow pl-48">
            <div className='h-28 bg-black w-20 fixed top-32 right-32' style={{ display: open_Table ? 'block' : 'none' }}>
                
            </div>
            <DashNav/>
          <div className="grid grid-cols-4 gap-4 mt-4 p-5">
            <div className="border-[2px] rounded border-gray-200 flex items-center justify-center shadow-lg">
              <RadialChart data={data} height={200} width={200} />
            </div>
            <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col">
              <div className='flex items-center'>
              <div className='rounded-full w-9  grid place-items-center h-9 bg-green-500'>
              <i class="fa-solid fa-check fa-xl"></i>
              </div>
              <h1 className='nunito font-bold text-xl ml-3'>Completed Assignments</h1>
              </div>
            
            </div>
            <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg">
              <div className='flex items-center'>
              <div className='rounded-full w-9  grid place-items-center h-9 bg-red-600'>
              <i class="fa-solid fa-exclamation fa-xl text"></i>
              </div>
              <h1 className='nunito font-bold text-xl ml-3'>Missing Assignments</h1>
              </div>
            </div>
            <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg">
              <div className='flex items-center'>
                <div className='rounded-full w-9  grid place-items-center h-9 bg-amber-100'>
              <i class="fa-solid fa-star fa-xl text-amber-400"></i>
              </div>
              <h1 className='nunito font-bold text-xl ml-3'>Top Class</h1>
              </div>
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