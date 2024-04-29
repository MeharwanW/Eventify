import React, { useState } from "react";
import "./Booking.css";

export const Booking = () => {
  
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        eventDate: "",
      });
      const [confirmation, setConfirmation] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can add your booking logic here
        setConfirmation(`Thank you, ${formData.fullName}! Your event on ${formData.eventDate} has been booked.`);
      };
    return (

    <div className="container">
      <h1>Event Booking</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="eventDate">Event Date:</label>
        <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
        <button type="submit button">Book Now</button>
      </form>
      {confirmation && <div id="confirmation">{confirmation}</div>}
    </div>
  );
};


