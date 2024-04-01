import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import myImg from "../../assets/supplier.jpg";
import "./Supplier.css";
import data1 from "../../utils/slider1.json";

export default function Suppliers() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  return (
    <div className='suppliersDisplay'>
      <div className='suppliersScreen'>
        {selectedSupplier && (
          <SupplierInfo supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
        )}
        {!selectedSupplier && (
          <img src={myImg} alt="" srcSet="" />
        )}
      </div>

      <div className="paddings innerWidth r-container ">
        <div className="r-head flexCenter">
          <span className="heading">Suppliers Categories</span>
        </div>
        <div className='supplierVanue'>
          {data1.map((card, index) => (
            <div key={index} className="flexColCenter r-card" onClick={() => handleSupplierClick(card)}>
              <img src={card.image} alt="home" />
              <span className="flexCenter heading">{card.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

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
