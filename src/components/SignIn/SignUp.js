import React, { useState } from 'react';
import './signUp.css';
import user from '../SignIn/user.svg';
import pass from '../SignIn/lock.svg';
import mail from '../SignIn/envelope.svg';
import dial from '../SignIn/phone.svg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
                await axios.post("http://localhost:3000/signup", {
                name,
                email,
                userName,
                password,
                phone,
                accountType
            }).then(res =>{
 
                console.log("response form then signup ",res)

                if (res.data.status) {
                    alert("User created")
                    navigate('/Login');
                    
                   
                } else {
                    alert('User already exists or there was an error creating your account.');            
                   
                   
                }
            }).catch(err =>{
                console.log("Error inside await post post signup",err)
            })
        } 
        catch (error) {
            alert('Failed to register. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="contains">
            <div className="headers shadow-box">
                <div className="text font">Sign Up</div>
                <div className="underline"></div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs1 ">
                        <div className="input1 ">
                            <img src={user} alt="" />
                            <input className='font' type="text" onChange={(e) => setName(e.target.value)} placeholder='Name' />
                        </div>
                        <div className="input1 ">
                            <img src={mail} alt="" />
                            <input className='font' type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                        </div>
                        
                        <div className="input1 ">
                            <img src={user} alt="" />
                            <input className='font' type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Username' />
                        </div>
                        
                        <div className="input1 col col-sm-12 col-md-12 col-lg-12">
                            <img src={pass} alt="" />
                            <input className='font' type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                        </div>
                        <div className="input1">
                            <img src={dial} alt="" />
                            <input className='font' type="tel" onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' />
                        </div>
                        <div className="">
                            <Form.Select onChange={(e) => setAccountType(e.target.value)} className="font input1">
                                <option value="">Select Account Type</option>
                                <option value="client">Client</option>
                                <option value="organizer">Organizer</option>
                            </Form.Select>
                        </div>
                        <div className="submit-container1">
                            <button className="button" type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
                <Link to="/login">
                    <div className="forget-password">
                        <span className='font '>Already Registered?</span> <span className='font color-text'>Login</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};
