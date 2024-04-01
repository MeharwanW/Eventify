import React, { useState } from 'react';
import "./contact.css";
import logo from "../../assets/logo3.png";

export default function Contacts() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "daaf22a7-90d9-4c8d-9e6f-a3c513c00856");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setIsEmailSent(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <div className='contactScreen flexCenter'>
      <div className='flexCenter contactBox shadow-box'>
        <div className='contactLogo flexCenter'>
          <img src={logo} alt="" />
        </div>
        <div className='contactForum flexColCenter'>
          <form onSubmit={onSubmit} className='contact flexColCenter'>
            <div className='contact-title'>
              <h2 className='font color-text'>Say Hello</h2>
              <hr/>
            </div>
            <input type="text" name="name" placeholder='Name' className="contact-inputs font" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="email" name="email" placeholder='Email' className="contact-inputs font" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <textarea name="message" placeholder='Type Your Message Here!' className='contact-inputs font' required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
            <button type="submit" className='button'>Submit</button>
          </form>
          {isEmailSent && (
            <div className="dialog-overlay">
              <div className="dialog-content">
                <p>Email sent!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
