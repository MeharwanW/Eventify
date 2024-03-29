import React from 'react'
import Footer from '../Footer/Footer';
import SearchVenue from '../SearchVenue/SearchVenue';
import "./venue.css"
import "swiper/css";
import data1 from "../../utils/slider1.json"

export default function Venue() {
  return (
    <div>
        <div className='venueContent'>
          <div className='venueDisplay'>
          <img src="./1/background1.jpg" alt="" srcset="" />
          <div className='flexColCenter venueDislayText font font-size'>
          <h1 className='font font-size bold-text'>We are <span className='color-text'>EVENTIFY</span></h1>
          <div className='flexColCenter'>
          <h2 className=''>We bring</h2>
          <h3>dream Events</h3>
          <h2>to life</h2>
          </div>
          </div>
          <h1 className='font'>Our EVENT Venues</h1>
          </div>
          <div className='venueSearch'></div>
          <SearchVenue></SearchVenue>
        </div>
      <div className='venueList'>
      <div className="paddings innerWidth r-container ">
        <div className="r-head flexCenter">
          <span className="heading">Event Venues</span>
        </div>
        <div className='eventVenue'>
          {data1.map((card) => (
            <div className="flexColCenter r-card">
                <img src={card.image} alt="home" />
                <span className="flexCenter heading">{card.name}</span>
                <span className="flexCenter font">{card.detail}</span>
              </div>
         
         ))}
        
         </div>
       
      
        
      </div>
      </div>

        <Footer></Footer>
    </div>
  )
}
