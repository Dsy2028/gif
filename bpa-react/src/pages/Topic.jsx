import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import science from "../imgs/genetic-data-svgrepo-com.svg";
import endless from "../imgs/endless-constellation.svg";
import flat from "../imgs/flat-mountains.svg";
import snow from "../imgs/confetti-doodles.svg"
import math from "../imgs/math-svgrepo-com.svg"
import straw from "../imgs/straw.png"
import doffy from "../imgs/doffy.png"
import ousen from "../imgs/ousen.webp"
import jojo from "../imgs/jojo.png"
import fishing from "../imgs/fishing.png"
import dragon from "../imgs/dragon.png"
import dark_flat from "../imgs/flat-mountains-dark.svg"
import dark_snow from "../imgs/confetti-doodles-dark.svg"
import { useSelector } from "react-redux";
import fetchUser from "../components/fetchUser";

export default function Topic() {
  const { courseName, lessonName } = useParams();
  const [lessons, setLessons] = useState({});
  const [name, setName] = useState({});
  const location = useLocation();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [progress, setProgress] = useState(0);
  const [act, setActionPerformed] = useState(false);
  const { user } = fetchUser(currentUser);
  const [imageSrc, setImageSrc] = useState(null);
  const [award, setAward] = useState(null);
  const [complete, setComplete] = useState(false);
  const [completionActionDone, setCompletionActionDone] = useState(false);
  const [firstCompletion, setFirstCompletion] = useState(false);
  const [completionActionPerformed, setCompletionActionPerformed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(window.localStorage.getItem('darkMode') === 'true');



  
  /*useEffect(() => {
    if (progress === 100 && !firstCompletion) {
      setActionPerformed(true);
      setCompletionActionPerformed(true);
      setFirstCompletion(true);
    }
  }, [progress, firstCompletion]);*/



useEffect(() => {
  //if (!user) return;
   fetch(`https://bpa-api1.onrender.com/api/lessons/courses/${courseName}/${lessonName}`)
     .then((response) => {
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       return response.json();
     })
     .then((data) => {
       setLessons(data.lessons);    
       setName(data);    
       const lessonIds = user.completedLessons.map(lesson => lesson.lessonId._id);

// Find the lesson ID that matches the current page's topic_id
const lessonId = lessonIds.find(id => id === name.topic_id);
const lesson1 = user.completedLessons.find(lesson => lesson.lessonId._id === name.topic_id);
let i;
       const completionPercentages = user.completedLessons.map(lesson => {
   
        // Check if the lessonId of the current lesson is equal to topic_id
       if (lessonId === name.topic_id) {
          const totalItems = Object.keys(lesson).length - 2;

        const completedItems = Object.values(lesson1).filter(value => value === true).length;
     
       i = (completedItems / totalItems) * 100;
       } 
      });
  
      // Filter out the 0s (the lessons that didn't match topic_id)
     // const filteredCompletionPercentages = completionPercentages.filter(percentage => percentage !== 0);
      
      // Calculate the total completion percentage
      //const totalCompletionPercentage = filteredCompletionPercentages.reduce((a, b) => a + b, 0) / filteredCompletionPercentages.length;
      
     // setProgress(i);
       if(progress === 100){
         setComplete(true);
       } 
       setImageSrc(imageMapping[data.image]);
       setAward(awardmap[data.completion]);
       
     })
     .catch((error) => {
       console.error("Error fetching data: ", error);
     });
 }, [lessonName, user]);

 useEffect(() => {
  if(progress === 100){
    const lessonI = name.topic_id; // replace with the ID of the current lesson
    const isLessonCompleted = user.completedLessons.find((lesson) => lesson.lessonId === lessonI)
    
    const completePart = isLessonCompleted.completed
    const splitter = award.split('/');
    const path = splitter[splitter.length - 1];
    const name1 = path.split('.')
    const gname =  name1[name1.length - 2]
    const hasReceivedAward = user.awards.some(award => award.lessonId === lessonI && award.award === gname);
   
    if (completePart === true && !hasReceivedAward) {
      const posAward = async ()  => {
        try {
          const token = currentUser._id;
          const splitter = award.split('/');
          const path = splitter[splitter.length - 1];
          const name = path.split('.')
          const gname =  name[name.length - 2]

          const response = await fetch('https://bpa-api1.onrender.com/api/user/award ', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              lessonId: lessonI,
              award: gname
            })
          });

          if(response.ok){
      
          }

          const r = await response.json();
        } catch (error) {
          console.error('error posting award',error);
        }
      }
      posAward();
    }
  }
},[progress, user, name])

const imageMapping = {
  math: math

};
const awardmap = {
  straw: straw,
  doffy: doffy,
  dragon: dragon,
  jojo: jojo,
  fishing: fishing

};

const close = ( ) => {
  setActionPerformed(false);
  document.body.style.overflow = "auto";
}
 

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
  



  const lessonOrder = ['intro', 'recap', 'practice', 'practice_2', 'review', 'quiz'];
  //const lessonOrder = lesson.lessonOrder || Object.keys(lesson.lessons);
//{Math.round(progress)}%
  return (
    <>
     { completionActionPerformed && (
        <div className="fixed opacity-100  w-screen z-10 h-screen bg-black bg-opacity-50  "></div>
      )}
   <div className="dark:bg-slate-800">
      <div className="  pl-56 pr-56 flex">
    
        {  completionActionPerformed &&
          <div className='fixed z-50 inset-0 flex items-center justify-center'>
          <div  className='p-3 w-96 h-[12rem] bg-white  rounded'>
            <h1 className="text-2xl font-semibold nunito mb-1">Congrats!</h1>
            <h1>You have completed {name.lessonName}</h1>
            <div className="flex items-center">
              <h1>+1</h1>
              <img src={award} className="h-12 w-12 animate__rubberBand animate__animated animate__delay-3s animate__repeat-3" />
              <h1>Earned</h1>
            </div>
            
            <h1 className="mb-2">Go back to the course page to continue</h1>
            <div className="justify-end flex">
            <button className="text-white main-color w-20 rounded nunito" onClick={close}><Link to={`/courses/${courseName}`}>Go back</Link></button>
            </div>
          </div>
        </div>

        }
        <div className="h-full fixed">
          <div className="flex items-center mb-7  animate__animated  animate__fadeInLeft">
            <Link className="text-semibold text-lg nunito mr-3 hover:text-blue-600  dark:text-white" to={'/courses'}>Courses</Link>
            <i class="fa-solid fa-chevron-right fa-sm dark:text-white"></i>
              <Link className="text-semibold text-lg nunito ml-3 hover:text-blue-700 dark:text-white" to={`/courses/${courseName}`}>{getPageName()}</Link>
            <i class="fa-solid fa-chevron-right fa-sm ml-3 dark:text-white"></i>
            { name &&
                <h1 className="text-semibold text-lg nunito ml-3 dark:text-white">{name.lessonName}</h1>
                }
                
          </div>
          <div className="w-96 p-5 h-80  animate__animated animate__zoomIn  "  style={{ backgroundImage: isDarkMode ? ` url(${dark_snow})` :` url(${snow})` , backgroundRepeat: "no-repeat", backgroundSize: "100%"}}>
            <div className="flex h-14">
            {imageSrc && <img src={imageSrc} />}
            </div>
            <div className="flex">
              <h1 className="dark:text-white">{getPageName()}</h1>
            </div>
            <div className="text-3xl">
                { name &&
                <h1 className="dark:text-white">{name.lessonName}</h1>
                }
            </div>
            { name && 
              <p className="dark:text-white">{name.lessonDescription}</p>
            }
            <div className="dark:text-white">
              <h1>{ progress ? Math.round(progress) : "0"}%</h1>
                 
              <div className="flex items-center ">
              <div className="w-full border-[1px]  h-4 flex items-center rounded-xl">
                <div className="rounded-lg bg-green-500 h-3 " style={{ width: `${progress}%` , transition: 'width 2s' }}></div>

              </div>
               {award &&  <img src={award} className="h-12 w-12 animate__rubberBand animate__animated animate__delay-3s animate__repeat-3" />}
              </div>
            </div>
          </div>
          
        </div>
        <div
          className="min-h-full w-[800px] ml mb-2 p-8 flex justify-center"
          style={{
            backgroundImage: isDarkMode ? ` url(${dark_snow}),url(${dark_flat})`: ` url(${snow}),url(${flat})`,
            backgroundPosition: "top, bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
  <div className="w-[480px] z-10 flex flex-col mb-20">
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
          className="w-10 flex justify-center items-center  "
          style={{ backgroundColor: lessons[key].backgroundColor, borderRadius: lessons[key].borderRadius }}
        >
          <i className={`fa-solid ${lessons[key].icon} fa-xl text-center`} />
        </div>
      </div>
      <h1 className="mt-2 text-center dark:text-white">{lessons[key].title}</h1>
      <div className="flex items-center justify-center mt-1">
        <Link to={lessons[key].link}>
          <button className="main-color rounded w-20 text-white hover:bg-blue-700 dark:bg-violet-700 dark:hover:bg-violet-500">
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
      </div>
    </>
  );
}
