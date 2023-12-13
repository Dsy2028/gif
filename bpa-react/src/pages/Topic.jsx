import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import science from "../imgs/genetic-data-svgrepo-com.svg";
import endless from "../imgs/endless-constellation.svg";
import flat from "../imgs/flat-mountains.svg";
import snow from "../imgs/confetti-doodles.svg"

export default function Topic() {
  const { courseName, lessonName } = useParams();
  const [lessons, setLessons] = useState({});
  const [name, setName] = useState({});
  const location = useLocation();

  const pageNames = {
    "/courses/Algebra%201": "Algebra 1",
    "/courses/Geometry": "Geometry",
    "/courses/Statistics": "Statistics",
    "/courses/Calculus": "Calculus",
    "/courses/Trigonometry": "Trigonometry",
  };
  const getPageName = () => {
    const pathSegments = location.pathname.split('/');
    const currentPath = `/${pathSegments[1]}/${pathSegments[2]}`;
    return pageNames[currentPath] || '';
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/lessons/courses/${courseName}/${lessonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
       // console.log("Fetched data:", data);
        setLessons(data.lessons);    
        setName(data);    
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [lessonName]);

  
  const lessonOrder = ['intro', 'recap', 'practice', 'practice_2', 'review', 'quiz'];
  //const lessonOrder = lesson.lessonOrder || Object.keys(lesson.lessons);

  return (
    <>
      <div className="  pl-56 pr-56 flex">
        <div className="h-full fixed">
          <div className="flex items-center mb-7  animate__animated  animate__fadeInLeft">
            <h1 className="text-semibold text-lg nunito mr-3">Courses</h1>
            <i class="fa-solid fa-chevron-right fa-sm"></i>
            <h1 className="text-semibold text-lg nunito ml-3">
              {getPageName()}
            </h1>
            <i class="fa-solid fa-chevron-right fa-sm ml-3"></i>
            { name &&
                <h1 className="text-semibold text-lg nunito ml-3">{name.lessonName}</h1>
                }
          </div>
          <div className="w-96 p-5 h-80  animate__animated animate__zoomIn "  style={{ backgroundImage: ` url(${snow})`, backgroundRepeat: "no-repeat", backgroundSize: "100%"}}>
            <div className="flex h-14">
              <img src={science} />
            </div>
            <div className="flex">
              <h1>{getPageName()}</h1>
            </div>
            <div className="text-3xl">
                { name &&
                <h1>{name.lessonName}</h1>
                }
            </div>
            <p>Understand the use of REal Numbers</p>
            <p>10 lessons</p>
          </div>
        </div>
        <div
          className="min-h-full w-[800px] ml mb-2 p-8 flex justify-center"
          style={{
            backgroundImage: ` url(${snow}),url(${flat})`,
            backgroundPosition: "top, bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
  <div className="w-[480px] z-50 flex flex-col mb-20">
  {lessons && lessonOrder.map((key, index) => (
    lessons[key] && (
    <div
      key={index}
      className="w-fit flex flex-col z-50 p-3 animate__animated animate__jackInTheBox"
      style={{
        marginLeft: lessons[key].marginLeft,
        marginTop: lessons[key].marginTop,
      }}
    >
      <div className="flex justify-center h-7 ">
        <div
          className="w-10 flex justify-center items-center "
          style={{ backgroundColor: lessons[key].backgroundColor, borderRadius: lessons[key].borderRadius }}
        >
          <i className={`fa-solid ${lessons[key].icon} fa-xl text-center`} />
        </div>
      </div>
      <h1 className="mt-2 text-center">{lessons[key].title}</h1>
      <div className="flex items-center justify-center mt-1">
        <Link to={lessons[key].link}>
          <button className="main-color rounded w-20 text-white hover:bg-blue-700">
            Go
          </button>
        </Link>
      </div>
    </div>
  )
  ))}
</div>
        </div>
      </div>
    </>
  );
}
