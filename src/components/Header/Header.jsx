import React from 'react';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css"
import Button from 'react-bootstrap/Button';
import "../../App.css"
import Logo from "../Footer/images/logo.png";

const Header = () => {
    return (
        <section>    
             
     <div className="d-flex justify-content-between h-menu navbar" activeKey="/home">
       <div>
       <span className='Logo'>
        <img src={Logo} alt="" srcset="" />
       </span>
       </div>
        <div className='d-flex h-menu Nav-s'>
        <Nav.Item>
          <Nav.Link className='h-wrapper' href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='h-wrapper' eventKey="/venue">Venue</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='h-wrapper' eventKey="/suppliers">Suppliers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='h-wrapper' eventKey="/Social Media">
            Social Media 
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='h-wrapper' eventKey="/about">
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link className='h-wrapper' eventKey="/contact">
           Contact Us 
          </Nav.Link>
        </Nav.Item>
        </div>
        <div className=' h-menu '>
        <Button variant="light btn-lg">Login</Button>{' '}
        <Button variant="danger">Sign In</Button>{' '}
        </div>
      </div>
      
        </section>
    );
}

export default Header;
