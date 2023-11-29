import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css"
import myImage from '../../assets/1.jpg';
import myImage1 from '../../assets/2.jpg';
import myImage2 from '../../assets/3.jpg';


export const Hero = () => {
  return (
    <Carousel className="">
    <Carousel.Item>
      <img
        className=""
        src={myImage}
        alt="First slide"
      />
     
    </Carousel.Item>

    <Carousel.Item>
      <img
        className=""
        src={myImage1}
        alt="Second slide"
      />
      
    </Carousel.Item>

    <Carousel.Item>
      <img
        className=""
        src={myImage2}
        alt="Second slide"
      />
    </Carousel.Item>

  </Carousel>
  );
};

export default Hero;
