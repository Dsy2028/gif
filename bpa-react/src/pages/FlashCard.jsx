import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FlashCard() {
  const { topicName, _id } = useParams();
  const [flashCardData, setFlashCardData] = useState(null);
  const[flashCardIndex, setflashCardIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/flashcards/656fbc90dfff0a737a888e7b`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);

        if (data && data.topic && data.topic.flashCards && data.topic.flashCards.length > 0) {
          setFlashCardData(data.topic);
        } else {
          console.error("Fetched data is empty or missing flashCards array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [topicName,_id]);
  const handleNext = () => {
    if (flashCardIndex >= flashCardData.flashCards.length - 1) {
      setflashCardIndex(0);
    } else {
      setflashCardIndex(flashCardIndex + 1);
    }
  };
  const handleBack = () => {
    if (flashCardIndex <= 0) {
      setflashCardIndex(0);
    } else {
      setflashCardIndex(flashCardIndex - 1);
    }
  }
  if (!flashCardData) {
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

  return (
    <div className='h-screen items-center flex flex-col justify-center'>
      {flashCardData && flashCardData.flashCards && flashCardData.flashCards[flashCardIndex] && (
        <div className="card outline">
          <div className="card-inner">
            <div className="card-front flex items-center justify-center">
              <h1 className='text-2xl'>{flashCardData.flashCards[flashCardIndex].cardFront}</h1>
            </div>
            <div className="card-back flex items-center justify-center text-2xl">
              {flashCardData.flashCards[flashCardIndex].cardBack}
            </div>
          </div>
        </div>
      )}
      <div className='flex justify-evenly mt-4 w-60 '>
      <button onClick={handleBack} className="main-color text-white rounded-md poppins w-16" >Back</button>
      <h1> {flashCardIndex + 1}/{flashCardData.flashCards.length}</h1>
        <button onClick={handleNext} className="main-color text-white rounded-md poppins w-16" >Next</button>
      </div>
    </div>
  );
}