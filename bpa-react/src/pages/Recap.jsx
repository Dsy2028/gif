import React from 'react'
import fetchUser from "../components/fetchUser";
import { useState, useEffect} from 'react'
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import construction from '../imgs/construction.png';

export default function Recap() {
    const { currentUser,  error } = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const [loading,setLoading] = useState(false);
    const {recapId, topicId} = useParams();
    const [recap, setRecap] = useState(null);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = currentUser._id;

      const response = await fetch('/api/user/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to join class: ${errorMessage}`);
      }

      const got = await response.json();
      setUser(got);
      
    } catch (error) {
      console.error('Error joining class:', error);
      // setError(error.message); // Uncomment this if you have setError defined
      // setMessage(true); // Uncomment this if you have setMessage defined
    }
  };

  fetchUser();
},[]);
console.log(user);

useEffect(() => {
    try {
      const urlParts = window.location.pathname.split('/');
      const part = urlParts[urlParts.length - 1];
      console.log(part)
      const completedLessons = user.completedLessons;
      console.log(completedLessons)
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
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/recap/${recapId}/recap`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRecap(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  return (
    <div className="flex items-center justify-center">
      <img src={construction} className="w-[35rem]"></img>
    </div>
  )
}
