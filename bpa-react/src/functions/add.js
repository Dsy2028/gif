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


  export const fetchData = async (url, method, setFormData, closeCourse, body) => {
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
      closeCourse();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };