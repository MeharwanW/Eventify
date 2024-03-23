
import '../SignIn/login.css'
import name from '../SignIn/user.svg'
import password from '../SignIn/lock.svg'
 

export const Login = () => {
  return (
    <div>
        <div className="contain">
          
            <div className="header shadow-box">
                <h2 className="text font">Log In</h2>
                <div className="underline"></div>
            
            <div className="inputs">
                <div className="input">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='Username' />
                </div>
                <div className="input">
                    <img src={password} alt="" />
                    <input  className='font' type="password" placeholder='Password' />
                </div>
                <div className="forget-password">
                       <span className='font'>Forget Password?
                        </span> <span className='font color-text'>Click Here</span>
                    </div>
                <div className="submit-container">
                    <button className="button">Login</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

