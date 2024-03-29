import React from 'react'
import "../../App.css"
import mysvg from "./images/gpay.svg"
import mysvg1 from "./images/fb.png"
import mysvg2 from "./images/half.png"
import mysvg3 from "./images//star.png"
import mysvg4 from "./images/mastercard.svg"
import mysvg5 from "./images/cash.png"
import mysvg6 from "./images/insta.png"
import mysvg7 from "./images/twitter.svg"
import mysvg8 from "./images/paypal.svg"
import mysvg9 from "./images/apple.png"
import mysvg0 from "./images/visa.svg"
import mysvg11 from "./images/wp.gif"
import mysvg12 from "./images/logo.png"

const Footer = () => {
  return (
    <div className="footer font">
        <div className="">
          <div className="row">
            <div className="col-md">
            <div className="contact-item1 font">
              <h4 className=' bold-text'>Contact Us</h4>
              <p >Phone: 0348-8365045</p>
              <p >Email: Meharwanw@gmail.com</p>
              <div className="review-section">
                <br />
                <br />
                <p className='font'>Review us:</p>
                <img src={mysvg12} alt="Website Logo" /> 
                <div className="stars">
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg2} alt="Website Logo" />
                </div>
                
    
              </div>
            </div>
          </div>
    
          <div className="col-md">
            <div className="contact-item1 font">
              <h4 className='bold-text'>Find Us</h4>
              <p>Khudad Pilaza Near Station Road Sukkur Sindh</p>
              <div className="social-icons">
                <a href="https://www.facebook.com/">
                    <img src={mysvg1} alt="Facebook"/>
                </a>
                <a href="https://www.instagram.com">
                    <img src={mysvg6} alt="Instagram" />
                </a>
                <a href="https://twitter.com/">
                    <img src={mysvg7} alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
    
          <div className="col-md">
            <div className="contact-item1 font">
              <h4 className='bold-text'>Business Hours</h4>
              <p className='font'>Open 7-Days a week</p>
              <p className='font'>Mon-Sun: 1:00PM - 11:00AM</p>
              <div className="whatsapp-section">
                <a href="https://web.whatsapp.com/">
                    <img src={mysvg11} alt="WhatsApp" />
                </a>
                <span className='font'>WhatsApp us</span>
              </div>
            </div>
          </div>
         
          <div className="col-md">
            <div className="contact-item1 font">
              <h4 className='bold-text'>We Accept</h4>
              <div className="accept-logos">
    
                <img src={mysvg} alt="GPay" />
                <img src={mysvg8} alt="PayPal" />
                <img src={mysvg4} alt="Mastercard" />
              </div>
              <div className="accept-logos">
                <img src={mysvg0} alt="Visa" />
                <img src={mysvg9} alt="Apple" />
                <img src={mysvg5} alt="Cash" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Footer
