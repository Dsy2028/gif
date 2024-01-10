import React, { useEffect, useState } from "react";
import fetchUser from "../components/fetchUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import stars from "../imgs/stars.svg";
import running from "../imgs/running.svg";
import { useSelector } from "react-redux";
import { updateUserStart , updateUserSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function HarderQuestions() {
  const { topicName } = useParams();
  const { topicId, questionId,harderQuestionsId} = useParams();
  const [question, setQuestion] = useState(null);
  const [currentQuestionIndex, setIndex] = useState(0);
  const [message, setMessage] = useState(false);
  const [questionsCorrect, setQuestionsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [harder,setharderQuestions] = useState(null);
  const [loading,setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { currentUser, error } = useSelector((state) => state.user);
  const { user } = fetchUser(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`http://localhost:3000/api/topics/${topicId}/harderQuestions/${harderQuestionsId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setharderQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [topicName]);

  const handleNext = (event) => {
    event.preventDefault();
    if (currentQuestionIndex >= harder.harderQuestions.length - 1) {
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
  if (!harder) {
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
    if (harder && harder.harderQuestions[currentQuestionIndex]) {
      const updatedQuestion = { ...harder };
      updatedQuestion.harderQuestions[currentQuestionIndex].selectedOption =
        selectedOption;
      setharderQuestions(updatedQuestion); 
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let correct = 0;
  

    const allQuestionsAnswered = harder.harderQuestions.every(
      (q) => q.selectedOption !== undefined
    );
  
    if (!allQuestionsAnswered) {
      setMessage(true);
      return;
    }

    const answers = harder.harderQuestions.map((q) => {
      if (q.selectedOption === q.correctOption) {
        correct++;
      }
      return q.selectedOption;
    });

    setCorrectAnswers(correct);
    setQuestionsCorrect(true);
  
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
          totalQuestions: harder.harderQuestions.length,
          answers: answers,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    const percentageScore = (correct / harder.harderQuestions.length) * 100;
    setProgress(percentageScore);
    

if (percentageScore >= 70) {
  try {
    setLoading(true);
    // Second POST request
    const res = await fetch(`http://localhost:3000/api/user/harderQuestions/${harderQuestionsId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        assignment: `${harderQuestionsId}`
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Success:', data);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
}
try {
  const urlParts = window.location.pathname.split('/');
  const part = urlParts[urlParts.length - 4];
  const completedLessons = user.completedLessons;
  console.log('CompletedLessons:', completedLessons);

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
//http://localhost:5173/courses/Algebra%201/Order%20of%20Operations
  console.log('HTTP method:', method);

  fetch(`http://localhost:3000/api/user/${topicId}/${part}`, {
    method: method, // Use the method determined above
    credentials: 'include',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response:', data)
    // dispatch(updateUserSuccess(data)) // Dispatch the action with the response data
  })
  .catch(error => console.error('Error:', error));
} catch (error) {
  console.error('Error:', error);
} finally {
  setLoading(false);
}
    const updatedQuestion = { ...harder };
    updatedQuestion.harderQuestions.forEach((q) => {
      q.selectedOption = undefined;
    });
    setQuestion(updatedQuestion);
    setIndex(0);
  };

  const save = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/saveQuizState', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quizId: `${topicId}`, 
          quizState: harder,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      
      navigate(`/courses/${harder.course.courseName}/${harder.topicName}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  

  
  const closePopup = () => {
    document.querySelector('.popup').classList.add('animate__fadeOutDown', 'animate__animated' );
    setTimeout(() => {
      setMessage(false);
    }, 500);
  }
  const closeQuestions = () => {
    setQuestionsCorrect(false);
    navigate(`/courses/${harder.course.courseName}/${harder.topicName}`);
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    {message &&
    <div className='absolute opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>
    </div>
    }
    {questionsCorrect &&
    <div className='absolute opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50'>
    </div>
    }
      <div className="h-screen  flex flex-col justify-center items-center bg-slate-200">
      {message && 
      <div role="alert" className="animate__backInDown animate__animated fixed top-11 z-50 popup alert alert-error w-96 bg-red-500">
      <svg onClick={closePopup} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <div className='flex items-center justify-between'>
      <span>Warning! Some questions are unanswered.</span>
      
      </div>
    </div>
          }
          {questionsCorrect && 

<div className='popup p-3 z-50 bg-white fixed top-60 border-[2px] w-[20rem] rounded border-gray-200 h-48 '>
  <div className="flex w-full justify-between items-center">
{(correctAnswers / harder.harderQuestions.length) * 100 >= 70 ? 
    <img src={stars} className="w-8 h-8" alt="Stars" /> : 
    <img src={running} className="w-8 h-8"  alt="Almost There" />}
    <i class="fa-solid fa-xmark fa-xl cursor-pointer" onClick={closeQuestions}></i>
    </div>
  {(correctAnswers / harder.harderQuestions.length) * 100 >= 70 ? 
    <h1> Good Job! {correctAnswers} / {harder.harderQuestions.length} </h1> : 
    <h1>Almost There! {correctAnswers} / {harder.harderQuestions.length} </h1>}
    <div className="w-full border-[1px] mt-3 h-4 flex items-center rounded-xl">
      <div className="rounded-lg bg-green-500 h-3 " style={{ width: `${progress}%` , transition: 'width 2s' }}>

      </div>
    </div>

</div>

          }
        <h1 className="text-semibold text-3xl top-32 absolute">
          {harder.topicName}
        </h1>
        <button className="absolute top-32 right-4 main-color p-1 poppins text-white rounded">
          Save & Exit
        </button>
        
        {harder && harder.harderQuestions[currentQuestionIndex] && (
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
      {harder.harderQuestions[currentQuestionIndex].questionText}
    </h1>
    {harder.harderQuestions[currentQuestionIndex].type === "input" ? (
      <div>
        <input
          className="outline rounded mt-2 p-1"
          type="text"
          id={`input-question-${currentQuestionIndex}`}
          name={`input-question-${currentQuestionIndex}`}
          value={
            harder.harderQuestions[currentQuestionIndex].selectedOption || ""
          }
          onChange={(e) => handleOptionChange(e.target.value)}
        />
      </div>
    ) : (
      <>
        {harder.harderQuestions[currentQuestionIndex].options.map(
          (option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={
                  option ===
                  harder.harderQuestions[currentQuestionIndex].selectedOption
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
