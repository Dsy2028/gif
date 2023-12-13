import React from 'react';
import Sidebar from '../components/Sidebar';
import Chat1 from '../components/Chat1';

const Chat = () => {
    return(
        <div className='home'>
            <div className ="container">
                <Sidebar/>
                <Chat1/>
            </div>
        </div>
    )
}
export default Chat