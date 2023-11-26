import React, { useState, useEffect } from 'react';

const Quiz = ({category}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    setCurrentQuestion(0);
    // Fetch questions
    fetch('/api/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, [category]); // Empty dependency array ensures the effect runs only once on component mount

 

  const goToNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const saveUserResult = async (userId, quizId, score) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, quizId, score }),
      });
      const newUserResult = await response.json();
      console.log(newUserResult);
    } catch (error) {
      console.error(error);
    }
  };

  const renderQuestionType = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case 'input':
        return <input type="text" placeholder="Your answer" />;
      case 'radio':
        return (
          <div>
            {question.options.map((option, index) => (
              <label key={index}>
                <input type="radio" name="answer" value={option} />
                {option}
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div>
            {question.options.map((option, index) => (
              <label key={index}>
                <input type="checkbox" name="answer" value={option} />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {questions.length > 0 && (
        <div>
          <div key={currentQuestion}>
            <h3>{questions[currentQuestion].category}</h3>
            <p>{questions[currentQuestion].question}</p>
            {renderQuestionType()}
          </div>
        </div>
      )}

      <div>
        <button
          className='w-8 h-6 main-color rounded'
          onClick={goToPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          onClick={goToNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;

