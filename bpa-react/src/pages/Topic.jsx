import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import science from "../imgs/genetic-data-svgrepo-com.svg";
import endless from "../imgs/endless-constellation.svg";
import flat from "../imgs/flat-mountains.svg";

export default function Topic() {
  const { topicName } = useParams();
  const { topicId, questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const location = useLocation();

  const pageNames = {
    "/courses/Algebra%201/Real%20Number": "Algebra 1",
    "/classes": "Classes",
    "/calender": "Calender",
  };

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

  const getPageName = () => pageNames[location.pathname] || "";

  const lessons = [
    {
      title: "Intro to Real Numbers",
      link: "/link-to-lesson-1",
      icon: "fa-play",
      position: "relative",
    },
    {
      title: "Intro to Real Numbers",
      link: "/link-to-lesson-2",
      icon: "fa-pause",
      position: "relative",
      marginLeft: "60px",
      marginTop: "40px"
    },
    {
        title: "Intro to Real Numbers",
        link: "/link-to-lesson-2",
        icon: "fa-pause",
        position: "relative",
        marginLeft: "140px",
        marginTop: "40px"
      },
      {
        title: "Intro to Real Numbers",
        link: "/link-to-lesson-2",
        icon: "fa-pause",
        position: "relative",
        marginLeft: "250px",
        marginTop: "40px"
      },
      {
        title: "Intro to Real Numbers",
        link: "/link-to-lesson-2",
        icon: "fa-pause",
        position: "relative",
        marginLeft: "140px",
        marginTop: "40px"
      },
      {
        title: "Intro to Real Numbers",
        link: "/link-to-lesson-2",
        icon: "fa-pause",
        position: "relative",
        marginLeft: "60px",
        marginTop: "40px"
      },
  ];

  return (
    <>
      <div className=" h-screen pl-56 pr-56 flex">
        <div className="h-full fixed">
          <div className="flex items-center mb-7">
            <h1 className="text-semibold text-lg nunito mr-3">Courses</h1>
            <i class="fa-solid fa-chevron-right fa-sm"></i>
            <h1 className="text-semibold text-lg nunito ml-3">
              {getPageName()}
            </h1>
          </div>
          <div className="w-96 outline p-5 h-80 ">
            <div className="flex h-14">
              <img src={science} />
            </div>
            <div className="flex">
              <h1>{getPageName()}</h1>
            </div>
            <div className="text-3xl">
              <h1>REal numbers</h1>
            </div>
            <p>Understand the use of REal Numbers</p>
            <p>10 lessons</p>
          </div>
        </div>
        <div
          className="min-h-[1000px] w-[800px] ml mb-2 p-8 flex justify-center"
          style={{
            backgroundImage: ` url(${flat})`,
            backgroundPosition: " bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className=" w-[480px] z-50 flex flex-col">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="  w-fit flex flex-col z-50 p-3"
                style={{ marginLeft: lesson.marginLeft, marginTop: lesson.marginTop}}
              >
                <div className="flex justify-center h-7">
                  <div className="w-10 flex justify-center items-center outline">
                    <i
                      className={`fa-solid ${lesson.icon} fa-xl text-center`}
                    ></i>
                  </div>
                </div>
                <h1 className="mt-2">{lesson.title}</h1>
                <div className="flex items-center justify-center mt-1">
                  <Link to={lesson.link}>
                    <button className="main-color rounded w-20 text-white">
                      Go
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}