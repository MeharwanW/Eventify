import React from 'react'
import "../../App.css"

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
                <img src="/images/logo.jpg" alt="Website Logo" /> 
                <div class="stars">
                    <img src='/images/star.png' alt="Website Logo" />
                    <img src="/images/star.png" alt="Website Logo" />
                    <img src="/images/star.png" alt="Website Logo" />
                    <img src="/images/star.png" alt="Website Logo" />
                    <img src="/images/half.png" alt="Website Logo" />
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
                    <img src="/images/fb.png" alt="Facebook"/>
                </a>
                <a href="https://www.instagram.com">
                    <img src="images/insta.png" alt="Instagram" />
                </a>
                <a href="https://twitter.com/">
                    <img src="images/twitter.svg" alt="Twitter" />
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
                    <img src="/images/wp.gif" alt="WhatsApp" />
                </a>
                <span>WhatsApp us</span>
              </div>
            </div>
          </div>
         
          <div class="col-md">
            <div class="contact-item1">
              <h2>We Accept</h2>
              <div class="accept-logos">
    
                <img src="images/gpay.svg" alt="GPay" />
                <img src="images/paypal.svg" alt="PayPal" />
                <img src="images/mastercard.svg" alt="Mastercard" />
              </div>
              <div class="accept-logos">
                <img src="images/visa.svg" alt="Visa" />
                <img src="images/apple.png" alt="Apple" />
                <img src="images/cash.png" alt="Cash" />
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
