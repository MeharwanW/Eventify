import React from 'react'
import Footer from '../Footer/Footer';
import SearchVenue from '../SearchVenue/SearchVenue';
import "./venue.css"
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import data1 from "../../utils/slider1.json"
import { sliderSettings } from "../../utils/common.js";

export default function Venue() {
  return (
    <div>
        <div className='venueContent'>
          <div className='venueDisplay'>
          <img src="./1/background1.jpg" alt="" srcset="" />
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
