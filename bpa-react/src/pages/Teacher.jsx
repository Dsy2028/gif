import React from 'react'

export default function Teacher() {
  return (
    <div>Teacher</div>
  )
}

import React from 'react'
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'
import { XYPlot, RadialChart } from 'react-vis'

export default function Teacher() {
    const data = [{angle: 1}, {angle: 5}, {angle: 2}]
  return (
    <>
    <div className='flex w-full h-full '>
        <DashboardNav />
        <div className=' grid grid-cols-4 grid-rows-1 justify-evenly '>
            <div className='outline '>
          <RadialChart data={data} height={300} width={300} />
            </div>
            <div className='outline'>
                <h1>prof</h1>
            </div>
            <div className='outline'>
                <h1>prof</h1>
            </div>
            <div className='outline'>
                <h1>prof</h1>
            </div>
        </div>
        <div className='grid grid-cols-3 grid-rows-1'>
            <div>
            </div>
            <div></div>
            <div></div>
        </div>
    </div>
    <Footer/>
    </>
  )
}