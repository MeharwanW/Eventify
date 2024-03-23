import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./Hero.css";
import myImage from '../../assets/1.jpg';
import myImage1 from '../../assets/2.jpg';
import myImage2 from '../../assets/3.jpg';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import data from "../Header/full_names.json";


export const Hero = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const [value1, setValue1] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  

  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
    if (value) {
      const searchTerm = value.toLowerCase();
      const filteredSuggestions = data.data.filter(item => item.full_name.toLowerCase().startsWith(searchTerm) && item.full_name.toLowerCase() !== searchTerm);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const onChange1 = (event) => {
    const { value } = event.target;
    setValue1(value);
    if (value) {
      const searchTerm = value.toLowerCase();
      const filteredSuggestions = data.data.filter(item => item.full_name.toLowerCase().startsWith(searchTerm) && item.full_name.toLowerCase() !== searchTerm);
      setSuggestions1(filteredSuggestions);
    } else {
      setSuggestions1([]);
    }
  };


  const onSearch = (item) => {
    setValue(item.full_name);
    setSuggestions([]);
  };
  const onSearch1 = (item) => {
    setValue1(item.full_name);
    setSuggestions1([]);
  };



  return (
    <div className='hero-section'>
     <MDBCarousel showIndicators showControls fade dark>
      <MDBCarouselItem itemId={1}>
        <img src={myImage} className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
          <div className="carousal-text font">
          <h1 className='font-size'>WELCOME TO</h1>
         <h1 className='font-size color-text'>EVENTIFY</h1>
          </div>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2}>
        <img src={myImage1} className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
        <div className="carousal-text font">
          <h1 className='font-size'>WELCOME TO</h1>
         <h1 className='font-size color-text'>EVENTIFY</h1>
          </div>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src={myImage2} className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
        <div className="carousal-text font">
          <h1 className='font-size'>WELCOME TO</h1>
         <h1 className='font-size color-text'>EVENTIFY</h1>
          </div>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>
      <div className='flexCenter border-gradient box-shadow'>
        <div className='margin'>
          <form className="">
            <div className="search-container">
              <input
                type="text"
                name=""
                placeholder="Search"
                className="search-input font"
                value={value}
                onChange={onChange}
              />
              <div className="suggestions">
                {suggestions.map(item => (
                  <div key={item.id} onClick={() => onSearch(item)} className="suggestion-item">
                    {item.full_name}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className='margin'>
          <form className="">
            <div className="search-container">
              <input
                type="text"
                name=""
                placeholder="Search"
                className="search-input2"
                value={value1}
                onChange={onChange1}
              />
              <div className="suggestions2">
                {suggestions1.map(item => (
                  <div key={item.id} onClick={() => onSearch1(item)} className="suggestion-item2">
                    {item.full_name}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="margin">
          <button className='button font' value="button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
