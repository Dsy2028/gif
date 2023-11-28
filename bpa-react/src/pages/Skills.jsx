import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function Skills() {
    
    const [question, setQuestion] = useState(null);
    const { questionId } = useParams();

    useEffect(() => {
      // Fetch question data from your API
      // Update the URL with the correct endpoint to fetch a specific question by ID
      fetch(`http://localhost:3000/api/questions/${questionId}`) // Replace 'question-id' with the actual question ID
        .then((response) => response.json())
        .then((data) => setQuestion(data))
        .then(console.log(data))
        .catch((error) => console.error('Error fetching question:', error));
    }, []);

const QuestionDetail = ({ question }) => {
    return (
      <div>
        <h2>{question.question}</h2>
        <ul>
          {question.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <p>Correct Option: {question.correctOption}</p>
      </div>
    );
  };
  return (
    <div>
    {question ? (
      <QuestionDetail question={question} />
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}
