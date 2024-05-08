
import Nav from "react-bootstrap/Nav";
import "./SearchBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import Logo from "../../assets/logo2.png";
import { Outlet, Link } from "react-router-dom";
import venueSvg1 from "../../assets/Venue.svg";
import aboutSvg1 from "../../assets/about.svg";
import homeSvg1 from "../../assets/home.svg";
import contactSvg1 from "../../assets/contact.svg";
import mediaSvg1 from "../../assets/media.svg";
import supplierSvg1 from "../../assets/supplier.svg";
import { useState } from 'react';
import { BiLogInCircle } from "react-icons/bi";
import { VscSignIn } from "react-icons/vsc";


import React from 'react';


const Header = ({isLoggedIn}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  
  
  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  });
 
  return (
    <section>
      
    
      <div className="justify-content-between navbar fixed-top" activeKey="/home">
        <div className="Logo1">
          <Link to="Home" >
            <div className="Logo">
              <img className="svgImg" src={Logo} alt="" srcSet="" />
            </div>
          </Link>
        </div>
        {!showMenu && windowWidth >= 953 && (<div className={`d-flex linkSection justify-content-around ${showMenu ? 'hide' : ''}`}>
          <NavItems />
        </div>
        )}
        
        {!showMenu && windowWidth > 952 &&(<div className="buttons">
          <Link to="/Login" className="font"><button className="button" variant="">
            Login
          </button></Link>
          <Link to="/SignUp" className="font link"><button className="button" variant="">
            Sign Up 
          </button></Link> 
        </div>)}
        
      {windowWidth <953 && (<div className={`dropdown-menu ${showMenu ? 'show' : ''}`}>
          <div onClick={() => setShowMenu(!showMenu)}><NavItems /></div>
        </div>)}
        {windowWidth <953 &&(<div className="icon font" onClick={() => setShowMenu(!showMenu)}>&#9776;Menu</div>)}
      </div>
      
      
     
      { <Outlet />}
    </section>
  );
}

function NavItems({isLoggedIn}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log("NavItemsssss",isLoggedIn)
  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <>
      <Nav.Item>
        <Nav.Link className="links" eventKey="/Home">
          <Link to="Home">
            <div className="flexColCenter">
              <img className="svgImg flexColCenter" src={homeSvg1} alt="" srcSet="" />
              <div className="LinksInfo font">Home</div>
            </div>
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
            <Nav.Link className="links" eventKey="/Venue">
              <Link to="Venues">
                <div className="flexColCenter">
                  <img className="svgImg flexColCenter" src={venueSvg1} alt="" srcset="" />
                  <div className="LinksInfo font">Venue</div>
                </div>
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/Suppliers">
              <Link to="Suppliers">
                <div className="flexColCenter">
                  <img className="svgImg flexColCenter" src={supplierSvg1} alt="" srcset="" />
                  <div className="LinksInfo font">Supplier</div>
                </div>
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/Social Media">
              <Link to="Media">
                <div className="flexColCenter">
                  <img className="svgImg flexColCenter" src={mediaSvg1} alt="" srcset="" />
                  <div className="LinksInfo font">Media</div>
                </div>
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/About">
              <Link to="About">
                <div className="flexColCenter">
                  <img className="svgImg flexColCenter" src={aboutSvg1} alt="" srcset="" />
                  <div className="LinksInfo font">About</div>
                </div>
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/Contact">
              <Link to="Contacts">
                <div className="flexColCenter">
                  <img className="svgImg flexColCenter" src={contactSvg1} alt="" srcset="" />
                  <div className="LinksInfo font">Contact</div>
                </div>
              </Link>
            </Nav.Link>
          </Nav.Item>
      {windowWidth < 953 && !isLoggedIn && (
        <Nav.Item>
          <Nav.Link className="links" to="/SignUp">
            <Link to="SignUp">
              <div className="flexColCenter">
                <BiLogInCircle />
                <div className="LinksInfo font">SignUp</div>
              </div>
            </Link>
          </Nav.Link>
        </Nav.Item>
      )}
      {windowWidth < 953 && !isLoggedIn && (
        <Nav.Item>
          <Nav.Link className="links" to="/login">
            <Link to="Login">
              <div className="flexColCenter">
                <VscSignIn />
                <div className="LinksInfo font">Login</div>
              </div>
            </Link>
          </Nav.Link>
        </Nav.Item>
      )}

      {/* Logout button */}
      {windowWidth < 953 && isLoggedIn && (
        <Nav.Item>
          <Nav.Link className="links" to="/logout">
            <Link to="logout">
              <div className="flexColCenter">
                <button className="button">Logout</button>
                <div className="LinksInfo font">Logout</div>
              </div>
            </Link>
          </Nav.Link>
        </Nav.Item>
      )}
    </>
  );
}

export default Header;

