import React, { useState, useEffect } from "react";
import FirstPicture from "../imgs/medium-shot-kids-drawing-together.jpg";
import SecondPicture from "../imgs/Tiny professional business people carrying upward arrow.jpg";
import FourthPicture from "../imgs/cute-smiling-young-man-with-bristle-looking-satisfied.jpg";
import ThirdPicture from "../imgs/reading-books.jpg";
import FunPicture from "../imgs/FunPicture.avif"
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
      <br />
      <br />
      <section className="discover-section">
        <div className="discover-container">
          <div className="img-discover">
            <img src={FirstPicture} />
          </div>
          <div className="discover-content">
            <h3>Elevate Learning, One Click at a Time.</h3>
            <p>Aiming to provide free education to any and all</p>
            <Link className="btn" to={"/sign-up"}>
              <button className="nav-btn">Learners</button>
            </Link>
            <Link className="btn">
              <button className="nav-btn">Teachers</button>
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
        <div className="content-holder">
          <h1 className="font-semibold text-3xl mb-4"></h1>
          <p>
         THINGS ABOUT BEING FUN --SOON
          </p>
        </div>
  
        <img src={ FunPicture} />
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
      <div className="h-96 main-color" style={{ 
  background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\'><path d=\'M 10 10 Q 7.5 0 5 10 Q 2.5 0 0 10\' fill=\'%23ff0000\' /></svg>") repeat-x', 
  backgroundSize: 'auto 100%' 
}}>
</div>
      <div className="h-96">

      </div>
      

      <Footer />
    </>
  );
}
