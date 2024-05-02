import './login.css'
import user from '../SignIn/user.svg'
import pass from '../SignIn/lock.svg'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import React, {useState} from "react"

export const Login = () => {
    
    
    const [client_username, setUserName] = useState("")
    const [client_password, setPassword] = useState("")

    const navigate = useNavigate(); 

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:3000/Login",{
                client_username,client_password
            })
            .then(res=>{
                if(res.data){
                    navigate('/dashboard');
                }
                else {
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        }
        catch{
            console.log(e)
        }
    }

  return (
        <div className="contain">
            <div className="header shadow-box">
                <h2 className="text font">Log In</h2>
                <div className="underline"></div>
            
         <form onSubmit>
            <div className="inputs flexColCenter">
                <div className="input">
                    <img src={user} alt="" />
                    <input className='font' type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder='Username' />
                    </div>
                <div className="input">
                    <img src={pass} alt="" />
                    <input  className='font'   type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' />
                </div>
               
                <div className="submit-container">
                    <button type='submit' className="button" onClick={submit} >Login</button>
                </div>
                <div className="forget-password">
                       <span className='font'>Forget Password?
                        </span> <span className='font color-text'>Click Here</span>
                    </div>
                    <div className='CreateAcc'>
                    <Link to="/SignUp">
                    <div className="flexCenter">
                    <button  className="button font">Create new account</button>
                 </div>
                    </Link>
                    </div>
                    
            </div>
            

            </form>   
        </div>
      </div>
  )

  }
