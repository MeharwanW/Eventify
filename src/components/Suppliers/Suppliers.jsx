import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import myImg from "../../assets/supplier.jpg";
import "./Supplier.css";
import data1 from "../../utils/suppliercatagory.json";

export default function Suppliers() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='suppliersDisplay'>
      <div className='suppliersScreen'>
        {selectedCategory && (
          <CategoryInfo category={selectedCategory} onClose={() => setSelectedCategory(null)} />
        )}
        {!selectedCategory && (
          <img src={myImg} alt="" srcSet="" />
        )}
      </div>

      <div className="paddings innerWidth r-container ">
        <div className="r-head flexCenter">
          <span className="heading">Suppliers Categories</span>
        </div>
        <div className='supplierVanue'>
            {data1.map((category, i) => (
            <div key={i}>
              <div onClick={() => handleCategoryClick(category)} className="flexCenter r-card">
                <img src={category.image} alt="home" />
                <span className="flexCenter heading">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CategoryInfo({ category, onClose }) {
  return (
    <div className="supplierInfoOverlay" onClick={onClose}>
      <div className="supplierInfoContainer flexColCenter" onClick={(e) => e.stopPropagation()}>
        <div className='r-card flexCenter'>
        <img src={category.image} alt="" srcset="" />
        <p>{category.name}</p>
        
        </div>
        <button className='button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
