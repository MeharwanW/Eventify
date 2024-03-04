
import '../SignIn/login.css'
 import name from '../SignIn/user.svg'
import password from '../SignIn/lock.svg'
 

export const Login = () => {
  return (
    <div>
        <div className="container">
            <div className="header">
                <div className="text">Log In</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={name} alt="" />
                    <input type="text" placeholder='username' />
                </div>
                
                <div className="input">
                    <img src={password} alt="" />
                    <input type="password" placeholder='Password' />
                </div>
                <div className="forget-password">
                        Lost Password? <span>Click Here</span>
                    </div>
                
                <div className="submit-container">
                    <button className="submit">Submit</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

