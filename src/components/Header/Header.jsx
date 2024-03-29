
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
import mediaSvg1 from"../../assets/media.svg";
 import supplierSvg1 from"../../assets/supplier.svg";


import React from 'react';


const Header = () => {

  return (
    <section>
      <div className=" justify-content-between navbar fixed-top navbar-scroll" activeKey="/home">
        <div className="">
          <div className="Logo">
            <img className="svgImg" src={Logo} alt="" srcset="" />
          </div>
        </div>
        <div className="d-flex linkSection justify-content-around">
          <Nav.Item>
            <Nav.Link className="links" eventKey="/Home">
            <div className="flexColCenter">
              <img className="svgImg flexColCenter"  src={homeSvg1} alt="" srcset="" />
              <Link to="Home" className="LinksInfo font">Home</Link>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" eventKey="/Venue">
            <div className="flexColCenter">
            <img className="svgImg " src={venueSvg1} alt="" srcset="" />
              <Link to="Venues" className="LinksInfo font">Venue</Link>
            </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/Suppliers">
            <div className="flexColCenter">
            <img className="svgImg " src={supplierSvg1} alt="" srcset="" />
              <Link to="Suppliers" className="LinksInfo font">Suppliers</Link>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/Social Media">
            <div className="flexColCenter">
            <img className="svgImg " src={mediaSvg1} alt="" srcset="" />
              <Link to="Media" className="LinksInfo font">Media</Link>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/About">
            <div className="flexColCenter">
            <img className="svgImg " src={aboutSvg1} alt="" srcset="" />
              <Link to="About" className="LinksInfo font">About</Link>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="links" to="/Contact">
            <div className="flexColCenter">
            <img className="svgImg " src={contactSvg1} alt="" srcset="" />
              <Link to="Contacts" className="LinksInfo font">Contact Us</Link>
              </div>
            </Nav.Link>
          </Nav.Item>
        </div>
        <div className="">
          <Link to="/Login" className="font"><button className="button" variant="" >
            Login
          </button>{""}</Link>
          <Link to="SignUp" className="font link"><button className="button" variant="">
            Sign Up
          </button>{""}</Link>
        </div>
      </div>
      <Outlet />
    </section>
  );
};
export default Header;

 