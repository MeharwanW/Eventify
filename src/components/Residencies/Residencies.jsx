import React from "react";
import "./Residencies.css";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import data from "../../utils/slider.json";
import data1 from "../../utils/slider1.json";
import data2 from "../../utils/slider2.json";
import { sliderSettings } from "../../utils/common.js";

const Residencies = () => {
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="redText">Browse By Category</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButton/>
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexCenter r-card">
                <img src={card.image} alt="home" />
                <span className="primaryText">{card.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="redText">Popular Venues</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButton/>
          {data1.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card">
                <img src={card.image} alt="home" />
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText font">{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="redText">Featured Video</span>
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
    </section>
  );
};

export default Residencies;

const SliderButton = () => {
  const swipper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button className="button" onClick={() => swipper.slidePrev()}>&lt;</button>
      <button className="button" onClick={() => swipper.slideNext()}>&gt;</button>
    </div>
  );
};
