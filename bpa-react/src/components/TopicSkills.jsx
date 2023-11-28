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
    <h1 className='text-semibold text-3xl text-center'>{courseDetails.courseName}</h1>
    <p>Number of units: {countUnits()}</p>
    <Link to="/questions/:question">
        <button>Go to Questions List</button>
      </Link>
    <div className='grid grid-cols-3 grid-rows-3 gap-5 mt-3 pr-4 pl-8 '>
      {/*  */}
      {courseDetails.units.map((unit, index) => (
        <div className='outline rounded'key={index}>
          <h2 className='text-semibold text-2xl'>{unit.unitName}</h2>
          {/*  */}
          {unit.topics.map((topic, index) => (
            <Link to={'/'}><p className='text-normal text-lg text-blue-700 mt-1'key={index}>{topic}</p></Link>
          ))}
        </div>
      ))}
    </div>
    <br></br>
    <br/>
    <br/>
    <Footer />
    </>
  );
}

export default TopicSkills;