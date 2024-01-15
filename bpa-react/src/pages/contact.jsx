import React from 'react'
import fbIcon from "../imgs/fb-icon.png"
import Footer from '../components/Footer.jsx'
export default function contact() {
    
    return (
        <>
            <div className="w-full h-full flex items-center justify-center mt-4">
                <div className="max-w-2xl">
                    <h1 className="text-semibold text-4xl text-center">(V04) Web Application Team</h1>
                    <p className="mb-4">
                        <br></br>
                    </p>

                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Daouda Dsy</h5>
                    </a>
                    
                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pranil Khatiwoda</h5>
                    </a>
                    
                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Santosh Chuwan</h5>
                    </a>
                    
                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Susmita Adhikari</h5>
                    </a>
            




                    <h1 className="-semibold text-2xl bb-grey text-center"><b>Questions:</b></h1>
                    <p className="mb-4 items-center text-center ">
                        <br />

                        <b>
                            <li><link rel="stylesheet" href="" />Learnx.questions@gmail.com</li>
                        </b>

                    </p>
                    <h1 className="-semibold text-2xl bb-grey text-center"><b>Concerns:</b></h1>
                    <p className="mb-4 items-center text-center ">
                        <br />
                        <b>
                            <li><link rel="stylesheet" href="" />Learnx.concerns@gmail.com</li>
                        </b>
                    </p>
                    {/* <h1 className="-semibold text-2xl bb-grey text-center contact-socialMedia-container"><b>Social Media:</b></h1>
                    <p className="mb-4 items-center text-center contact-socialMedia-container">
                        <br />
                        <b>
                            <ul className="contact-socialMedia">
                                <li><img src={fbIcon} /> </li>
                                <li><img src={fbIcon} /> </li>
                                <li><img src={fbIcon} /> </li>
                                <li><img src={fbIcon} /> </li>
                            </ul>
                        </b>
                    </p> */}

                </div>
            </div>
            <div className="space-filler"></div>
            <Footer />
        </>
    )
}