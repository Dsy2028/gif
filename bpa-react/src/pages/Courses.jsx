import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Footer from '../components/Footer';

export default function Courses() {
  const [course, setCourse] = useState(null);
  useEffect(() => {
    fetch(`https://bpa-api1.onrender.com/api/courseheader/courses`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
       // console.log('Fetched data:', data);
        setCourse(data);
   
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
     <>
     <div className="dark:bg-slate-800">
      
      <h1 className="font-semibold text-center text-4xl color-main dark:text-white  ">Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-16 lg:px-24 gap-9 mt-7">
        {course && course.map((course, index) => (
          <div key={index}>
            <h2 className="text-xl font-medium uppercase dark:text-white">{course.courseHeader}</h2>
            
            <div className="grid grid-cols-2 gap-6 mt-2">
              {course.courses.map((topic, index) => (
                <div className=" p-4 border border-gray-200 rounded shadow-sm" key={index}>
                  <h3 className="dark:text-slate-300">{topic.courseName}</h3>
                  <Link to={`/courses/${topic.courseName}`} className="text-blue-700 lowercase hover:underline"> {topic.units.length} Units</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      </div>
      <Footer />
    </>
  );
}