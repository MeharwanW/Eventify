import React, { useState } from "react";
import "./Residencies.css";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../../utils/slider.json";
import data1 from "../../utils/slider1.json";
import data2 from "../../utils/slider2.json";
import { sliderSettings } from "../../utils/common.js";

const Residencies = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
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

      {selectedSupplier && (
        <SupplierInfo supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
      )}
    </section>
  );
};

export default Residencies;

const SupplierInfo = ({ supplier, onClose }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="supplierInfoOverlay" onClick={onClose}>
      <div className="supplierInfoContainer flexCenter" onClick={(e) => e.stopPropagation()}>
        <div className="flexCenter">
          <div className="r-card">
            <img src={supplier.image} alt="home" onClick={toggleDescription} />
            {showDescription && <p>{supplier.description}</p>}
          </div>
        </div>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
