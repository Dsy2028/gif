import React, { useState, useEffect } from "react";
import FirstPicture from "../imgs/medium-shot-kids-drawing-together.jpg";
import SecondPicture from "../imgs/Tiny professional business people carrying upward arrow.jpg";
import FourthPicture from "../imgs/cute-smiling-young-man-with-bristle-looking-satisfied.jpg";
import ThirdPicture from "../imgs/reading-books.jpg";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function index() {
  const [active, setActive] = useState(0);
  const items = [
    {
      img: FourthPicture,
      name: "Dave",
      text: 'This is an HTML tag used to define a division or section in the webpage. class="section-heading home_build_animation home_animation": This is specifying multiple classes for this. These c CSS rules to this element.',
    },
    {
      img: SecondPicture,
      name: "Dave",
      text: 'This is an HTML tag used to define a division or section in the webpage. class="section-heading home_build_animation home_animation": This is specifying multiple classes for this. These c CSS rules to this element.',
    },
    {
      img: FourthPicture,
      name: "Dadve",
      text: 'This is an HTML tag used to define a division or section in the webpage. class="section-heading home_build_animation home_animation": This is specifying multiple classes for this. These c CSS rules to this element.',
    },
    {
      img: FourthPicture,
      name: "Dave",
      text: 'This is an HTML tag used to define a division or section in the webpage. class="section-heading home_build_animation home_animation": This is specifying multiple classes for this. These c CSS rules to this element.',
    },
  ];
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
  let lengthItems = items.length - 1;

  const next = () => {
    setActive((prevActive) =>
      prevActive + 1 <= lengthItems ? prevActive + 1 : 0
    );
  };

  const prev = () => {
    setActive((prevActive) =>
      prevActive - 1 >= 0 ? prevActive - 1 : lengthItems
    );
  };

  useEffect(() => {
    // slider.style.left = -items[active].offsetLeft + 'px';
    //reloadSlider();
  }, [active]);
  /* function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + "px";
    //
    let last_active_dot = document.querySelector(".slider .dots li.active");
    last_active_dot.classList.remove("active");
    dots[active].classList.add("active");
  }
  
  dots.forEach((li, key) => {
    li.addEventListener("click", () => {
      active = key;
  
      reloadSlider();
    });
  });
  window.onresize = function (event) {
    reloadSlider();
  };*/
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
      
      <div className="slider">
        <div className="list">
          {items.map((item, index) => (
            <div
              className={`item ${index === active ? "active" : ""}`}
              key={index}
            >
              <h1>Here's  parents have to say</h1>
              <div className="testimonials-text" id={`testimonial-${index}`}>
                <div className="testimonials-img">
                  <img src={item.img} alt={item.name} />
                  <h3>{item.name}</h3>
                </div>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button id="prev-test" onClick={prev}>
            &lt;
          </button>
          <button id="next-test" onClick={next}>
            &gt;
          </button>
        </div>
        <ul className="dots">
          {items.map((item, index) => (
            <li className={index === active ? "active" : ""} key={index} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
