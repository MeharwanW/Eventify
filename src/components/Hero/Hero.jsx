import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./Hero.css";
import myImage from '../../assets/wedding5.jpg';
import myImage1 from '../../assets/Meeting1.jpg';
import myImage2 from '../../assets//Party1.jpg';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import data from "../Header/full_names.json";
import galleryimg from "../../assets/wedding5.jpg"
import galleryimg1 from "../../assets/party3.jpg"

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
      <MDBCarousel fade interval={3000}>
        <MDBCarouselItem itemId={1}>
          <img src={myImage} className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <div className="carousal-text font font-size bold-text">
              <h1 className='bold-text'>WELCOME TO</h1>
              <h1 className='color-text'>EVENTIFY</h1>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={myImage1} className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <div className="carousal-text font font-size bold-text">
              <h1 className='bold-text'>WELCOME TO</h1>
              <h1 className='bold-text color-text'>EVENTIFY</h1>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src={myImage2} className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <div className="carousal-text font font-size bold-text">
              <h1 className='bold-text'>WELCOME TO</h1>
              <h1 className='bold-text color-text'>EVENTIFY</h1>
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
                placeholder="Catagory"
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
                placeholder="Location"
                className="search-input2 font"
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
      <div className='flexColCenter aboutSection font shadow-box'>
        <h1>ABOUT US</h1>
        <div className='aboutText'>
          <p className='font'>What sets Eventify apart is not just our expertise but also our unwavering commitment to integrity, trust, and passion for our craft. With us, you're not just a client; you're a valued partner in creating moments that will be cherished for a lifetime. Let us weave the threads of your imagination into an exquisite tapestry of moments, where each thread represents a memory etched in time. With Eventify by your side, your next event will be nothing short of extraordinary. Let's embark on this journey together and create magic that transcends boundaries.</p>
        </div>
      </div>
      <div className='flexColCenter gallerySection font shadow-box'>
        <h1>OUR GALLERY</h1>
        <div className='galleryDes flexenter'>
          <div className='galleryText '>
            <p className='font'>Introducing Eventify - where dreams become events and moments become memories. Nestled in the vibrant heart of Pakistan, Eventify stands as a beacon of excellence in the realm of event management. With a fusion of creativity, precision, and dedication, we craft experiences that transcend the ordinary, making every occasion an unforgettable journey..</p>
            <button className='button'>View Story</button>
          </div>
          
          <div className='galleryImg'> <img src={galleryimg} alt="" /></div>
          </div>
        
        <div className='galleryDes flexenter'>
          <div className='galleryImg'> <img src={galleryimg1} alt="" /></div>
          <div className='galleryText '>
            <p className='font'>Drawing from a rich tapestry of services, Eventify offers a comprehensive suite tailored to meet your unique needs. Our three-tier system, designed for efficiency and efficacy, streamlines the planning process, allowing us to deliver exceptional results within your desired timeframe and budget.</p>
            <button className='button'>View Story</button>
          </div>
        </div>
      </div>
      <div className='box'></div>
      </div>
      );
};

      export default Hero;
