import Home from "./components/Home/Home";
import "./App.css";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {SignUp}  from "./components/SignIn/SignUp";
import {Login}  from "./components/SignIn/Login";
import Header from "./components/Header/Header";
import Venue from "./components/Venues/Venue";
import Media from "./components/Media/Media";
import Suppliers from "./components/Suppliers/Suppliers";
import Contacts from "./components/Contacts/Contacts";
import About from "./components/About/About";
import AdminHub from "./components/Profile/Adminhub";
import { useState , useEffect} from "react";
import Preloader from "./components/Preloader";
function App() {
  const [loaded, setLoaded] = useState(true);

    useEffect(() => {
      const handleLoad = () => {
        setLoaded(false);
      };
      
      window.addEventListener('load', handleLoad);
      setInterval(() => {
        setLoaded(false);
      }, 2000);
    }, []);
  return (
    <div className="App">
    
    {loaded ? <Preloader /> :
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home/>}/>
          <Route path="Home" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Venues" element={<Venue />} />
          <Route path="Media" element={<Media />} />
          <Route path="Contacts" element={<Contacts />} />
          <Route path="Suppliers" element={<Suppliers />} />
          <Route path="About" element={<About />} />
          <Route path="Dashboard" element={<AdminHub />} />
          
        </Route>
      </Routes>
      </BrowserRouter>
}
    </div>
  );
}

export default App;
