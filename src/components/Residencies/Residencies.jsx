import React, { useState, useEffect } from "react";
import "./Residencies.css";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../../utils/slider.json";
import data1 from "../../utils/slider1.json";
import data2 from "../../utils/slider2.json";
import { sliderSettings } from "../../utils/common.js";
import data4 from "../../utils/reception.json";

const Residencies = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const handleSupplierClick = (category) => {
    setSelectedCategory(category);
    // Filter supplier data based on the selected category
    const filteredSuppliers = data4.filter((supplier) => supplier.name === category);
    setSelectedSuppliers(filteredSuppliers);
  };

  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <span className="heading">Browse By Category</span>
        </div>
        <Swiper {...sliderSettings}>
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => handleSupplierClick(card.name)} className="r-card">
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
          {data1.map((card, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => handleSupplierClick(card.name)} className="flexCenter r-card">
                <img src={card.image} alt="home" />
                <span className="flexCenter heading">{card.name}</span>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <span className="heading">Featured Video</span>
        </div>
        <Swiper {...sliderSettings}>
          {data2.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="videoCard r-card">
                <video src={card.video} alt="home" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedSuppliers.length > 0 && (
        <SupplierInfo selectedSuppliers={selectedSuppliers} onClose={() => setSelectedSuppliers([])} />
      )}
    </section>
  );
};

export default Residencies;

const SupplierInfo = ({ selectedSuppliers, onClose }) => {
  return (
    <div className="supplierInfoOverlay" onClick={onClose}>
      <div className="supplierInfoContainer flexCenter" onClick={(e) => e.stopPropagation()}>
       <div className="flexCenter">
        {selectedSuppliers.map((supplier, index) => (
          <div key={index} className="r-card1">
            <div className="r-card">
              <img src={supplier.image} alt="home" />
              <p>{supplier.description}</p>
            </div>
          </div>
        ))}
        </div>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
