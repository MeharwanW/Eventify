import React from 'react'
import '../SignIn/signUp.css'

import name from '../SignIn/user.svg'
import password from '../SignIn/lock.svg'
import email from '../SignIn/envelope.svg'
import phone from '../SignIn/phone.svg'

export const SignUp = () => {
  return (
    <>
        <div className="container">

            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>

            <div className="inputs row">
                <div className="input col col-sm-12 col-md-4 col-lg-4">
                    <img src={name} alt="" />
                    <input type="text" placeholder='Name' />
                </div>
                <div className="input col col-sm-12 col-md-4 col-lg-4">
                    <img src={email} alt="" />
                    <input type="email" placeholder='Email' />
                </div>
                <div className="input col col-sm-12 col-md-4 col-lg-4">
                    <img src={name} alt="" />
                    <input type="text" placeholder='CNIC' />
                </div>
            </div>

                
            <div className="inputs row">
                <div className="input col col-sm-12 col-md-6 col-lg-6">
                    <img src={name} alt="" />
                    <input type="text" placeholder='Username' />
                </div>
                
                <div className="input col col-sm-12 col-md-6 col-lg-6">
                    <img src={phone} alt="" />
                    <input type="number" placeholder='Phone Number' />
                </div>
            </div>

            <div className="inputs row">        
                <div className="input col col-sm-12 col-md-12 col-lg-12">
                    <img src={password} alt="" />
                    <input type="password" placeholder='Password' />
                </div>
            </div>
            <div className="submit-container">
                    <button className="submit">Submit</button>
                </div>

        </div>
    </>
  )
}


