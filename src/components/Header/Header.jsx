import React from "react";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import Button from "react-bootstrap/Button";
import "../../App.css";
import Logo from "../Footer/images/logo.png";
import {Login} from '../SignIn/Login.js';
import {SignUp} from '../SignIn/SignUp.js';
import { BrowserRouter as Router, Route, Link , Routes } from 'react-router-dom';

const Header = () => {
 
  return (
    <Router>
    <section>
      <div
        className="d-flex justify-content-between h-menu navbar"
        activeKey="/home"
      >
        <div>
          <span className="Logo">
            <img src={Logo} alt="" srcset="" />
          </span>
        </div>
        <div className="d-flex">
          <Nav.Item>
            <Nav.Link className="h-wrapper" href="/home">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/venue">
              Venue
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/suppliers">
              Suppliers
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/Social Media">
              Social Media
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/about">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/contact">
              Contact Us
            </Nav.Link>
          </Nav.Item>
        </div>
        <div className="h-menu">
         <Link to="login">
         <Button variant="light">
            Login
          </Button>{" "}
         </Link> 
         <Link  to="signin">
          <Button variant="danger">
            Sign In
          </Button>{" "}
         </Link>

        
      
        </div>
      </div>
      <Routes>
      <Route path="login" element={<Login/>} />
        <Route path="signin" element={<SignUp />} />
      </Routes>
        
    </section>
    </Router>
  );
};

export default Header;
