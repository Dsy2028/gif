import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';

function TopicSkills() {
  const {  topicName } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/api/courses/${topicName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setCourseDetails(data);
        console.log('Course details:', courseDetails);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [topicName]);

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
    <h1 className='font-semibold text-3xl text-center nunito mb-11 dark:text-white'>{courseDetails.courseName}</h1>
    <div className='grid grid-cols-3 grid-rows-3 gap-5 mt-3 pr-4 pl-8 '>
    {courseDetails.units.map((unit, index) => (
  <div className='border-[2px] p-4 shadow-md rounded hover:shadow-lg animate__animated animate__fadeInDown' key={index}>
    <h2 className='font-semibold text-xl mb-2 dark:text-slate-300'>{unit.unitName}</h2>
    <ul className='list-none p-0'>
      {unit.topics.map((topic, index) => (
        <li key={index} className='mb-2'>
          <Link to={`/courses/${topicName}/${topic}`} className='text-normal text-lg text-blue-700  hover:underline'>
            {topic}
          </Link>
        </li>
      ))}
    </ul>
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