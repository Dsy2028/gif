import React from 'react'

const ChatNavBar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Chat</span>
        <div className="user">
            <img src="https://retratosbarcelona.com/wp-content/uploads/2022/09/Retratos-Barcelona-Linkedin-Photography-Alejandra.jpg" alt="" />
            <span>John</span>
            <button>logout</button>
        </div>
    </div>
  )
}

export default ChatNavBar