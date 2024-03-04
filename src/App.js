import Home from "./components/Home/Home";
import "./App.css";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {SignUp}  from "./components/SignIn/SignUp";
import {Login}  from "./components/SignIn/Login";
import Header from "./components/Header/Header";




function App() {
 
  return (
    <div className="App">
     
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home/>}/>
          <Route path="Home" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
