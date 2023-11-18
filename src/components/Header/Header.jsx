import React from 'react';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css"
import Button from 'react-bootstrap/Button';
import "../../App.css"

const Header = () => {
    return (
        <section>
             <Nav className="justify-content-end h-menu" activeKey="/home">
             <Button variant="light">Login</Button>{' '}
        <Button variant="danger">Sign In</Button>{' '}
      </Nav>
     <Nav className="justify-content-end h-menu" activeKey="/home">
         <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/venue">Venue</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/suppliers">Suppliers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/Social Media">
            Social Media 
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/about">
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link eventKey="/contact">
           Contact Us 
          </Nav.Link>
        </Nav.Item> 
      </Nav>
     
        </section>
    );
}

export default Header;
