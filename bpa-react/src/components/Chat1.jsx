import React from 'react'
import Add from "../imgs/add.png";
import More from "../imgs/more.png";
import Messages from './Messages';
import Input from './Input';

const Chat1 = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Person chat</span>
        <div className="chatIcons">
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat1

