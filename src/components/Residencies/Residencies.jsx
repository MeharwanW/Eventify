import React from "react";
import "./Residencies.css";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import data from "../../utils/slider.json";
import data1 from "../../utils/slider1.json";
import data2 from "../../utils/slider2.json";
import data3 from "../../utils/slider3.json";
import { sliderSettings } from "../../utils/common.js";
const Residencies = () => {
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Browse By Catagory</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButton/>
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card r-card1">
                <img src={card.image} alt="home" srcset="" />
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Popular Vanues</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButton/>
          {data1.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card1 r-card ">
                <img src={card.image} alt="home" srcset="" />
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Featured Video</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButton/>
          {data2.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card r-card2">
                <video src={card.video} alt="home" srcset="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="paddings innerWidth r-container">
        <div className="flexColStart">
          </div>
          <Swiper {...sliderSettings}>
            <SliderButton/>
            {data3.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card r-card2">
                <video src={card.video} alt="home" srcset="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
    
  );
};

export default Residencies;

const SliderButton = () =>
{
  const swipper = useSwiper();
  return(
      <div className="flexCenter r-buttons">
          <button onClick={()=> swipper.slidePrev()}>&lt;</button>
          <button onClick={()=> swipper.slideNext()}>&gt;</button>
      </div>
    );
};