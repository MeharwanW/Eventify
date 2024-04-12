import React from 'react'
import Footer from '../Footer/Footer';
import "./media.css"
import data2 from "../../utils/slider2.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderSettings } from "../../utils/common.js";

export default function Media() {
  return (
    <div>
      <div className='container MediaScreen'>
      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <span className="heading">Latest Videos</span>
        </div>
      <div className="flexCenter">
      <Swiper {...sliderSettings}>
        {data2.map((card, i) => (
            <SwiperSlide key={i}>
          <div key={i} className="videoCard r-card">
            <video src={card.video} alt="home" />
          </div>
            </SwiperSlide>
        ))}
         </Swiper>
         <Swiper {...sliderSettings}>
  {data2.map((card, i) => (
    <SwiperSlide key={i}>
      <div className="videoCard r-card">
        <video controls>
          <source src={card.video} type="video/mp4" />
          {}
          Your browser does not support the video tag.
        </video>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
      </div>
</div>
      </div>
        <Footer></Footer>
    </div>
  )
}
