import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css"
import myImage from '../../assets/1.jpg';
import myImage1 from '../../assets/2.jpg';
import myImage2 from '../../assets/3.jpg';


export const Hero = () => {
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={myImage}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First Slide</h3>
        <p>Some description goes here</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={myImage1}
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Second Slide</h3>
        <p>Another description goes here</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={myImage2}
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Second Slide</h3>
        <p>Another description goes here</p>
      </Carousel.Caption>
    </Carousel.Item>

  </Carousel>
  );
};

export default Hero;
