import React, { useState, useEffect } from "react";
import FirstPicture from "../imgs/medium-shot-kids-drawing-together.jpg";
import SecondPicture from "../imgs/Tiny professional business people carrying upward arrow.jpg";
import FourthPicture from "../imgs/cute-smiling-young-man-with-bristle-looking-satisfied.jpg";
import ThirdPicture from "../imgs/reading-books.jpg";
import FunPicture from "../imgs/two-kids-ipad.jpg"
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


export default function index() {
  const [active, setActive] = useState(0);
  const cards = [
    {
      icon: "smart_toy",
      title: "Ai Enhanced",
      description:
        "providing intelligent recommendations and personalized support for individualized learning journeys.",
    },
    {
      icon: "person",
      title: "Personalized",
      description:
        "cater to each student's unique learning style, ensuring a tailored educational experience",
    },
    {
      icon: "directions_run",
      title: "Own pace",
      description:
        "learn at your own pace, fostering a flexible and personalized educational experience.",
    },
    {
      icon: "monetization_on",
      title: "Free",
      description:
        "it's all entirely free, making quality education accessible to all.",
    },
  ];


  return (
    <>
      <div className="dark:bg-slate-800">
        <br />
        <br />
        <section className="discover-section">
          <div className="discover-container">
            <div className="img-discover">
              <img src={FirstPicture} />
            </div>
            <div className="discover-content dark:text-white">
              <h3>Elevate Learning, One Click at a Time.</h3>
              <p>Aiming to provide free education to any and all</p>
              <Link className="" to={"/sign-up"}>
                <button className="nav-btn dark:bg-violet-700">Learners</button>
              </Link>
              <Link className="">
                <button className="nav-btn dark:bg-violet-700">Teachers</button>
              </Link>
            </div>
          </div>
        </section>

        <div className="landing-cards">
          {cards.map((card) => (
            <div className="landing-card outline-main">
              <div className="flex items-center w-full ">
                <span className="material-symbols-outlined text-xl">{card.icon}</span>
                <h1 className="font-semibold text-2xl">{card.title}</h1>
              </div>
              <div className="landing-card-p">
                <p>{card.description}</p>
              </div>
            </div>
          ))}
          {/* fun info card */}
          <div className="hero">
            <img src={FunPicture} />
            <div className="content-holder">
              <h1 className="font-semibold text-3xl mb-4"></h1>
              <p>

                Welcome to our awesome education site! Learning here is like a fun journey. We've got cool quizzes that feel like games and lessons that tell interesting stories. Our site has colorful videos and interactive stuff that makes learning super cool. Join our community and let's have a blast learning together! Welcome to the fun way to learn!
              </p>
            </div>

          </div>


        </div>
        <div className="hero">
          <div className="content-holder">
            <h1 className="font-semibold text-3xl mb-4"></h1>
            <p>
              Embrace the freedom to connect without boundaries. Whether you're in the heart of the city or the
              tranquility of nature, our website ensures that distance is no longer a hurdle. Stay plugged in,
              stay connected—wherever your journey takes you.
            </p>
          </div>

          <img src={ThirdPicture} />
        </div>
        <div className="potential-container">
          <img src={SecondPicture} />
          <div className="mainContent">
     
        <p>This is the main content of the card.</p>
      </div>
      <div className="placeholderContent">
        {/* Placeholder text */}
        <p>Placeholder Text</p>
      </div>
          <div className="content-holder ">
            <h1 className="font-semibold text-3xl mb-4"></h1>
            <p>
              Unlock your full potential with our interactive learning platform.
              Powered by AI, we provide personalized insights for tailored
              learning experiences. Whether you're a student exploring new
              horizons or an educator enhancing your skills, our platform adapts
              to your unique style. Learn at your own pace for a customized
              journey—all for free. Join us and transcend traditional education,
              where possibilities are boundless!
            </p>
          </div>
        </div>

        return (
    <section className='slider'>
   {/*   <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />*/}
      {/*SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='travel image' className='image' />
            )}
          </div>
        );
      })*/}
    </section>
  );
      </div>

      <Footer />
    </>
  );
}
