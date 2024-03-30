import React from 'react'
import Footer from '../Footer/Footer';
import myImg from "../../assets/supplier.jpg"
import "./Supplier.css"
import data1 from "../../utils/slider1.json"

export default function Suppliers() {
  return (
    <div className='suppliersDisplay'>
      <div className='suppliersScreen'>
        <img src={myImg} alt="" srcset="" />
      </div>


      <div className="paddings innerWidth r-container ">
        <div className="r-head flexCenter">
          <span className="heading">Suppliers Categories</span>
        </div>
        <div className='supplierVanue '>
          {data1.map((card) => (
            <div className="flexColCenter r-card" >
                <img src={card.image} alt="home" />
                <span className="flexCenter heading">{card.name}</span>
              </div>
         
         ))}
         </div>

          </div>
        <Footer></Footer>
    </div>
  )
}
