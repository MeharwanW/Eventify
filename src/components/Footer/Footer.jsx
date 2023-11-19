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
    <div class="footer">
        <div class="container">
          <div class="row">
            <div class="col-md">
            <div class="contact-item1">
              <h2>Contact Us</h2>
           
              <p>Phone: 0348-8365045</p>
              <p>Email: Meharwanw@gmail.com</p>
              <div class="review-section">
                <br />
                <br />
                <p>Review us:</p>
                <img src={mysvg12} alt="Website Logo" /> 
                <div class="stars">
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg3} alt="Website Logo" />
                    <img src={mysvg2} alt="Website Logo" />
                </div>
                
    
              </div>
            </div>
          </div>
    
          <div class="col-md">
            <div class="contact-item1">
              <h2>Find Us</h2>
              <p>Khudad Pilaza Near Station Road Sukkur Sindh</p>
              <div class="social-icons">
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
    
          <div class="col-md">
            <div class="contact-item1">
              <h2>Business Hours</h2>
              <p>Open 7-Days a week</p>
              <p>Mon-Sun: 1:00PM - 11:00AM</p>
              <div class="whatsapp-section">
                <a href="https://web.whatsapp.com/">
                    <img src={mysvg11} alt="WhatsApp" />
                </a>
                <span>WhatsApp us</span>
              </div>
            </div>
          </div>
         
          <div class="col-md">
            <div class="contact-item1">
              <h2>We Accept</h2>
              <div class="accept-logos">
    
                <img src={mysvg} alt="GPay" />
                <img src={mysvg8} alt="PayPal" />
                <img src={mysvg4} alt="Mastercard" />
              </div>
              <div class="accept-logos">
                <img src={mysvg0} alt="Visa" />
                <img src={mysvg9} alt="Apple" />
                <img src={mysvg5} alt="Cash" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="copyright">
        <p> 
          <a href="#">Terms of Use</a> | 
          <a href="#">Privacy & Cookies Policy</a> | 
          <a href="#">Trading Terms</a> | 
          <a href="#">Powered by Eventify</a>
        </p>
        <p>&copy;2023. The Content on this website is owned by us and our licensors. Do not copy any content.</p>
      </div>
    </div>

  )
}

export default Footer
