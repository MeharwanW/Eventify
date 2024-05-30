import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Booking.css";
import SignatureCanvas from 'react-signature-canvas';
import { useLocation } from "react-router-dom";

const Booking = () => {
    const clientId = localStorage.getItem("currentClient");
    const { state } = useLocation();
    const clientusername = localStorage.getItem("currentClientUsername");
    const [selectedCard, setSelectedCard] = useState(state?.userData || {});
    const [servicesList, setServicesList] = useState(selectedCard.services_list || []);
    const [formData, setFormData] = useState({
        client_username:clientusername,
        client_id:clientId,
        organizer_id:selectedCard.organizer_id,
        gig_id:selectedCard._id,
        category: selectedCard.category || "",
        eventDate: "",
        eventTime: "",
        city: selectedCard.city || "",
        state1: selectedCard.state1 || "",
        venue: selectedCard.venue || "",
        services: [],
        totalPrice: 0, 
    });

    const [confirmation, setConfirmation] = useState("Order Has Not Been Placed");
    const [isSubmited, setIsSubmited] = useState(false);
    const [errors, setErrors] = useState({});
    const [sign, setSign] = useState(null);
    useEffect(() => {
        setServicesList(selectedCard.services_list || []);
    }, [selectedCard]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            let updatedServices;
            if (checked) {
                updatedServices = [...formData.services, { name, price: parseFloat(value) }];
            } else {
                updatedServices = formData.services.filter(service => service.name !== name);
            }
            const totalPrice = updatedServices.reduce((total, service) => total + service.price, 0);

            setFormData({
                ...formData,
                services: updatedServices,
                totalPrice: totalPrice,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== "services" && key !== "totalPrice") {
                formErrors[key] = "This field is required.";
            }
        });

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:4000/book/event', formData);
                console.log('Response:', response.data);
                setConfirmation(`Thank you! Your event on ${formData.eventDate} has been sent to Organizer. Total price: ${formData.totalPrice}. Wait for Confimation Mail`);
                setIsSubmited(true);
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            setErrors(formErrors);
        }
    };

    const client_Id = localStorage.getItem("currentClient");
    // console.log("orgnaizerId from AdminHub ; ",client_Id )
    
    // axios.post('http://localhost:4000/book/event', data)
    //     .then(response => {
    //         console.log('Response:', response.data);
    //         // Handle response data
    //         alert("Order Placed")
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //             console.error('Response Error:', error.response.data);
    //         } else if (error.request) {
    //             console.error('Request Error:', error.request);
    //         } else {
    //             console.error('Error:', error.message);
    //         }
    //     });

    return (
        <div className="bookingscreen shadow-box flexCenter font">
            <form onSubmit={handleSubmit} className="bookingagreement">
                <h1 className="text">Booking Agreement</h1>
                <p>Complete form below to retain the services of an Event</p>
                <div>For Direct Inquiries contact Meharwanw@gmail.com or call (03488365045)</div>
                <br />
                <label className="text flexCenter" htmlFor="event">Event:</label>
                <select id="category" className="input" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Party">Party</option>
                    <option value="Reception">Reception</option>
                </select>
                {errors.event && <div className="error">{errors.event}</div>}
                <br />
                <label className="text" htmlFor="eventDate">Event Date & Time:</label>
                <div className="input1">
                    <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                    <input type="time" id="eventTime" name="eventTime" value={formData.eventTime} onChange={handleChange} required />
                </div>
                {errors.eventDate && <div className="error">{errors.eventDate}</div>}
                {errors.eventTime && <div className="error">{errors.eventTime}</div>}
                <br />
                <div className="inputs flexCenter Address">
                    <label className="text" htmlFor="eventDate">Address</label>
                    <input type="text" id="venue" name="venue" placeholder="Venue" className="font input1" value={formData.venue} onChange={handleChange} required />
                    {errors.venue && <div className="error">{errors.venue}</div>}
                    <input type="text" id="city" placeholder="City" className="font input1" name="city" value={formData.city} onChange={handleChange} required />
                    {errors.city && <div className="error">{errors.city}</div>}
                    <input type="text" id="state1" name="state1" placeholder="State" className="font input1" value={formData.state1} onChange={handleChange} required />
                    {errors.state && <div className="error">{errors.state1}</div>}
                </div>
                <br />
                <label className="text" htmlFor="services">Select Services:</label>
                {servicesList.map(service => (
                    <div className="flexCenter input1 budgetEvent" key={service.name}>
                        <div className="budgetCheckbox flexCenter">
                            <input
                                type="checkbox"
                                id={service.name}
                                name={service.name}
                                value={service.price}
                                onChange={handleChange}
                                checked={formData.services.some(s => s.name === service.name)}
                            />
                            <span className="checkbox-icon"> {service.name}</span>
                            <span className="">(+{service.price})</span>
                        </div>
                    </div>
                ))}
                <div className="text font">Total Price: {formData.totalPrice}</div>
                <div className="flexColCenter">
                    <label className="text flexCenter" htmlFor="">Signature</label>
                    <div className="Signature">
                        <SignatureCanvas
                            canvasProps={{ width: 200, height: 200, className: 'sigCanvas' }}
                            ref={data => setSign(data)}
                        />
                    </div>
                    <br />
                    <div className="flexCenter SignatureButtons">
                        <button className="button" onClick={() => sign.clear()}>Clear</button>
                        <button className="button" onClick={handleSubmit}>Save</button>
                    </div>
                    <br />
                </div>
                <br />
                <button className="button" type="submit">Submit</button>
            </form>
            {isSubmited && <div id="confirmation">{confirmation}</div>}
        </div>
    );
};

export default Booking;
