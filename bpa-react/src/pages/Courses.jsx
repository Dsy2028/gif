import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Footer from '../components/Footer';

export default function Courses() {
  const courses = [
    { 
      name: 'Math: Pre-K - 8th Grade',
      topics: [
        { name: 'Pre-K', skills: 10 },
        { name: 'Early-Math', skills: 8 },
        { name: "2nd Grade", skills: 8 },
        { name: '3rd Grade', skills: 8 },
        { name: '4th Grade', skills: 8 },
        { name: '5th Grade', skills: 8 },
        { name: '6th Grade', skills: 8 },
        { name: '7th Grade', skills: 8 },
        { name: '8th Grade', skills: 8 },
      ]
    },
    { 
        name: "Math: High school+",
        topics: [
          { name: "Algebra 1", skills: 32 },
          { name: "Calculus", skills:21 },
          { name: "Geometry", skills: 28 },
          { name: "Statistics", skills: 18 },
          { name: "Trigonometry", skills: 25 },
          { name: "Pre-Calculus", skills: 24},
          { name: "AP Calculus AB", skills: 8 },
          { name: "AP Calculus BC", skills: 8 },
          { name: "AP Statistics", skills: 8 },
          { name: "Algebra 2", skills: 22 },
          { name: "Differntial Equations", skills: 8 },
      
        ]
      },
      { 
        name: "Science",
        topics: [
          { name: "Elementery Science", skills: 10 },
          { name: "Middle School Science", skills: 8 },
          { name: "Biology", skills: 8 },
          { name: "Chemistry", skills: 8 },
          {name: "Physics", skills: 32},
          {name: "Environmental Science", skills: 8},
          {name: 'Anatomy & Physiology', skills: 8},
          {name: 'Health & Medicine', skills: 8},
          
        ]
      },
      { 
        name: "English & Language Arts",
        topics: [
          { name: 'Pre-K', skills: 10 },
          { name: '2nd Grade', skills: 8 },
          {name: '3rd Grade', skills: 8},
          {name: '4th Grade', skills: 8},
          {name: '5th Grade', skills: 8},
          {name: '6th Grade', skills: 8},
          {name: '7th Grade', skills: 8},
          {name: '8th Grade', skills: 8},
          {name: 'High School', skills: 8},
    
        ]
      },
      { 
        name: "Social Studies",
        topics: [
          { name: 'World History', skills: 10 },
          { name: 'US History', skills: 8 },
          { name: 'Economics', skills: 8 },
          { name: 'Ancient History', skills: 8 },
          { name: 'US Gov & Civics', skills: 8 },
   
        ]
      },
      { 
        name: "Computer Science",
        topics: [
          { name: 'Data Structures & Algorithims', skills: 10 },
          { name: 'Intro to Object Oriented Programming', skills: 8 },
         
        ]
      },
      { 
        name: "Test Prep",
        topics: [
          { name: 'ACT', skills: 10 },
          { name: 'SAT', skills: 8 },
          
        ]
      },
    
  ];

  return (
     <>
     <div className="dark:bg-slate-800">
      
      <h1 className="font-semibold text-center text-4xl color-main dark:text-white  ">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-16 lg:px-24 gap-9 mt-7">
        {courses.map((course, index) => (
          <div key={index}>
            <h2 className="text-xl font-medium uppercase dark:text-white">{course.name}</h2>
            <div className="grid grid-cols-2 gap-6 mt-2">
              {course.topics.map((topic, index) => (
                <div className=" p-4 border border-gray-200 rounded shadow-sm" key={index}>
                  <h3 className="dark:text-slate-300">{topic.name}</h3>
                  <Link to={`/courses/${topic.name}`} className="text-blue-700 hover:underline"> {topic.skills} Lessons</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      </div>
      <Footer />
    </>
  );
}