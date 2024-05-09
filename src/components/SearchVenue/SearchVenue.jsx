import React, { useState , useEffect } from 'react';

import "./../Header/SearchBar.css"

const axios = require("axios");



export default function SearchVenue({ onSearch }) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [venueType, setVenueType] = useState("");
  const [guests, setGuests] = useState("");
  const [gig, setGig] = useState([])

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [venueTypeSuggestions, setVenueTypeSuggestions] = useState([]);
  const [guestsSuggestions, setGuestsSuggestions] = useState([]);

  const [showLocationSuggestions, setShowLocationSuggestions] = useState(true);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(true);
  const [showVenueTypeSuggestions, setShowVenueTypeSuggestions] = useState(true);
  const [showGuestsSuggestions, setShowGuestsSuggestions] = useState(true);

  const resetFields = () => {
    setLocation("");
    setCategory("");
    setVenueType("");
    setGuests("");
  };
  
  const handleSearch = () => {

    const filteredData = gig.filter(venue => {

      return (
        (location === "" || venue.location === location) &&
        (category === "" || venue.category === category) &&
        (venueType === "" || venue.venuetype === venueType) &&
        (guests === "" || (venue.guests >= parseInt(guests, 10)))
      );

    });
   // console.log(filteredData);
    onSearch(filteredData);
    resetFields(); // Reset fields after search
  };

  const onChangeLocation = (event) => {
    const { value } = event.target;
    setLocation(value);
    const searchTerm = value.toLowerCase();
    const filteredSuggestions = gig.filter(venue => venue.location && venue.location.toLowerCase().startsWith(searchTerm));
    const uniqueSuggestions = Array.from(new Set(filteredSuggestions.map(item => item.location)));
    setLocationSuggestions(uniqueSuggestions);
    setShowLocationSuggestions(true);
  };
  

  const onChangeCategory = (event) => {
    const { value } = event.target;
    setCategory(value);
    const searchTerm = value.toLowerCase();
    const filteredSuggestions = gig.filter(venue => venue.category && venue.category.toLowerCase().startsWith(searchTerm));
    const uniqueSuggestions = Array.from(new Set(filteredSuggestions.map(item => item.category)));
    setCategorySuggestions(uniqueSuggestions);
    setShowCategorySuggestions(true);
  };

  const onChangeVenueType = (event) => {
    const { value } = event.target;
    setVenueType(value);
    // Find the venue in the data array that matches the selected venue type
    const selectedVenue = gig.find(venue => venue.venueType && venue.venuetype.toLowerCase() === value.toLowerCase());
    if (selectedVenue) {
      setGuests(selectedVenue.guests.toString());
    }
    const searchTerm = value.toLowerCase();
    const filteredSuggestions = gig.filter(venue => venue.venueType && venue.venuetype.toLowerCase().startsWith(searchTerm));
    const uniqueSuggestions = Array.from(new Set(filteredSuggestions.map(item => item.venuetype)));
    setVenueTypeSuggestions(uniqueSuggestions);
    setShowVenueTypeSuggestions(true);
  };

  const onChangeGuests = (event) => {
    const { value } = event.target;
    // Set the value only if it's a valid guest number from the data
    const validGuests = gig.map(venue => venue.guests.toString());
    if (validGuests.includes(value)) {
      setGuests(value);
    }
    setShowGuestsSuggestions(true);
  };

  const handleSuggestionClick = (setter) => {
    setter(false);
  };

  useEffect(() => {
    fetch('http://localhost:3000/getAllGigs')
    .then(response => response.json())
    .then(data => setGig(data))
    .catch(error => console.error('Error:', error));
    
}, []);
console.log("Hello gog",gig);

  return (
    <div>
      <div className='flexCenter border-gradient box-shadow search'>
        <div className='margin'>
          <form action="">
            <div className='search-container'>
              <input
                type="text"
                name=''
                placeholder="Location e.g Karachi"
                className="search-input font"
                value={location}
                onChange={onChangeLocation}
              />
              {showLocationSuggestions && (
                <div className="suggestions">
                  {locationSuggestions.map((item, index) => (
                    <div key={index} onClick={() => { setLocation(item); handleSuggestionClick(setShowLocationSuggestions); }} className="suggestion-item">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className='margin'>
          <form action="" method="get">
            <div className='search-container'>
              <input
                type="text"
                placeholder="Category e.g Meeting"
                className="search-input font"
                value={category}
                onChange={onChangeCategory}
              />  
              {showCategorySuggestions && (
                <div className="suggestions">
                  {categorySuggestions.map((item, index) => (
                    <div className="suggestion-item">
                    <div key={index} onClick={() => { setCategory(item); handleSuggestionClick(setShowCategorySuggestions); }} >
                      {item}
                    </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className='margin'>
          <form action="" method="get">
            <div className='search-container'>
              <input
                type="text"
                placeholder="Venue Type e.g Banquet"
                className="search-input font"
                value={venueType}
                onChange={onChangeVenueType}
              />
              {showVenueTypeSuggestions && (
                <div className="suggestions">
                  {venueTypeSuggestions.map((item, index) => (
                    <div key={index} onClick={() => { setVenueType(item); handleSuggestionClick(setShowVenueTypeSuggestions); }} className="suggestion-item2">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className='margin'>
          <form action="" method="get">
            <div className='search-container'>
              <input
                type="text"
                placeholder="No. Of Guests e.g 200"
                className="search-input font"
                value={guests}
                onChange={onChangeGuests}
                disabled // Disable manual editing of the guests input field
              />
              {showGuestsSuggestions && (
                <div className="suggestions">
                  {guestsSuggestions.map((item, index) => (
                    <div key={index} onClick={() => { setGuests(item); handleSuggestionClick(setShowGuestsSuggestions); }} className="suggestion-item">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="margin">
          <button className='button font' onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  )
}
