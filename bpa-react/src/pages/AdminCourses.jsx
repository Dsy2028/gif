import React from 'react'
import { useState, useEffect } from "react";
import fetchUser from "../components/fetchUser";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TeacherDropdown from "../components/TeacherDropdown";
import AdminDashboardNav from "../components/AdminDashboardNav";
import { useFetch ,createEditFunction,fetchData,  createCloseFunction } from "../functions/add.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { registerables } from "chart.js";


export default function AdminCourses() {
    const [course, setCourse] = useState(null);
    const [type, setType] = useState('');
    const [units, setUnits] = useState(null);
    const [lessons, setLessons] = useState(null);
  const [topics, setTopics] = useState(null);
  const [intros, setIntros] = useState(null);
  const [questions, setQuestions] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState()
    const itemsPerPage = 25;
    const numbersPerPage = 10;
    useFetch(`http://localhost:3000/api/courseheader/courses`, setCourse);
    useFetch(`http://localhost:3000/api/units/unit/getUnits`, setUnits);
    useFetch(`http://localhost:3000/api/lessons/getAllLessons`, setLessons);
  useFetch(`http://localhost:3000/api/topics/getAllTopics`, setTopics);
  useFetch(`/api/questions/getAllQuestions`, setQuestions);
  useFetch('/api/intros/getAllIntros', setIntros);
  
  useEffect(() => {
    if (course && units && lessons && topics && questions) {
      const combinedData = [
        ...course.map(item => ({ ...item, type: 'Course' })),
        ...units.map(item => ({ ...item, type: 'Units' })),
        ...lessons.map(item => ({ ...item, type: 'Lesson' })),
        ...topics.map(item => ({ ...item, type: 'Topic' })),
        ...questions.map(item => ({ ...item, type: 'Question' })),
        ...intros.map(item => ({ ...item, type: 'Intro' })),
      ];
      setData(combinedData);
    }
  }, [course, units, lessons, topics, questions]);
  useEffect(() => {
    setCurrentPage(1);
    setCurrentGroup(1);
  }, [searchTerm]);
  
    const getType = (data) => {
        if (data.courseHeader) {
          return 'Course';
        } else if (data.name) {
          return 'Units';
        } else if (data.lessonName) {
          return 'Lesson';
        }
          else if (data.topicName) {
        return 'Topic';
      }
      else if (data.questionText) {
        return 'Question';
      } 
      else if (data.title) {
        return 'Intro';
      }   
      else {
          return '';
        }
      };
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data && (searchTerm
        ? data.filter(item => 
            (item.courseHeader && item.courseHeader.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.lessonName && item.lessonName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.topicName && item.topicName.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (item.questionText && item.questionText.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item._id && item._id.toString().includes(searchTerm))
          )
        : data)
        .slice(indexOfFirstItem, indexOfLastItem);
      const pageNumbers = [];
      const numberOfGroups = Math.ceil(data && data.length / (itemsPerPage * numbersPerPage));
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber % numbersPerPage === 0) {
          setCurrentGroup(prevGroup => prevGroup + 1);
        } else if ((pageNumber - 1) % numbersPerPage === 0 && pageNumber !== 1) {
          setCurrentGroup(prevGroup => prevGroup - 1);
        }
      };
      for (let i = 1; i <= Math.ceil( data && data.length / itemsPerPage); i++) {
        if (i > (currentGroup - 1) * numbersPerPage && i <= currentGroup * numbersPerPage) {
          pageNumbers.push(i);
        }
      }
      const handleNextClick = () => {
        if (currentGroup < numberOfGroups) {
          setCurrentGroup(prevGroup => prevGroup + 1);
          setCurrentPage(prevPage => prevPage + numbersPerPage);
        }
      };
      
      const handlePrevClick = () => {
        if (currentGroup > 1) {
          setCurrentGroup(prevGroup => prevGroup - 1);
          setCurrentPage(prevPage => prevPage - numbersPerPage);
        }
      };
      const renderPageNumbers = pageNumbers.map(number => {
        return (
            <div>
            
                 <button
                 className="flex rounded w-[2rem] bg-fuchsia-600 items-center justify-center "
            key={number}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>    
         
          </div>
        );
      });
      //console.log(course && course.courseHeader)
  return (
    <>
    <div className="p-1 bg-slate-800 min-h-screen">
        <div className="flex justify-between mr-4 mt-3">
          <h1 className="text-white nunito font-semibold ml-[10rem] text-xl">
            All Documents
          </h1>
          <TeacherDropdown />
        </div>
        <div className="flex mt-3 flex-col">
          <AdminDashboardNav />
          <div className="pl-[8rem]">
          <div className="pl-5 mb-2">
            <input id="search" className="rounded p-2" placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} ></input>
            </div>
          <table className='w-full text-center'>
  <tr className='font-semibold text-gray-400 border-b-[2px] text-lg dark:text-slate-300'>
    <th>Type</th>
    <th>ID</th>
    <th>Name</th>
  </tr>
  {currentItems && currentItems.map((item, index) => (
  <tr className='border-b-[2px] p-5 text-white' key={index}>
    <td>{getType(item)}</td>
    <td>{item._id}</td>
    <td>{item.courseHeader || item.name || item.lessonName || item.topicName || item.questionText || item.title}</td>
  </tr>
))}
</table>
          </div>
          <div className="flex w-full pl-5 pr-5 mb-4 justify-center gap-2">
            {currentGroup > 1 && <button onClick={handlePrevClick} className=" rounded text-white w-fit px-3 bg-fuchsia-600">Prev</button>}
            {renderPageNumbers}
            {currentGroup < numberOfGroups &&  <button onClick={handleNextClick} className=" rounded text-white w-fit px-3 bg-fuchsia-600">Next</button>}
            </div>
          </div>
    </div>
    </>
  )
}
