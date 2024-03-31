import React from 'react'
import './signUp.css'
import name from '../SignIn/user.svg'
import password from '../SignIn/lock.svg'
import email from '../SignIn/envelope.svg'
import phone from '../SignIn/phone.svg'

export const SignUp = () => {
  return (
    <>
        <div className="contains">
            <div className="headers shadow-box">
                <div className="text font">Sign Up</div>
                <div className="underline"></div>

        <form action="">
            <div className="inputs1 ">
                <div className="input1 ">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='Name' />
                </div>
                <div className="input1 ">
                    <img src={email} alt="" />
                    <input className='font' type="email" placeholder='Email' />
                </div>
                <div className="input1 ">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='CNIC' />
                </div>
            

                
                <div className="input1 ">
                    <img src={name} alt="" />
                    <input className='font' type="text" placeholder='Username' />
                </div>
                
                <div className="input1">
                    <img src={phone} alt="" />
                    <input className='font' type="tel" placeholder='Phone Number' />
                </div>
            

                   
                <div className="input1 col col-sm-12 col-md-12 col-lg-12">
                    <img src={password} alt="" />
                    <input className='font' type="password" placeholder='Password' />
                </div>
            
            <div className="submit-container1">
                    <button className="button">Submit</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </>
  )
}


