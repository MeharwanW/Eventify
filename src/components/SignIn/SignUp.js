import React from 'react'
import './signUp.css'
import user from '../SignIn/user.svg'
import pass from '../SignIn/lock.svg'
import mail from '../SignIn/envelope.svg'
import phone from '../SignIn/phone.svg'
import { useNavigate, Link } from 'react-router-dom'
import {useState} from "react"
import axios from 'axios'



export const SignUp = () => {
  
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [CNIC, setCNIC] = useState("")
    const [userName, setUserName] = useState("")
    const [number, setNumber] = useState("")

    const navigate = useNavigate(); 

    async function submit(e) {
        e.preventDefault();
    
        if (!name || !email || !CNIC || !userName || !number || !password) {
            alert("Please fill in all fields");
            return;
        }
    
        const formData = { 
            client_name: name, 
            client_email: email, 
            client_cnic: CNIC, 
            client_username: userName,
            client_phone: number, 
            client_password: password 
        };
    
        try {
            const response = await axios.post('http://localhost:3000/SignUp', formData);
            console.log(response.data.message); // "User created successfully"
            // Handle success, e.g., redirect to login page

            if(response.data){
                navigate("/Login")
            }
            else{
                alert("User Already Exist")
            }
        } catch (error) {
            console.error("Error: ", error.message); // Log the error message
            alert("Failed to create user. Please try again."); // Show an error message to the user
        }
    }
    
  
  return (
    <>
        <div className="contains">
            <div className="headers shadow-box">
                <div className="text font">Sign Up</div>
                <div className="underline"></div>

        <form action="POST">
            <div className="inputs1 ">
                <div className="input1 ">
                    <img src={user} alt="" />
                    <input className='font' type="text" onChange={(e)=>{setName(e.target.value)}} placeholder='Name' />
                </div>
                <div className="input1 ">
                    <img src={mail} alt="" />
                    <input className='font' type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' />
                </div>
                <div className="input1 ">
                    <img src={user} alt="" />
                    <input className='font' type="text" onChange={(e)=>{setCNIC(e.target.value)}} placeholder='CNIC' />
                </div>
            

                
                <div className="input1 ">
                    <img src={user} alt="" />
                    <input className='font' type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder='Username' />
                </div>
                
                <div className="input1">
                    <img src={phone} alt="" />
                    <input className='font' type="tel" onChange={(e)=>{setNumber(e.target.value)}} placeholder='Phone Number' />
                </div>
            

        
                <div className="input1 col col-sm-12 col-md-12 col-lg-12">
                    <img src={pass} alt="" />
                    <input className='font' type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' />
                </div>
            
            <div className="submit-container1">
                    <button className="button" onClick={submit}>Submit</button>
                </div>
                
            </div>
        </form>

        <Link to="/Login">
        <div className="forget-password">
                       <span className='font '>Already Registered?
                        </span> <span className='font color-text'>Login</span>
                    </div>
        
        </Link>
            </div>
        </div>
    </>
  )
}


