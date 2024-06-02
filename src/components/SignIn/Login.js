import './login.css'
import user from '../SignIn/user.svg'
import pass from '../SignIn/lock.svg'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import {useEffect, useState } from "react"


export const Login = (props) => {

    const [client_username, setUserName] = useState("") 
    const [client_password, setPassword] = useState("")


    const navigate = useNavigate();
    
  
    // useEffect(() => {
    //     console.log("here");

    //     // Use a flag to prevent multiple navigations
    //     let didNavigate = false;

    //     if (window.localStorage.getItem('adminToken') && !didNavigate) {
    //         didNavigate = true;
    //         navigate('/dashboard');
    //     } else if (window.localStorage.getItem('clientToken') && !didNavigate) {
    //         didNavigate = true;
    //         navigate('/home');
    //     }
    // }, []);
    //axios.defaults.withCredentials = true; 

    async function submit(e)
    {

        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:4000/login", {
                client_username,
                client_password
            });
    
            if (response.data) {

                // console.log("returned token ",response.data.token)

                const authToken=response.data.token;
                props.login()
                if(response.data.userType==="organizer"){
                localStorage.setItem("adminToken",authToken)
                localStorage.setItem('currentOrganizer', response.data.userData);
                    navigate('/dashboard');
                }
                else if(response.data.userType==="client"){
                    localStorage.setItem("clientToken",authToken)
                    localStorage.setItem('currentClient', response.data.userData);
                    navigate('/home');
                }
                // Pass userData to the dashboard component
                

                
            
            } else {
                alert("User does not exist or wrong password");
                
               
            }

        } catch (error) {
            alert("Failed to login. Please try again later.");
            console.error("Error logging in:", error);
            
        }
    }


    return (
        <div className="contain">
           
            <div className="header shadow-box">
                <h2 className="text font">Log In</h2>
                <div className="underline"></div>

                <form onSubmit={submit}>
                    <div className="inputs flexColCenter">
                        <div className="input">
                            <img src={user} alt="" />
                            <input className='font' type="text" onChange={(e) => { setUserName(e.target.value) }} placeholder='Username' />
                        </div>
                        <div className="input">
                            <img src={pass} alt="" />
                            <input className='font' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
                        </div>

                        <div className="submit-container">
                            <button type='submit' className="button">Login</button>
                        </div>
                        <div className="forget-password">
                            <span className='font'>Forget Password?
                            </span> <span className='font color-text'>Click Here</span>
                        </div>
                        <div className='CreateAcc'>
                            <Link to="/signup">
                                <div className="flexCenter">
                                    <button className="button font">Create new account</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
           
        </div>
    )
}


// try{
        //     await axios.post("http://localhost:3000/Login",{
        //         client_username,client_password
        //     })
        //     .then(res=>{
                
        //         if(res.data.status){

        //             navigate('/home')
        //             const {organizer_username, organizer_phone} = res.data;
        //             console.log(organizer_username, organizer_phone)
                    
        //             //const user = res.data.user;

        //             // if (user.user_type === 'organizer') {
        //             //     // RedirectSS to organizer dashboard
        //             //     navigate('/Dashboard', { state: { user } });
        //             // } else if (user.user_type === 'client') {
        //             //     // Redirect to client home
        //             //     navigate('/home', { state: { user } });
        //             // }
        //             // if (res.data.user.user_type === 'organizer') {

        //             //     console.log("user from org login",res.data.user)
        //             //     // navigate('/Dashboard', { state: { user: res.data.user } });
        //             //     navigate('/dashboard')
                         
        //             // } else {
        //             //     console.log("user from client login",res.data.user)
        //             //     navigate('/home');
        //             // }
        //         }
        //         else {
        //             alert("User have not sign up")
        //         }
        //     })
        //     .catch(e=>{
        //         alert("wrong details")
        //         console.log(e);
        //     })
        // }
        // catch{
        //     console.log(e)
        // }
