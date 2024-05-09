
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./Hero.css";
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import assets from '../../assets/assets';

export const Hero = () => {


  return (
    <div className='hero-section'>
      <MDBCarousel fade interval={3000}>
        <MDBCarouselItem itemId={1}>
          <img src={assets.wedding} className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <div className="carousal-text font font-size bold-text">
              <h1 className='bold-text'>WELCOME TO</h1>
              <h1 className='color-text bold-text'>EVENTIFY</h1>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={assets.meeting1} className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <div className="carousal-text font font-size bold-text">
              <h1 className='bold-text'>WELCOME TO</h1>
              <h1 className='color-text bold-text'>EVENTIFY</h1>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src={assets.party1} className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <div className="carousal-text font font-size bold-text">
              <h1 className='bold-text'>WELCOME TO</h1>
              <h1 className='color-text bold-text'>EVENTIFY</h1>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
      
     
      <div className='flexColCenter gallerySection font shadow-box'>
        <h1>OUR GALLERY</h1>
        <div className='galleryDes flexenter'>
          <div className='galleryText '>
            <p className='font'>Introducing Eventify - where dreams become events and moments become memories. Nestled in the vibrant heart of Pakistan, Eventify stands as a beacon of excellence in the realm of event management. With a fusion of creativity, precision, and dedication, we craft experiences that transcend the ordinary, making every occasion an unforgettable journey..</p>
            <button className='button'>View Story</button>
          </div>
          
          <div className='galleryImg'> <img src={assets.wedding} alt="" /></div>
          </div>
        
        <div className='galleryDes flexenter'>
          <div className='galleryImg'> <img src={assets.party3} alt="" /></div>
          <div className='galleryText '>
            <p className='font'>Drawing from a rich tapestry of services, Eventify offers a comprehensive suite tailored to meet your unique needs. Our three-tier system, designed for efficiency and efficacy, streamlines the planning process, allowing us to deliver exceptional results within your desired timeframe and budget.</p>
            <button className='button'>View Story</button>
          </div>
        </div>
      </div>
      <div className='flexColCenter aboutSection font'>
        <h1>ABOUT US</h1>
        <div className='aboutText'>
          <p className='font'>What sets Eventify apart is not just our expertise but also our unwavering commitment to integrity, trust, and passion for our craft. With us, you're not just a client; you're a valued partner in creating moments that will be cherished for a lifetime. Let us weave the threads of your imagination into an exquisite tapestry of moments, where each thread represents a memory etched in time. With Eventify by your side, your next event will be nothing short of extraordinary. Let's embark on this journey together and create magic that transcends boundaries.</p>
        </div>
      </div>
      <div className='box'></div>
      </div>
      );
};

      export default Hero;
