import React from 'react'
import img from "../imgs/img.png";
import Attatch from "../imgs/attach.png";

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type Something...' />
      <div className="send">
        <label htmlFor="file">
          <img src={Attatch} alt="" />
        </label>
        <input type="file" style={{ display: "none" }} id='file' />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button>send</button>
      </div>
    </div>
  )
}

export default Input