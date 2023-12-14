import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function TestComponents() {
  const { topicName } = useParams();
  const { topicId, questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [message, setMessage] = useState(false);
  const [questionsCorrect, setQuestionsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/topics/${topicId}/question/${questionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setQuestion(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [topicName]);

  const handleNext = (event) => {
    event.preventDefault();
    if (currentQuestionIndex >= question.questions.length - 1) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleBack = (event) => {
    event.preventDefault();
    if (currentQuestionIndex <= 0) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
  
    try {
      setLoading(true);
      // Send the answers to the server
      const response = await fetch('http://localhost:3000/api/user/updateQuizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      
      navigate('/courses');
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
    setCurrentQuestionIndex(0);
  };
  
  const closePopup = () => {
    document.querySelector('.popup').classList.add('animate__fadeOutDown', 'animate__animated' );
    setTimeout(() => {
      setMessage(false);
    }, 500);
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="h-screen  flex flex-col justify-center items-center bg-slate-200">
      {message && 
            <div className='popup p-3 z-50 bg-white fixed  top-60 border-[2px] rounded border-gray-200  h-48  '>
                <div className='flex'>
                <div className='rounded-full bg-red-500 w-7 grid place-items-center'>
                <i class="fa-solid fa-xmark"></i>
                </div>
            <h1 className='text-xl font-bold ml-2'>Some questions are not answered</h1>
              </div>
              <div className='place-items-center grid  mt-24'>
              <button className='bg-red-500 w-96 p-1 rounded-sm poppins text-white' onClick={closePopup}>Close</button>
              </div>
            </div>
          }
          {questionsCorrect && 

          <div className='popup p-3 z-50 bg-white fixed  top-60 border-[2px] rounded border-gray-200  h-48 outline  '>
            <h1>{correctAnswers} / {question.questions.length} </h1>
          </div>

          }
        <h1 className="text-semibold text-3xl top-32 absolute">
          {question.topicName}
        </h1>
        <button className="absolute top-32 right-4 main-color p-1 poppins text-white rounded">
          Save & Exit
        </button>
        
        {question && question.questions[currentQuestionIndex] && (
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
              {question.questions[currentQuestionIndex].questionText}
            </h1>
            {question.questions[currentQuestionIndex].type === "input" ? (
              <div>
                <input
                className='outline rounded mt-2 p-1'
                  type="text"
                  id={`input-question-${currentQuestionIndex}`}
                  name={`input-question-${currentQuestionIndex}`}
                  value={
                    question.questions[currentQuestionIndex].selectedOption ||
                    ""
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
                          question.questions[currentQuestionIndex]
                            .selectedOption
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
