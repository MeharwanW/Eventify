
import Nav from "react-bootstrap/Nav";
import "./SearchBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import Logo from "../Footer/images/logo.png";
import { Outlet, Link } from "react-router-dom";


const Header = () => {

  return (
    <section>
      <div className="justify-content-between navbar fixed-top navbar-scroll" activeKey="/home">
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
            <Nav.Link className="" eventKey="/Venue">
              <Link to="Venues" className="h-wrapper font">Venue</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="" to="/Social Media">
              <Link to="Suppliers" className="h-wrapper font">Suppliers</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="" to="/Social Media">
              <Link to="Media" className="h-wrapper font">Media</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="" to="/About">
              <Link to="About" className="h-wrapper font">About</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="" to="/Contact">
              <Link to="Contacts" className="h-wrapper font">Contact Us</Link>
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

 