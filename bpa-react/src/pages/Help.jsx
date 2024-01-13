import React from 'react'
import QuestionImage from '../imgs/question.svg'
import FeatureImage from '../imgs/features.svg'
import shortcut from '../imgs/shortcut.png'
import userGuide from '../imgs/userGuide.svg'
import problem  from '../imgs/problem.svg'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
export default function Help() {
  const helpTopics = [
    { title: 'Frequent Questions', image: QuestionImage },
    // { title: 'Utilizing Features', image: FeatureImage },
    { title: 'User Guide', image: userGuide },
    { title: 'Report a Problem', image: problem },
  ];

  return (
    <>
      <div className='p-11'>
        <h1 className='text-center text-3xl font-semibold'>Help</h1>
        <h2 className='text-2xl text-center color-main'>use tools below for assistance</h2>
        <div className='grid grid-cols-3 grid-rows-2 gap-5 mt-3 pr-6 pl-6 mb-20'>
          {helpTopics.map((topic, index) => (
            <div className='shadow-lg rounded outline-slate-500   flex flex-col items-center hover:mb-7 animate__slideInLeft animate__animated  cursor-pointer'key={index}>
              <Link className='' to={'/userguide'}><img className='w-full h-4/5'src={topic.image} alt={topic.title} /></Link>
              <div >
              <Link className='text-semibold text-2xl' to={'/'}>{topic.title}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
      <Footer/>
    </>
  )
}
