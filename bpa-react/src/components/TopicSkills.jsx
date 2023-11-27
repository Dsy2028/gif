import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TopicSkills() {
  const { topicName } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    fetch(`/api/courses/${topicName}`)
      .then(response => response.json())
      .then(data => setCourseDetails(data));
  }, [topicName]);

  if (!courseDetails) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h1>{courseDetails.courseName}</h1>
      {/*  */}
      {courseDetails.units.map((unit, index) => (
        <div key={index}>
          <h2>{unit.unitName}</h2>
          {/*  */}
          {unit.topics.map((topic, index) => (
            <p key={index}>{topic}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TopicSkills;