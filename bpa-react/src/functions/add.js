import { useEffect } from "react";
export const useFetch = (url, setter) => {
    useEffect(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setter(data);
        })
        .catch((error) => {
          console.error('error' ,error);
        });
    }, [url, setter]);
  };
  

 export  const createEditFunction = (setter1, setter2) => (item) => {
    setter1(true);
    setter2(item);
  };
  
  export const createCloseFunction = (setter1, setter2, setter3) => () => {
    setter1(false);
    setter2(null);
    setter3("");
  };


  export const fetchData = async (url, method, setFormData, close, body) => {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setFormData("");
      close();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };


<<<<<<< Updated upstream
  export const useAward = (progress, user, name, award, currentUser, gname) => {
=======
  export const useAward = (progress, user, name, award, currentUser, path, gname) => {
>>>>>>> Stashed changes
    useEffect(() => {
      if(progress === 100){
        const lessonI = name.topic_id; // replace with the ID of the current lesson
        const isLessonCompleted = user.completedLessons.find((lesson) => lesson.lessonId === lessonI)
        
        const completePart = isLessonCompleted.completed
        const hasReceivedAward = user.awards.some(award => award.lessonId === lessonI && award.award === gname);
      
        if (completePart === true && !hasReceivedAward) {
          const posAward = async ()  => {
            try {
              const token = currentUser._id;
  
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
  }