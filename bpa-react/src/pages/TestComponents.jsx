import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import stars from "../imgs/stars.svg";
import running from "../imgs/running.svg";
import { Progress } from 'flowbite-react';



export default function TestComponents() {
  const { topicName } = useParams();
  const { topicId, questionId,harderQuestionsId} = useParams();
  const [question, setQuestion] = useState(null);
  const [currentQuestionIndex, setIndex] = useState(0);
  const [message, setMessage] = useState(false);
  const [questionsCorrect, setQuestionsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [harder,setharderQuestion] = useState(null);
  const [loading,setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);

      const url = harderQuestionsId
        ? `https://bpa-api1.onrender.com/api/topics/${topicId}/harderQuestions/${harderQuestionsId}`
        : `https://bpa-api1.onrender.com/api/topics/${topicId}/questions/${questionId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuestion(data);
        setharderQuestion(data.harderQuestions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

  
    fetchQuestion();
  
  }, [topicName]);

  const handleNext = (event) => {
    event.preventDefault();
    if (currentQuestionIndex >= question.questions.length - 1) {
      setIndex(0);
    } else {
      setIndex(currentQuestionIndex + 1);
    }
  };
  const handleBack = (event) => {
    event.preventDefault();
    if (currentQuestionIndex <= 0) {
      setIndex(0);
    } else {
      setIndex(currentQuestionIndex - 1);
    }
  };
  if (!question) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            border: "16px solid #f3f3f3",
            borderRadius: "50%",
            borderTop: "16px solid #0b488d",
            width: "120px",
            height: "120px",
            animation: "spin 2s linear infinite",
          }}
        />
      </div>
    );
  }
  const handleOptionChange = (selectedOption) => {
    const updatedQuestion = { ...question };
    updatedQuestion.questions[currentQuestionIndex].selectedOption =
      selectedOption;
    setQuestion(updatedQuestion);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let correct = 0;
  

    const allQuestionsAnswered = question.questions.every(
      (q) => q.selectedOption !== undefined
    );
  
    if (!allQuestionsAnswered) {
      setMessage(true);
      return;
    }

    const answers = question.questions.map((q) => {
      if (q.selectedOption === q.correctOption) {
        correct++;
      }
      return q.selectedOption;
    });
  
    console.log(`${correct} / ${question.questions.length}`);
    setCorrectAnswers(correct);
    setQuestionsCorrect(true);
    const percentageScore = (correct / question.questions.length) * 100;
    setProgress(percentageScore);
  
    try {
      setLoading(true);
      // Send the answers to the server
      const response = await fetch('http://localhost:3000/api/user/updateQuizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quizId: `${topicId}`, 
          correctAnswers: correct,
          totalQuestions: question.questions.length,
          answers: answers,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
      
    //  navigate(`/courses/${question.course.courseName}/${question.topicName}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    try {
     
      const urlParts = window.location.pathname.split('/');
      console.log(urlParts)
      const part = urlParts[urlParts.length - 4];
      const topicId = [urlParts.length - 3]
      fetch(`http://localhost:3000/api/user/${topicId}/${part}`, {
        method: 'POST',
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => console.log('awromse', data))
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }

    const updatedQuestion = { ...question };
    updatedQuestion.questions.forEach((q) => {
      q.selectedOption = undefined;
    });
    setQuestion(updatedQuestion);
    setIndex(0);
  };
  
  const closePopup = () => {
    document.querySelector('.popup').classList.add('animate__backOutDown', 'animate__animated' );
    setTimeout(() => {
      setMessage(false);
    }, 500);
  }
  const closeQuestions = () => {
    setQuestionsCorrect(false);
    navigate(`/courses/${question.course.courseName}/${question.topicName}`);
  }


  return (
    <>
    <form onSubmit={handleSubmit} >
        {questionsCorrect &&
    <div className='absolute opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>
    </div>
    }
      <div className="h-screen  flex flex-col justify-center items-center bg-slate-200 dark:bg-slate-800">
      {message && 
      <div onClick={closePopup} role="alert" className="cursor-pointer animate__backInDown animate__animated fixed top-11 z-50 popup alert alert-error w-96 bg-yellow-100">
      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="cursor-pointer stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <div className='flex items-center justify-between'>
      <span>Warning! Some questions are unanswered.</span>
      
      </div>
    </div>
          }
          {questionsCorrect && 

<div className='popup p-3 z-50 bg-white w-[20rem] fixed top-60 border-[2px] rounded border-gray-200 h-48 '>
  <div className="flex w-full justify-between items-center">
{(correctAnswers / question.questions.length) * 100 >= 70 ? 
    <img src={stars} className="w-8 h-8" alt="Stars" /> : 
    <img src={running} className="w-8 h-8"  alt="Almost There" />}
    <i class="fa-solid fa-xmark fa-xl cursor-pointer" onClick={closeQuestions}></i>
    </div>
  {(correctAnswers / question.questions.length) * 100 >= 70 ? 
    <h1> Good Job! {correctAnswers} / {question.questions.length} </h1> : 
    <h1>Almost There! {correctAnswers} / {question.questions.length} </h1>}
    <div className="w-full border-[1px] mt-3 h-4 flex items-center rounded-xl">
      <div className="rounded-lg bg-green-500 h-3 " style={{ width: `${progress}%` , transition: 'width 4s' }}>

      </div>
    </div>

</div>

          }
        <h1 className="text-semibold text-3xl top-32 absolute dark:text-white ">
          {question.topicName}
        </h1>
        <button className="absolute top-32 right-4 main-color p-1 poppins text-white rounded dark:bg-violet-700">
          Save & Exit
        </button>
        
        {question && question.questions[currentQuestionIndex] && (
  <div className="w-questions bg-white rounded p-4 ">
    <div className="flex justify-between mb-3">
      <button
        onClick={handleBack}
        className="main-color text-white rounded-md poppins w-16 dark:bg-violet-700"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        className="main-color text-white rounded-md poppins w-16 dark:bg-violet-700"
      >
        Next
      </button>
    </div>
    <h1 className="text-lg">Question {currentQuestionIndex + 1}</h1>
    <h1 className="text-xl">
      {question.questions[currentQuestionIndex].questionText}
    </h1>
    {question.questions[currentQuestionIndex].type === "input" ? (
      <div>
        <input
          className="outline rounded mt-2 p-1"
          type="text"
          id={`input-question-${currentQuestionIndex}`}
          name={`input-question-${currentQuestionIndex}`}
          value={
            question.questions[currentQuestionIndex].selectedOption || ""
          }
          onChange={(e) => handleOptionChange(e.target.value)}
        />
      </div>
    ) : (
      <>
        {question.questions[currentQuestionIndex].options.map(
          (option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={
                  option ===
                  question.questions[currentQuestionIndex].selectedOption
                }
                onChange={() => handleOptionChange(option)}
              />
              <label className="ml-2" htmlFor={`option-${index}`}>
                {option}
              </label>
            </div>
          )
        )}
      </>
    )}
    <div className="w-full flex justify-end">
      <button className="main-color text-white rounded-md poppins p-1  w-16 dark:bg-violet-700">
        Submit
      </button>
    </div>
  </div>
)}
      </div>
      </form>
    </>
  );
}
