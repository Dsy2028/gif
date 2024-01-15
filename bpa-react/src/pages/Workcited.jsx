import React from 'react'
import FirstPicture from "../imgs/medium-shot-kids-drawing-together.jpg";
import SecondPicture from "../imgs/Tiny professional business people carrying upward arrow.jpg";
import FourthPicture from "../imgs/cute-smiling-young-man-with-bristle-looking-satisfied.jpg";
import ThirdPicture from "../imgs/reading-books.jpg";
import FunPicture from "../imgs/two-kids-ipad.jpg"
import Footer from '../components/Footer.jsx'

export default function Workcited() {
    return (
        <>
            <div className="w-full h-full flex items-center justify-center mt-4">
                <div className="max-w-2xl">
                    <h1 className="text-semibold text-4xl text-center">Work Cited</h1>
                    <h1 className="text-semibold text-4xl text-center">Images</h1>
                    <div className="hero">
                        <img src={FunPicture} />
                        <div className="content-holder">
                            <h1 className="font-semibold text-3xl mb-4"></h1>
                            <p>
                                <a href="https://www.freepik.com/">https://www.freepik.com/free-vector/boys-online-learning-from-tablet_18435815.htm#query=two-kids-ipad%20jpg&position=7&from_view=search&track=ais&uuid=a1006440-b044-42da-8ef7-14b925289e82</a>
                            </p>
                        </div>
                    </div>
                    <div className="hero">
                        <img src={FirstPicture} />
                        <div className="content-holder">
                            <h1 className="font-semibold text-3xl mb-4"></h1>
                            <p>
                                <a href="https://www.freepik.com/">https://www.freepik.com/free-photo/medium-shot-kids-drawing-together_20886636.htm#query=medium-shot-kids-drawing-together&position=0&from_view=search&track=sph&uuid=b2f7e1ef-f9fc-44aa-91ab-2249f48466b4</a>
                            </p>
                        </div>

                    </div>
                    <div className="hero">
                        <img src={SecondPicture} />
                        <div className="content-holder">
                            <h1 className="font-semibold text-3xl mb-4"></h1>
                            <p>
                                <a href="https://www.freepik.com/">https://www.freepik.com/free-vector/tiny-professional-business-people-carrying-upward-arrow_19216949.htm#query=tiny%20professional%20business%20people%20carrying%20upwards%20arrow&position=13&from_view=search&track=ais&uuid=5220cd97-0778-4200-82c6-2b28958e7979</a>
                            </p>
                        </div>

                    </div>
                    <h1 className="text-semibold text-4xl text-center">Icons/Text Font/Css/Text/Into Text</h1>
                    <div className="hero">
                        {/* <img src={SecondPicture} /> */}
                        <div className="content-holder">
                            <h1 className="font-semibold text-3xl mb-4"></h1>
                            <p>
                                All of the font were imported from  <a href="https://fontawesome.com/">  https://fontawesome.com/</a>
                                <br></br>
                                <br></br>
                                All of the text font were imported from <a href="https://developers.google.com/fonts"> https://developers.google.com/fonts</a>
                                <br></br>
                                <br></br>
                                Some of the CSS from <a href="https://tailwindcss.com/"> https://tailwindcss.com/</a>
                                <br></br>
                                <br></br>
                                Some of the texted were created by <a href="https://chat.openai.com/"> https://chat.openai.com/</a>
                                <br></br>
                                <br></br>
                                Text for Intro pages were the help of CueMath <a href="https://www.cuemath.com/en-us/"> https://www.cuemath.com/en-us/</a>
                            </p>
                        </div>

                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}