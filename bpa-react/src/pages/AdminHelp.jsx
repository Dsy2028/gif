import React from 'react'
import Adminadditems from '../imgs/Adminadditems.mp4'
import Adminchange from '../imgs/Adminchange.mp4'
import AdminDashboardNav from "../components/AdminDashboardNav";

export default function AdminHelp() {
    return (
        <>
            <AdminDashboardNav />

            <section className="discover-section">
                <div className="discover-container">
                    <div >
                        {<video src={Adminadditems} controls width={700} height={700} />}
                    </div>
                    <div className="discover-content dark:text-white">
                        <h3> Welcome to LearnX admin account</h3>
                        <p>this video will walk you through the process of adding a new course and a unit to the current list of courses.</p>
                    </div>
                </div>
            </section>
            <section className="discover-section">
                <div className="discover-container">
                    <div >
                        {<video src={Adminchange} controls width={700} height={700} />}
                    </div>
                    <div className="discover-content dark:text-white">
                        <h3>LearnX Admin Account Change</h3>
                        <p>this video will walk you through the process of changing users first and last name, email, and password. As well has how to delete someones Profile.</p>
                    </div>
                </div>
            </section>
        </>
    )
} 