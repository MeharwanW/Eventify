import './login.css'
import name from '../SignIn/user.svg'
import password from '../SignIn/lock.svg'
import { Link } from 'react-router-dom'


export const Login = () => {
   
  
  return (
        <div className="contain">
            <div className="header shadow-box">
                <h2 className="text font">Log In</h2>
                <div className="underline"></div>
            
         <form onSubmit>
            <div className="inputs flexColCenter">
                <div className="input">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='Username' />
                    </div>
                <div className="input">
                    <img src={password} alt="" />
                    <input  className='font'   type="password" placeholder='Password' />
                </div>
               
                <div className="submit-container">
                    <button type='submit' className="button">Login</button>
                </div>
                <div className="forget-password">
                       <span className='font'>Forget Password?
                        </span> <span className='font color-text'>Click Here</span>
                    </div>
                    <Link to="/SignUp">
                    <div className="submit-container">
                    <button  className="button font">Create new account</button>
                </div>
                </Link>
            </div>
            

            </form>   
        </div>
      </div>
  )

  }
