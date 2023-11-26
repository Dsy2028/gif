import React from 'react'

export default function QuizHeader() {
  return (
    <header>
  <nav>
    <img className="logo" src="../imgs/Logo.png" />
    <div className="questionAmount">
      <span>0/10</span>
      <span>Quiz 1 Polynomials</span>
    </div>
    <ul className="nav-links">
      <a href="#" id="exit-quiz">
        <i className="fa-solid fa-x fa-2xl" />
      </a>
    </ul>
  </nav>
</header>
  )
}
