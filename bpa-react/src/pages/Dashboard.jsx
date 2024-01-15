/**
 * 
 * 
 */
import React,{ useEffect,useRef , useState} from "react";
import DashboardNav from "../components/DashboardNav";
import TeacherFooter from "../components/TeacherFooter";

import TeacherDropdown from "../components/TeacherDropdown.jsx";
import  {Doughnut } from 'react-chartjs-2';
import DashNav from "../components/DashNav.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, CategoryScale } from 'chart.js';

import { Line } from 'react-chartjs-2';
import { registerables } from 'chart.js';
import { json } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
export default function Dashboard() {

    const [open_Table, setisOpenTable] = useState(false);
    const [settingDropdownOpen, setSettingDropdownOpen] = useState(false);
    const [notiDropdownOpen, setNotiDropdownOpen] = useState(false);
    const [chart, setChart] = useState({});
    const [getStudents, setGetStudents] = useState(0);
    const {teacherId} = useParams();
    const dropdownRef = useRef(false);
    const [getCode, setGetCode] = useState(0);
    const [chartData, setChartData] = useState({});
    const [classWithMostCompleted, setClassWithMostCompleted] = useState(null);
    const [missingAssignments, setMissingAssignments] = useState(null);
    ChartJS.register(...registerables);
    useEffect(() => {
     
      fetch("")
      .then(res => res.json())
      .then(res => {
        const {data} = json
        setChart({
        })
      })
    })

    useEffect(() => {
      fetch(`https://bpa-api1.onrender.com/api/classes/${teacherId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setGetCode(data);
            console.log(data)
          
            
          } else {
            console.error("Fetched data is empty or no classes");
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, []);
    useEffect(() => {
      // Fetch all classes
      fetch(`https://bpa-api1.onrender.com/api/classes/student/${teacherId}`)
        .then(response => response.json())
        .then(classes => {
          // For each class, fetch its students
          const promises = classes.map(classItem => 
            fetch(`https://bpa-api1.onrender.com/api/classes/students?classId=${classItem._id}`)
              .then(response => response.json()),
              
          );

          return Promise.all(promises);
        })
        .then(allStudents => {
          setGetStudents(allStudents);
          console.log(allStudents);
        })
        .catch(error => console.error('Error:', error));
    }, []);
    useEffect(() => {
      let count = 0;
      if (getCode && getCode.length > 0) {
        getCode.forEach(classItem => {
          count += classItem.students.length;
          
        });
      } 
    }, [getCode]);
    useEffect(() => {
      let maxCompletedLessons = 0;
      let classWithMostCompletedLessons = null;
    
      getStudents && getStudents.forEach(classItem => {
        let completedLessonsCount = 0;
        classItem.forEach(classItem => {
          classItem.students.forEach(student => {
            student.completedLessons.forEach(() => {
              completedLessonsCount++;
            });
          });
        });
    
        if (completedLessonsCount > maxCompletedLessons) {
          maxCompletedLessons = completedLessonsCount;
          classWithMostCompletedLessons = classItem;
        }
      });
    
      setClassWithMostCompleted(classWithMostCompletedLessons);
    }, [getStudents]);
    
    useEffect(() => {
      let missingAssignmentsCount = 0;
      let courseAssignments;
      getStudents && getStudents.forEach(classItem => {
        
        classItem.forEach(classItem => {
          
          classItem.students.forEach(student => {
            student.classes.forEach(course => {
              // Assuming courseAssignments is an object that maps courses to assignments
             // const courseAssignments = courseAssignments[course];
              const completedAssignments = student.completed.map(item => item.assignment[0].$oid);
              const missingAssignments = 0;

              setMissingAssignments(missingAssignments);
            });
          });
        });
      });
    }, [getStudents]);
    let completedLessonsCount = 0;
    getStudents && getStudents.forEach(classItem => {
      classItem.forEach(classItem => {
        classItem.students.forEach(student => {
         // console.log(student)
          student.completedLessons.forEach(() => {
            completedLessonsCount++;
          });
        });
      });
    });
    
    
    // Prepare the data for the chart
    const data = {
      labels: ['Completed Lessons'],
      datasets: [
        {
          label: '# of Completed Lessons',
          data: [completedLessonsCount],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  
    
    /*console.log(classWithMostCompleted.map((key,index) => (
      console.log(c)
    )))*/
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
        
      <div className="flex min-h-screen dark:bg-slate-700">
        <DashboardNav />
        < div className="flex flex-col flex-grow pl-48">
            <div className='h-28 bg-black w-20 fixed top-32 right-32' style={{ display: open_Table ? 'block' : 'none' }}>
                
            </div>
            <DashNav/>
          <div className="grid grid-cols-3 gap-4 mt-4 p-5">

            <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg flex flex-col dark:bg-slate-600 dark:border-none">
              <div className='flex items-center'>
              <div className='rounded-full w-9  grid place-items-center h-9 bg-green-500'>
              <i class="fa-solid fa-check fa-xl"></i>
              </div>
              <h1 className='nunito font-bold text-xl ml-3 dark:text-white'>Completed Assignments</h1>   
              </div>
              <Bar data={data} options={{
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
}}/>
            </div>
            <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg dark:bg-slate-600 dark:border-none">
              <div className='flex items-center'>
              <div className='rounded-full w-9  grid place-items-center h-9 bg-red-600'>
              <i class="fa-solid fa-exclamation fa-xl text"></i>
              </div>
              <h1 className='nunito font-bold text-xl ml-3 dark:text-white'>Missing Assignments</h1>
              </div>
            </div>
            <div className="border-[2px] rounded border-gray-200 p-3 shadow-lg dark:bg-slate-600 dark:border-none">
              <div className='flex items-center'>
                <div className='rounded-full w-9  grid place-items-center h-9 bg-amber-100'>
              <i class="fa-solid fa-star fa-xl text-amber-400"></i>
              </div>
              <h1 className='nunito font-bold text-xl ml-3 dark:text-white'>Top Class</h1>
              </div>
              {classWithMostCompleted && classWithMostCompleted.map((classItem, index) => (
                <div className=" h-5/6 flex justify-center items-center">
                  <h1 className="dark:text-white">{classItem.className ? classItem.className : classItem.code}</h1>

                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 p-5 ">
            <div className="border-[2px] rounded border-gray-200 grid place-items-center dark:bg-slate-600 dark:border-none">
        
            </div>
            <div className="border-[2px] rounded border-gray-200 grid place-items-center dark:bg-slate-600 dark:border-none">

            </div>
            <div className="border-[2px] rounded border-gray-200 grid place-items-center dark:bg-slate-600 dark:border-none">
           
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 p-5'>
            <div className='border-[2px] rounded border-gray-200 dark:bg-slate-600 dark:border-none'>
            </div>
            <div className='border-[2px] rounded border-gray-200 p-4 dark:bg-slate-600 dark:border-none'>
                <div className='flex justify-between mb-3'>
                    <h1 className='font-medium poppins text-lg dark:text-white'>All Classes</h1>
                    <i onclick={closeTable} class="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
                </div>
                <table className='w-full text-center'>
  <tr className='font-semibold text-gray-400 border-b-[2px] text-lg dark:text-slate-300'>
    <th>Classes</th>
    <th>Students</th>
    <th>Assignments</th>
    <th>Due</th>
  </tr>
  {getStudents && getStudents.map((classItem, index) => (
    classItem.map((classItem, index) =>(
    <tr className='border-b-[2px] p-5 dark:text-white' key={index}>
      <td>{classItem.className}</td>
      <td>{classItem.students ? classItem.students.length : 0}</td>
      <td>{classItem.assignments ? classItem.assignments.length : 0}</td>
      <td>{classItem.due ? classItem.due.length : 0}</td>
    </tr>
    ))
  ))}

</table>
            </div>
          </div>
          
          <TeacherFooter />
        </div>
      </div>
    );
  }