import React, { useEffect, useState } from 'react';
import DashNav from '../components/DashNav'
import DashboardNav from '../components/DashboardNav'

export default function Inbox() {


    return (
        <>
            <DashboardNav />
            <div class="pl-2 ...">

                <div className="grid p-80 rounded-xl bg-black">
                    <div class="divide-y divide-slate-200 ...">
                        <div>01</div>
                        <div>02</div>
                        <div>03</div>
                    </div>


                </div>
            </div>
        </>
    )

}