/**
 * This is the about page here you can learn all about what this webiste work our exception for the user. 
 * 
 */

import React from "react";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center  dark:bg-slate-800 dark:text-white">
        <div className="max-w-2xl">
          <h1 className="text-semibold text-4xl text-center">About Us</h1>
          <br></br>
          <p className="mb-4">

          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>How It Work</b></h1>
          <p className="mb-4">
            <b>Explore Courses: </b> Browse our extensive library of courses covering a wide array of subjects and skills. Find the perfect learning path tailored to your interests and aspirations.
            <br></br>
            <b>Engage in Interactive Learning: </b> Immerse yourself in interactive lessons, practical exercises, and activities designed to enhance your understanding and application of knowledge.
            <br></br>
            <b>Track Your Progress: </b> Monitor your learning milestones, track progress, and receive personalized feedback to ensure you stay on the path to success.
          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>User Responsibility</b></h1>
          <p className="mb-4">As a LearnX user, you play a crucial role in fostering a positive and collaborative learning environment. Here are your responsibilities:</p>
          <br></br>
          <p className="mb-4">
            <b>Respectful Engagement:</b> Treat fellow learners, instructors, and support staff with courtesy and respect. Foster a culture of inclusivity and open-mindedness.
            <br></br>
            <b>Intellectual Property:</b> Respect the intellectual property rights of others. Do not engage in plagiarism, copyright infringement, or any form of unauthorized use of content.
            <br></br>
            <b>Data Privacy:</b> Safeguard your account information and respect the privacy of others. Do not share personal information that could compromise the security of yourself or others.
            <br></br>
            <b>Adherence to Policies: </b> Familiarize yourself with and adhere to LearnX's policies, including this Code of Conduct and our Privacy Policy.
          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>Code of Conduct</b></h1>
          <p className="mb-4">
            LearnX is committed to maintaining a positive and collaborative learning community. To ensure a respectful and inclusive environment, we expect users to adhere to the following Code of Conduct:
            <br></br>
            <b>Respect:</b> Treat everyone with respect and kindness, fostering a supportive learning community.
            <br></br>
            <b>Integrity</b>Uphold academic and ethical standards. Do not engage in cheating, plagiarism, or any form of dishonest behavior.
            <br></br>
            <b>Inclusivity:</b> Embrace diversity and inclusivity. Avoid discriminatory language or behavior based on race, gender, religion, or any other characteristic.
            <br></br>
            <b>Constructive Communication:</b> Engage in constructive discussions, providing feedback and opinions in a respectful manner.
          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>Changes to Terms</b></h1>
          <p className="mb-4">
          LearnX reserves the right to update and modify the terms of use, privacy policy, and other relevant policies. Users will be notified of any significant changes via email or platform announcements. It is the user's responsibility to review and familiarize themselves with the latest terms regularly.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}