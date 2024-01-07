import React from 'react'
import { useState, useEffect} from 'react'
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from '../components/Footer'
export default function Intro() {
    const { currentUser,  error } = useSelector((state) => state.user);
    const { user } = fetchUser(currentUser);
    const [loading,setLoading] = useState(false);
    const {introId, topicId} = useParams();
    const [intro, setIntro] = useState(null);


useEffect(() => {
    try {
      const urlParts = window.location.pathname.split('/');
      const part = urlParts[urlParts.length - 3];
      const completedLessons = user.completedLessons;
      let lesson;
      let method = 'POST'; 
      if (completedLessons) {
        lesson = completedLessons.find((lesson) => lesson.lessonId === topicId);
        console.log('Lesson:', lesson);
        if (lesson) {
          method = 'PUT';
        }
      }
      
      fetch(`http://localhost:3000/api/user/${topicId}/${part}`, {
        method: method, 
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data)
        // dispatch(updateUserSuccess(data)) 
      })
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/intros/intro/${topicId}/${introId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setIntro(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);


    return (
        <>
        <div className="dark:bg-slate-800 dark:text-white">
            <div className="pl-11 pr-11 mb-11">
            { intro && <h1 className="text-center text-3xl">{intro.title}</h1>}
        { intro && intro.sections.map((section, index) => (
    <div key={index} className="flex flex-cols mt-4">
        <div className="grid ">
            <h1 className="font-semibold nunito text-2xl text-center mb-2">{section.title}</h1>
            <div className="flex gap-4">
            {section.content.map((paragraph, i) => (
                <div className="flex  flex-row border-[2px] rounded p-1">
                    <p className="dark:text-slate-300" key={i}>{paragraph}</p>
                </div>
         ))}
            </div>
        </div>
    </div>
))}
            </div>
<Footer/>
        </div>
        </>
    )
}
