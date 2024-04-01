import React from 'react'
import Footer from '../Footer/Footer';
import CountUp from 'react-countup';
import "./About.css"
import galleryimg1 from "../../assets/background4.jpg"
import galleryimg2 from "../../assets/party3.jpg"
import galleryimg3 from "../../assets/Party1.jpg"
export default function About() {
  return (
    <div>
        <div className='flexColCenter gallerySection font shadow-box'>
        <h1>ABOUT US</h1>
        <div className='galleryDes flexenter'>
          <div className='galleryText '>
          <h2>About Us</h2>
            <p className='font'>Introducing Eventify - where dreams become events and moments become memories. Nestled in the vibrant heart of Pakistan, Eventify stands as a beacon of excellence in the realm of event management. With a fusion of creativity, precision, and dedication, we craft experiences that transcend the ordinary, making every occasion an unforgettable journey..</p>
            
          </div>
          <div className='galleryImg'> <img src={galleryimg1} alt="" /></div>
          </div>
        
        <div className='galleryDes flexenter'>
          <div className='galleryImg'> <img src={galleryimg2} alt="" /></div>
          <div className='galleryText '>
          <h2>What We Offer</h2>
            <p className='font'>Drawing from a rich tapestry of services, Eventify offers a comprehensive suite tailored to meet your unique needs. Our three-tier system, designed for efficiency and efficacy, streamlines the planning process, allowing us to deliver exceptional results within your desired timeframe and budget.</p>
           
          </div>
        </div>
        </div>
        <div className="flexCenter stats">
                <div className="flexColCenter stat">
                        <span>
                        <CountUp start={8000} end={9000} duration={6}/>
                        <span>+</span>
                        </span>
                        <span className="font">
                            <h4>Event Vendors</h4>
                        </span>
                </div>
                <div className="flexColCenter stat">
                        <span>

                        <CountUp start={25000} end={25500} duration={6}/>
                        <span>+</span>
                        </span>
                        
                        <span className="font">
                           <h4>Annual Events</h4> 
                        </span>
                </div>
                <div className="flexColCenter stat">
                        <span>
                        <CountUp start={800} end={1000}/>
                        <span>+</span>
                        </span>
                        
                        <span className="font">
                           <h4> Event Venues</h4>
                        </span>
                </div>
                <div className="flexColCenter stat">
                        <span>
                        <CountUp start={118000} end={119000} duration={6}/>
                        <span>+</span>
                        </span>
                        <span className="font">
                            <h4>Monthly Followers</h4>
                        </span>
                </div>
                </div>
                <div className='flexColCenter gallerySection font shadow-box'>
                <div className='galleryDes '>
          <div className='galleryText font'>
          <h2>Who We Are</h2>
            <p className='font'>Introducing Eventify - where dreams become events and moments become memories. Nestled in the vibrant heart of Pakistan, Eventify stands as a beacon of excellence in the realm of event management. With a fusion of creativity, precision, and dedication, we craft experiences that transcend the ordinary, making every occasion an unforgettable journey..</p>
          </div>
          <div className='galleryImg'> <img src={galleryimg3} alt="" /></div>
          </div>
          </div>
        <Footer></Footer>
    </div>
  )
}
