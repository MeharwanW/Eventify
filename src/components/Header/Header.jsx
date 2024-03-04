import React, { useState } from "react";
import svg from "../../assets/search.svg";
import Nav from "react-bootstrap/Nav";
import "./SearchBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Logo from "../Footer/images/logo.png";
import { Outlet, Link } from "react-router-dom";
var data = require("./full_names.json");

const Header = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
    if (value) {
      const searchTerm = value.toLowerCase();
      const filteredSuggestions = data.data.filter(item => item.full_name.toLowerCase().startsWith(searchTerm) && item.full_name.toLowerCase() !== searchTerm);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const onSearch = (item) => {
    setValue(item.full_name);
    setSuggestions([]);
  };
  return (
    <section>
      <div className="d-flex justify-content-between h-menu navbar color" activeKey="/home">
        <div>
          <span className="Logo">
            <img src={Logo} alt="" srcset="" />
          </span>
        </div>
        <div className="d-flex">
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/Home">
              <Link to="Home" className="h-wrapper">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/Venue">
              <Link to="Vanue" className="h-wrapper">Venue</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" to="/Social Media">
              <Link to="SocialMedia" className="h-wrapper">Social Media</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" to="/About">
              <Link to="About" className="h-wrapper">About</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" to="/Contact">
              <Link to="ContactUs" className="h-wrapper">Contact Us</Link>
            </Nav.Link>
          </Nav.Item>
        </div>
        <form className="">
            <div className="search-container">
              <input
                type="text"
                name=""
                placeholder="Search"
                className="search-input"
                value={value}
                onChange={onChange}
              />
              <div className="suggestions">
                {suggestions.map(item => (
                  <div key={item.id} onClick={() => onSearch(item)} className="suggestion-item">
                    {item.full_name}
                  </div>
                ))}
              </div>
            </div>
          </form>

        <div className="h-menu">
          <Link to="/Login" className="link"><Button className="link button" variant="danger" >
            Login
          </Button>{" "}</Link>
          <Link to="SignUp" className="link"><Button className="link button" variant="danger">
            Sign Up
          </Button>{" "}</Link>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default Header;
