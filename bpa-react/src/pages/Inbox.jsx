import React, { useEffect, useState } from 'react';
import DashNav from '../components/DashNav'
import DashboardNav from '../components/DashboardNav'

export default function Inbox() {


    return (
        <>
        <DashboardNav/>
            <div className="grid p-80 rounded-xl bg-white">
                <div class="message">
                    <div class="message-content">
                        <h2>John Doe</h2>
                        
                        <p class="message-date">January 1, 2023</p>
                    </div>
                </div>

                <div class="message">
                    <div class="message-content">
                        <h2>Jane Smith</h2>

                        <p class="message-date">January 2, 2023</p>
                    </div>
                </div>
            </div>
        </>
    )

}