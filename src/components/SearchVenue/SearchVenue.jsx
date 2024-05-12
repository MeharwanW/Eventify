import React, { useState , useEffect } from 'react';
import "./../Header/SearchBar.css"




export default function SearchVenue({ onSearch , onGig }) {
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
    console.log("location",location);
    console.log("category",category);
    console.log("venueType",venueType);
    const filteredData1 = [location,category,venueType]
   
    onSearch(filteredData1); // Pass filtered data
    onGig(gig);
    resetFields(); // Reset fields after search
  };
  
  const onChangeLocation = (event) => {
    const { value } = event.target;
    setLocation(value);
    
    // Filter suggestions based on the entered location
    const filteredSuggestions = gig.filter(venue => 
      venue.city && venue.city.toLowerCase().startsWith(value.toLowerCase())
    );
    
    const uniqueLocations = Array.from(new Set(filteredSuggestions.map(item => item.city)));
   const uniqueCategories = Array.from(new Set(filteredSuggestions.map(item => item.category)));

    setLocationSuggestions(uniqueLocations);
    setCategorySuggestions(uniqueCategories);
    setShowLocationSuggestions(true); // Show suggestions
  };
  
  
  

  const onChangeCategory = (event) => {
    const { value } = event.target;
    setCategory(value);
    
    // Filter suggestions based on the selected category and location
    const filteredSuggestions = gig.filter(venue => 
      venue.city && venue.city.toLowerCase() === location.toLowerCase() &&
      venue.category && venue.category.toLowerCase().startsWith(value.toLowerCase())
    );
    const uniqueCategory = Array.from(new Set(filteredSuggestions.map(item => item.category)));
    const uniqueVenues = Array.from(new Set(filteredSuggestions.map(item => item.venue)));
    
    setCategorySuggestions(uniqueCategory);
    setVenueTypeSuggestions(uniqueVenues);
    setShowCategorySuggestions(true);
  };
  

  const onChangeVenueType = (event) => {
    const { value } = event.target;
    setVenueType(value);
    
    // Filter suggestions based on the selected category and location
    const filteredSuggestions = gig.filter(venue => 
      venue.category && venue.category.toLowerCase() === category.toLowerCase() &&
      venue.venue && venue.venue.toLowerCase().startsWith(value.toLowerCase())
    );
  
    const uniqueVenues = Array.from(new Set(filteredSuggestions.map(item => item.venue)));
    setVenueTypeSuggestions(uniqueVenues);
    setShowVenueTypeSuggestions(true);
  };

   const onChangeGuests = (event) => {
  //   const { value } = event.target;
    
    // Set the value only if it's a valid guest number from the data and based on the selected location, category, and venue type
  //   const validGuests = gig
  //     .filter(venue => 
  //       venue.city && venue.city.toLowerCase() === location.toLowerCase() &&
  //       venue.category && venue.category.toLowerCase() === category.toLowerCase() &&
  //       venue.venue && venue.venue.toLowerCase() === venueType.toLowerCase()
  //     )
   
  //   setShowGuestsSuggestions(true);
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
