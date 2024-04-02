import React from "react";
import "./Residencies.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import data from "../../utils/slider.json";
import data1 from "../../utils/slider1.json";
import data2 from "../../utils/slider2.json";
import { sliderSettings } from "../../utils/common.js";
import { useState } from "react";
import myImg from "../../assets/supplier.jpg";

const Residencies = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };
  return (
    <section className="r-wrapper">
       <div className='suppliersScreen'>
        {selectedSupplier && (
          <SupplierInfo supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
        )}
        {!selectedSupplier && (
          <img src={myImg} alt="" srcSet="" />
        )}
      </div>
      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <span className="heading">Browse By Category</span>
        </div>
        <Swiper {...sliderSettings}>
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => handleSupplierClick(card)} className="r-card">
                <img src={card.image} alt="home" />
                <span className="flexCenter heading font">{card.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <span className="heading">Popular Venues</span>
        </div>
        <Swiper {...sliderSettings}> 
        <SliderButton/>
          {data1.map((card, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => handleSupplierClick(card)} className="flexCenter r-card">
                <img src={card.image} alt="home" />
                <span className="flexCenter heading">{card.name}</span>
                <span className="flexCenter font">{card.detail}</span>
              </div>
             
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>

      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <span className="heading">Featured Video</span>
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

function SupplierInfo({ supplier, onClose }) {
  return (
    <div className="supplierInfoOverlay" onClick={onClose}>
      <div className="supplierInfoContainer" onClick={(e) => e.stopPropagation()}>
        <h2>{supplier.name}</h2>
        <p>{supplier.description}</p>
        <button className='button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
