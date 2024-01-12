import React from 'react'
import Sidebar from '../components/Sidebar';
import Chat1 from '../components/Chat1';
import Footer from "../components/Footer";
import style from '../style.scss';

const Chat = () => {
    return (
        <div>
            <div className='home'>
                <div className="container">
                    <Sidebar />
                    <Chat1 />
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default Chat