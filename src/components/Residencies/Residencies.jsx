import React, { useState, useEffect } from "react";
import "./Residencies.css";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../../utils/slider.json";
import data1 from "../../utils/slider1.json";
import data2 from "../../utils/slider2.json";
import { sliderSettings } from "../../utils/common.js";
import data4 from "../../utils/reception.json";
import { Link } from "react-router-dom";

const Residencies = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [gig, setGig]=useState([])

  //console.log(gig)

  const handleSupplierClick = (category) => {
    setSelectedCategory(category);
    // Filter supplier data based on the selected category
    const filteredSuppliers = data4.filter((supplier) => supplier.category === category);
    setSelectedSuppliers(filteredSuppliers);
  };
  useEffect(() => {
    fetch('http://localhost:3000/getAllGigs')
      .then(response => response.json())
      .then(data => setGig(data))
      .catch(error => console.error('Error:', error));
  }, []);
  
  console.log("Gig inside residencies: ", gig)
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <span className="heading">Browse By Category</span>
        </div>
        <Swiper {...sliderSettings}>
        {[...new Set(gig.map(card => card.category))].map((category, i) => (
  <SwiperSlide key={i}>
    <div onClick={() => handleSupplierClick(category)} className="r-card">
      <span className="flexCenter heading font">{category}</span>
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
          {gig.map((card, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => handleSupplierClick(card.venue)} className="flexCenter r-card">
                <img src={card.image} alt="home" />
                <span className="flexCenter heading">{card.venue}</span>
                {/* <span className="flexCenter font">{card.detail}</span> */}
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
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedSupplierIndex(index);
  };

  return (
    <div className="supplierInfoOverlay" onClick={onClose}>
      <div className="supplierInfoContainer flexCenter" onClick={(e) => e.stopPropagation()}>
        {selectedSuppliers.map((supplier, index) => (
          <div key={index} className="flexCenter">
            <div className="r-card flexCenter" onClick={() => handleCardClick(index)}>
              <img src={supplier.image} alt="home" />
              {selectedSupplierIndex === index && <p>{supplier.description}</p>}
            </div>
          </div>
        ))}
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
