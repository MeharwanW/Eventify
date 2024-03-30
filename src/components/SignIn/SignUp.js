import React from 'react'
import './signUp.css'
import name from '../SignIn/user.svg'
import password from '../SignIn/lock.svg'
import email from '../SignIn/envelope.svg'
import phone from '../SignIn/phone.svg'

export const SignUp = () => {
  return (
    <>
        <div className="contain">
            <div className="header shadow-box">
                <div className="text font">Sign Up</div>
                <div className="underline"></div>

            <div className="inputs row">
                <div className="input col col-sm-12 col-md-4 col-lg-4">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='Name' />
                </div>
                <div className="input col col-sm-12 col-md-4 col-lg-4">
                    <img src={email} alt="" />
                    <input className='font' type="email" placeholder='Email' />
                </div>
                <div className="input col col-sm-12 col-md-4 col-lg-4">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='CNIC' />
                </div>
            </div>

                
            <div className="inputs row">
                <div className="input col col-sm-12 col-md-6 col-lg-6">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='Username' />
                </div>
                
                <div className="input col col-sm-12 col-md-6 col-lg-6">
                    <img src={phone} alt="" />
                    <input className='font' type="tel" placeholder='Phone Number' />
                </div>
            </div>

            <div className="inputs row">        
                <div className="input col col-sm-12 col-md-12 col-lg-12">
                    <img src={password} alt="" />
                    <input className='font' type="password" placeholder='Password' />
                </div>
            </div>
            <div className="submit-container">
                    <button className="button">Submit</button>
                </div>

            </div>
        </div>
    </>
  )
}


