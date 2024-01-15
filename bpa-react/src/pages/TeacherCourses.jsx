import React,{ useEffect,useRef , useState} from "react";
import DashboardNav from "../components/DashboardNav";
import TeacherFooter from "../components/TeacherFooter";

import TeacherDropdown from "../components/TeacherDropdown.jsx";
import  {Doughnut } from 'react-chartjs-2';
import DashNav from "../components/DashNav.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import { registerables } from 'chart.js';
import { json } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFetch } from "../functions/add.js";

export default function TeacherCourses() {
    const [course, setCourse] = useState(null);
    useFetch(`http://localhost:3000/api/courseheader/courses`, setCourse);
  return (
    <>
    <div className="flex min-h-screen dark:bg-slate-700">
        <DashboardNav />
        <div  className="flex flex-col flex-grow pl-48 outline">
            <DashNav/>
            <div className="grid grid-cols-5 gap-4 pl-4 pr-4 mt-7 ">
                {course && course.map((course, index) => (
                    <div className="dark:bg-slate-600 rounded p-1" key={index}>
                        <h1 className=" nunito text-xl dark:text-white">{course.courseHeader}</h1>
                        {course.courses.map((course, index) => (
                            <div key={index}>
                                <h1 className="nunito dark:text-slate-200">{course.courseName}</h1>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}
