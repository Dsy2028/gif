import React from 'react'
import Loginvideo from "../imgs/Loginvideo.mp4";
import Teacherclass from "../imgs/Teacherclass.mp4";
import Footer from '../components/Footer.jsx'
export default function Userguide() {
    return (
        <>
            <div className="w-full h-full flex items-center justify-center mt-4">
                <div className="max-w-2xl">
                    <h1 className="text-semibold text-4xl text-center">How to Use Learnx</h1>



                </div>
            </div>
            <div className="hero">
                {<video src={Loginvideo} controls width={700} height={700} />}
                <div className="content-holder">
                    <h1 className="font-semibold text-3xl mb-4"></h1>
                    <p>
                        Welcome to LearnX this video will walk you through the process of logging into you account for the first time.
                    </p>
                </div>
            </div>

            <div className="hero">
                <div className="content-holder">
                    <h1 className="font-semibold text-3xl mb-4"></h1>
                    <p>
                        How to make a class from the teacher page and add a student to assign them topics.
                    </p>
                </div>
                 {<video src={Teacherclass} controls width={700} height={700} />} 
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Footer />
        </>
    )
}