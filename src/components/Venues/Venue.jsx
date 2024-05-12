import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import SearchVenue from '../SearchVenue/SearchVenue';
import "./venue.css";
import "swiper/css";
import { Link, useNavigate } from 'react-router-dom';


export default function Venue() {
  const navigate = useNavigate();
    
  const [selectedCard, setSelectedCard] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [gig, setGig] = useState([]);

  useEffect(() => {
    // Fetch gig data here
    fetch('http://localhost:3000/getAllGigs')
      .then(response => response.json())
      .then(data => {
        setGig(data);
        setFilteredData([]); // Reset filtered data to display all gig data initially
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const filter = gig.filter(venue => {
    if (filteredData.length === 0) {
      return true;
    } else {
      return (
        (filteredData[0] === "" || venue.city === filteredData[0]) &&
        (filteredData[1] === "" || venue.category === filteredData[1]) &&
        (filteredData[2] === "" || venue.venue === filteredData[2])
      );
    }
  });

  console.log(filter)

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div>
      <div className='venueContent'>
        <div className='venueDisplay'>
          <img src="./1/background1.jpg" alt="" srcSet="" />
          <div className='flexColCenter venueDislayText font font-size'>
            <h1 className='font font-size bold-text'>We are <span className='color-text'>EVENTIFY</span></h1>
            <div className='flexColCenter'>
              <h2 className=''>We bring</h2>
              <h3>dream Events</h3>
              <h2>to life</h2>
            </div>
          </div>
          <h1 className='font'>Our EVENT Venues</h1>
        </div>
        <div className='venueSearch'></div>
        <SearchVenue onSearch={handleSearch} onGig={setGig} />
      </div>
      <div className='venueList'>
        <div className="paddings innerWidth r-container ">
          <div className="r-head flexCenter">
            <span className="heading">Event Venues</span>

          </div>
          <div className='eventVenue'>
            {filter.map((card) => (
              <div className="flexColCenter r-card" key={card.id} onClick={() => handleCardClick(card)}>
                <img src={`/1/${card.image}`} alt="home" />
                <span className="flexCenter heading">{card.category}</span>
                <span className="flexCenter font">{card.city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCard && (
        <div className="selectedCard supplierInfoOverlay">
          <div className='supplierInfoContainer flexColCenter'>
            <h2>{selectedCard.venue}</h2>
            
            <div  onClick={()=>{
               navigate('/booking', { state: { userData:selectedCard} });
            }} className='button'>
                Book Now
              </div>
            
            <button className="button" onClick={() => setSelectedCard(null)}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
