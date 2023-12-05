import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function TestComponents() {
  const { topicName } = useParams();
  const {_id} = useParams();
  const [question, setQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/topics/${topicName}/question/${_id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setQuestion(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [topicName]);

  const handleNext = () => {
    if (currentQuestionIndex >= question.questions.length - 1) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleBack = () => {
    if(currentQuestionIndex <= 0) {
     setCurrentQuestionIndex(0);
    }else{
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }
  if (!question) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ border: '16px solid #f3f3f3', borderRadius: '50%', borderTop: '16px solid #0b488d', width: '120px', height: '120px', animation: 'spin 2s linear infinite' }} />
      </div>
    );
  }


  return (
    <>
    <div className='h-screen  flex flex-col justify-center items-center bg-slate-200'>
    <h1 className='text-semibold text-3xl top-32 absolute'>{question.topicName}</h1>
    <button className='absolute top-32 right-4 main-color p-1 poppins text-white rounded'>Save & Exit</button>
      {question && question.questions[currentQuestionIndex] && (
        <div className='w-questions bg-white rounded p-4'>
          <div className='flex justify-between mb-3'>
          <button onClick={handleBack} className='main-color text-white rounded-md poppins w-16'>Back</button>
          <button onClick={handleNext} className='main-color text-white rounded-md poppins w-16'>Next</button>
          </div>
          <h1 className='text-lg'>Question {currentQuestionIndex + 1}</h1>
          <h1 className='text-xl'>{question.questions[currentQuestionIndex].questionText}</h1>
          {question.questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index} >
              <input type="radio" id={`option-${index}`} name={`question-${currentQuestionIndex}`} value={option} />
              <label className='ml-2' htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <div className='w-full flex justify-end'>
          <button  className='main-color text-white rounded-md poppins p-1  w-16'>Submit</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}