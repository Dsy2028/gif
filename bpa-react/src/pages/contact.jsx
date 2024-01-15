import React from 'react'
import fbIcon from "../imgs/fb-icon.png"
import Footer from '../components/Footer.jsx'
export default function contact() {
    return (
        <>
            <div className="w-full h-full flex items-center justify-center mt-4">
                <div className="max-w-2xl">
                    <h1 className="text-semibold text-4xl text-center">Contact Us</h1>
                    <p className="mb-4">
                        <br></br>
                    </p>
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
                    <h1 className="-semibold text-2xl bb-grey text-center contact-socialMedia-container"><b>Social Media:</b></h1>
                    <p className="mb-4 items-center text-center contact-socialMedia-container">
                    <br />         
                            <b>
                            <ul className="contact-socialMedia">
                            <li><img src={ fbIcon}  /> </li>
                            <li><img src={ fbIcon} /> </li>
                            <li><img src={ fbIcon} /> </li>
                            <li><img src={ fbIcon} /> </li>
                            </ul>                         
                            </b>
                    </p>
                    
                </div>
            </div>
                <div className="space-filler"></div>
            <Footer />
        </>
    )
}