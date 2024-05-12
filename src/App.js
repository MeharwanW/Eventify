import Home from "./components/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./components/SignIn/SignUp";
import { Login } from "./components/SignIn/Login";
import Header from "./components/Header/Header";
import Venue from "./components/Venues/Venue";
import Media from "./components/Media/Media";
import Suppliers from "./components/Suppliers/Suppliers";
import Contacts from "./components/Contacts/Contacts";
import About from "./components/About/About";
import AdminHub from "./components/Profile/Adminhub";
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import  Booking  from "./components/BookingEvent/Booking";

function App() {
  const [loaded, setLoaded] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    const handleLoad = () => {
      setLoaded(false);
    };

    window.addEventListener("load", handleLoad);
    setInterval(() => {
      setLoaded(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {loaded ? (
        <Preloader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Header
                  login={authHandler}
                  isLoggedIn={isLoggedIn}
                />
              }
            >
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login login={authHandler} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/venues" element={<Venue />} />
              <Route path="/media" element={<Media />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/booking"
                element={
                  isLoggedIn ? <Booking />  :  <Navigate to="/login" />
                }
              />
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? <AdminHub /> : <Navigate to="/login" />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
