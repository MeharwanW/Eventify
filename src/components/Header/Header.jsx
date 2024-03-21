
import Nav from "react-bootstrap/Nav";
import "./SearchBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Logo from "../Footer/images/logo.png";
import { Outlet, Link } from "react-router-dom";


const Header = () => {

  return (
    <section>
      <div className="d-flex justify-content-between navbar fixed-top navbar-scroll" activeKey="/home">
        <div className="">
          <span className="Logo">
            <img src={Logo} alt="" srcset="" />
          </span>
        </div>
        <div className="d-flex flexCenter">
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/Home">
              <Link to="Home" className="h-wrapper font">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" eventKey="/Venue">
              <Link to="Vanue" className="h-wrapper font">Venue</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" to="/Social Media">
              <Link to="SocialMedia" className="h-wrapper font">Social Media</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" to="/About">
              <Link to="About" className="h-wrapper font">About</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="h-wrapper" to="/Contact">
              <Link to="ContactUs" className="h-wrapper font">Contact Us</Link>
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
