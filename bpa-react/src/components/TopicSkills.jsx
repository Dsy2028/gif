import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';

function TopicSkills() {
  const {  topicName } = useParams();
  const {courseName} = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
 
  useEffect(() => {
    fetch(`https://bpa-api1.onrender.com/api/test/${courseName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCourseDetails(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [courseName]);


  if (!courseDetails) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ border: '16px solid #f3f3f3', borderRadius: '50%', borderTop: '16px solid #0b488d', width: '120px', height: '120px', animation: 'spin 2s linear infinite' }} />
      </div>
    );
  }
   const countUnits = () => {
    if (!courseDetails || !courseDetails.units) {
      return 0;
    }
    let topicCount = 0;
    for (let unit of courseDetails.units) {
      if (unit.topics) {
        topicCount += unit.topics.length;
      }
    }
    return topicCount;
  }

  return (
    <>
     <div className="dark:bg-slate-800">
    <div className="pl-[12rem] pr-[12rem]">
      {courseDetails.map((unit, index) => (
        <h1 className='font-semibold text-3xl text-center nunito mb-11 dark:text-white '>{unit.courseName}</h1>

      ))}
    <div className=''>
    {courseDetails && courseDetails.map((course, index) => (
  <div className=' grid grid-cols-3 grid-rows-3 gap-5 mt-3 pr-4 pl-8 ' key={index}>
    {course.units.map((unit, index) => (
      <div key={index} className="border-[2px] p-4 shadow-md rounded hover:shadow-lg animate__animated animate__fadeInDown">
        <h2 className='font-semibold text-xl mb-2 dark:text-slate-300'>{unit.name}</h2>
        {unit.topics && unit.topics.map((topic, index) => (
          <ul className='list-none p-0' key={index}>
            <li className='mb-2'>
              <Link to={`/courses/${courseName}/${topic.topicName}`} className='text-normal text-lg text-blue-700  hover:underline'>
                {topic.topicName}
              </Link>
            </li>
          </ul>
        ))}
      </div>
    ))}
  </div>
))}
    </div>

    </div>
    <br></br>
    <br/>
    <br/>
    </div>
    <Footer />
    </>
  );
}

export default TopicSkills;