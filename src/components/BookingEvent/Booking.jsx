import React, { useState } from "react";
import "./Booking.css";

export const Booking = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        event: "",
        eventDate: "",
        eventTime: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        cameraman: false,
        decoration: false,
        chairsPrize: 0,
        termsAgreed: false,
    });
    const [confirmation, setConfirmation] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== "termsAgreed") {
                formErrors[key] = "This field is required.";
            }
        });

        if (Object.keys(formErrors).length === 0) {
            // Calculate total prize
            let totalPrize = 0;
            if (formData.cameraman) totalPrize += 25000;
            if (formData.decoration) totalPrize += 40000;
            totalPrize += parseInt(formData.chairsPrize);

            // Form submission logic here
            setConfirmation(`Thank you, ${formData.fullName}! Your event on ${formData.eventDate} has been booked. Total prize: ${totalPrize}`);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="flexCenter font">
            <form onSubmit={handleSubmit} className="headers">
                <h1 className="text">Booking Agreement</h1>
                <p>Complete form below to retain the services of an Event</p>
                <br />
                <div>For Direct Inquiries contact Meharwanw@gmail.com or call (03488365045)</div>
                <br />
                <label htmlFor="event">Event:</label>
                <select id="event" name="event" value={formData.event} onChange={handleChange} required>
                    <option value="">Select Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Party">Party</option>
                    <option value="Reception">Reception</option>
                </select>
                {errors.event && <div className="error">{errors.event}</div>}
                <br />
                <label htmlFor="eventDate">Event Date & Time:</label>
                <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                <input type="time" id="eventTime" name="eventTime" value={formData.eventTime} onChange={handleChange} required />
                {errors.eventDate && <div className="error">{errors.eventDate}</div>}
                {errors.eventTime && <div className="error">{errors.eventTime}</div>}
                <br />
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                {errors.city && <div className="error">{errors.city}</div>}
                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
                {errors.state && <div className="error">{errors.state}</div>}
                <label htmlFor="zipCode">Zip Code:</label>
                <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                {errors.zipCode && <div className="error">{errors.zipCode}</div>}
                <br />
                <label>
                    <input type="checkbox" name="cameraman" checked={formData.cameraman} onChange={handleChange} />
                    Cameraman (+$25,000)
                </label>
                <br />
                <label>
                    <input type="checkbox" name="decoration" checked={formData.decoration} onChange={handleChange} />
                    Decoration (+$40,000)
                </label>
                <br />
                <label htmlFor="chairsPrize">Chairs Prize:</label>
                <input type="number" id="chairsPrize" name="chairsPrize" value={formData.chairsPrize} onChange={handleChange} />
                <br />
                {/* Terms of Agreement */}
                <h4>Terms of Agreement</h4>
                <label>
                    <input type="checkbox" name="termsAgreed" checked={formData.termsAgreed} onChange={handleChange} required />
                    I agree to the terms and conditions
                </label>
                {errors.termsAgreed && <div className="error">{errors.termsAgreed}</div>}
                <br />
                <label>Date</label>
                <input type="text" value="05-01-2024" readOnly />
                <br />
                <label>Pick a Date</label>
                <input type="date" />
                <br />
                <button className="button" type="submit">Submit</button>
            </form>
            {confirmation && <div id="confirmation">{confirmation}</div>}
        </div>
    );
}
