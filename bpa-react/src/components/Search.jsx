import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user...'/>
      </div>
      <div className="userChat">
        <img src="https://retratosbarcelona.com/wp-content/uploads/2022/09/Retratos-Barcelona-Linkedin-Photography-Alejandra.jpg" alt="" />
        <div className="userChatInfo">
          <span>person</span>
        </div>
      </div>
    </div>
  )
}

export default Search
