import React, { useEffect, useState } from "react";
import fetchUser from "../components/fetchUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import stars from "../imgs/stars.svg";
import running from "../imgs/running.svg";
import { Progress } from 'flowbite-react';
import { useSelector } from "react-redux";
import { updateUserStart , updateUserSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";


export default function Quiz() {
  const { topicName,topicId } = useParams();
  const [currentQuestionIndex, setIndex] = useState(0);
  const [message, setMessage] = useState(false);
  const [questionsCorrect, setQuestionsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quiz,setQuiz] = useState(null);
  const [header, setHeader] = useState(null);
  const [loading,setLoading] = useState(false);
  const { currentUser, error } = useSelector((state) => state.user);
  const { user } = fetchUser(currentUser);
const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://bpa-api1.onrender.com/api/topics/${topicId}/quiz`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setQuiz(data.quiz);
        setHeader(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const handleNext = (event) => {
    event.preventDefault();
    if (currentQuestionIndex >= quiz.quizQuestions.length - 1) {
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
  if (!quiz) {
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
    if (quiz && quiz.quizQuestions[currentQuestionIndex]) {
      const updatedQuestion = { ...quiz };
      updatedQuestion.quizQuestions[currentQuestionIndex].selectedOption =
        selectedOption;
      setQuiz(updatedQuestion); 
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    let correct = 0;
  

    const allQuestionsAnswered = quiz && quiz.quizQuestions && quiz.quizQuestions.every(
      (q) => q.selectedOption !== undefined
    );
  
    if (!allQuestionsAnswered) {
      setMessage(true);
      return;
    }

    const answers = quiz.quizQuestions.map((q) => {
      if (q.selectedOption === q.correctOption) {
        correct++;
      }
      return q.selectedOption;
    });
  
    console.log(`${correct} / ${quiz.quizQuestions.length}`);
    setCorrectAnswers(correct);
    setQuestionsCorrect(true);
  
    try {
    //  dispatch(updateUserStart());
      setLoading(true);
      // Send the answers to the server
      const response = await fetch('https://bpa-api1.onrender.com/api/user/updateQuizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quizId: `${topicId}`, 
          correctAnswers: correct,
          totalQuestions: quiz.quizQuestions.length,
          answers: answers,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      
    //  navigate(`/courses/${question.course.courseName}/${question.topicName}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    try {
      const urlParts = window.location.pathname.split('/');
      const part = urlParts[urlParts.length - 1];
      const completedLessons = user.completedLessons;
      
    
      let lesson;
      let method = 'POST'; // Default to 'POST'
    
      // Check if the completedLessons field exists
      if (completedLessons) {
        // Find the lesson object with the matching lessonId
        lesson = completedLessons.find((lesson) => lesson.lessonId === topicId);
        console.log('Lesson:', lesson);
    
        // If the lesson exists, use 'PUT' method
        if (lesson) {
          method = 'PUT';
        }
      }
    
      console.log('HTTP method:', method);
    
      fetch(`https://bpa-api1.onrender.com/api/user/${topicId}/${part}`, {
        method: method, // Use the method determined above
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data)
      })
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }

    const updatedQuestion = { ...quiz };
    updatedQuestion.quiz.forEach((q) => {
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
    navigate(`/courses/${header.course.courseName}/${header.topic}`);
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
        {questionsCorrect &&
    <div className='absolute opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>
    </div>
    }
      <div className="h-screen  flex flex-col justify-center items-center bg-slate-200">
      {message && 
      <div onClick={closePopup} role="alert" className="cursor-pointer animate__backInDown animate__animated fixed top-11 z-50 popup alert alert-error w-96 bg-yellow-100">
      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="cursor-pointer stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <div className='flex items-center justify-between'>
      <span>Warning! Some questions are unanswered.</span>
      
      </div>
    </div>
          }
          {questionsCorrect && 

<div className='popup p-3 z-50 bg-white fixed top-60 border-[2px] rounded border-gray-200 h-48 outline'>
  <div className="flex w-full justify-between items-center">
{(correctAnswers / quiz.quizQuestions.length) * 100 >= 70 ? 
    <img src={stars} className="w-8 h-8" alt="Stars" /> : 
    <img src={running} className="w-8 h-8"  alt="Almost There" />}
    <i class="fa-solid fa-xmark fa-xl cursor-pointer" onClick={closeQuestions}></i>
    </div>
  {(correctAnswers / quiz.quizQuestions.length) * 100 >= 70 ? 
    <h1> Good Job! {correctAnswers} / {quiz.quizQuestions.length} </h1> : 
    <h1>Almost There! {correctAnswers} / {quiz.quizQuestions.length} </h1>}
    <Progress progress={(correctAnswers / quiz.quizQuestions.length)} size="md"/>

</div>

          }
        <h1 className="text-semibold text-3xl top-32 absolute">
          Quiz
        </h1>
        <button className="absolute top-32 right-4 main-color p-1 poppins text-white rounded">
          Save & Exit
        </button>
        
        {quiz && quiz.quizQuestions && quiz.quizQuestions.length > 0 && (
  <div className="w-questions bg-white rounded p-4">
    <div className="flex justify-between mb-3">
      <button
        onClick={handleBack}
        className="main-color text-white rounded-md poppins w-16"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        className="main-color text-white rounded-md poppins w-16"
      >
        Next
      </button>
    </div>
    <h1 className="text-lg">Question {currentQuestionIndex + 1}</h1>
    <h1 className="text-xl">
      {quiz.quizQuestions[currentQuestionIndex].questionText}
    </h1>
    {quiz.quizQuestions[currentQuestionIndex].type === "input" ? (
      <div>
        <input
          className="outline rounded mt-2 p-1"
          type="text"
          id={`input-question-${currentQuestionIndex}`}
          name={`input-question-${currentQuestionIndex}`}
          value={
            quiz.quizQuestions[currentQuestionIndex].selectedOption || ""
          }
          onChange={(e) => handleOptionChange(e.target.value)}
        />
      </div>
    ) : (
      <>
        {quiz.quizQuestions[currentQuestionIndex].options.map(
          (option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={
                  option ===
                  quiz.quizQuestions[currentQuestionIndex].selectedOption
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
      <button className="main-color text-white rounded-md poppins p-1  w-16">
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
