import React from 'react'
import Footer from '../Footer/Footer';
import SearchVenue from '../SearchVenue/SearchVenue';
import "./venue.css"

export default function Venue() {
  return (
    <div>
        <div className='venueContent'>
          <div className='venueDisplay'>
          <img src="./1/background1.jpg" alt="" srcset="" />
          <h1 className='font'>Our EVENT Venues</h1>
          </div>
          <div className='venueSearch'></div>
          <SearchVenue></SearchVenue>
        </div>
        <Footer></Footer>
    </div>
  )
}
