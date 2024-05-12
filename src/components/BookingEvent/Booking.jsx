import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Booking.css";
import SignatureCanvas from 'react-signature-canvas';



export const Booking = (props) => {

    const  selectedCard  = props.city;
    console.log(selectedCard)
     
    const [sign, setSign] = useState();
    const [url, setUrl] = useState();
    const [totalBudget, setTotalBudget] = useState(0);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        event: "",
        eventDate: "",
        eventTime: "",
        city: "",
        state: "",
        zipCode: "",
        venue: "",
        services: [], // Array to hold the selected services
    });
    const [servicesData, setServicesData] = useState([]); // State variable to hold the services fetched from the database
    const [confirmation, setConfirmation] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch services when the component mounts
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get("http://localhost:3000/services");
            setServicesData(response.data); // Update the services state variable with the fetched data
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            // Handle checkbox selection
            if (checked) {
                // Add the selected service to the services array
                setFormData({
                    ...formData,
                    services: [...formData.services, { name, price: parseFloat(value) }],
                });
            } else {
                // Remove the deselected service from the services array
                const updatedServices = formData.services.filter(service => service.name !== name);
                setFormData({
                    ...formData,
                    services: updatedServices,
                });
            }
        } else {
            // Handle other input fields
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        // Calculate total budget when the services array changes
        let budget = 0;
        formData.services.forEach(service => {
            budget += service.price;
        });
        setTotalBudget(budget);
    }, [formData.services]);

    const handleClear = () => {
        sign.clear();
        setUrl('');
    };

    const handleGenerate = () => {
        setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== "termsAgreed" && key !== "services") {
                formErrors[key] = "This field is required.";
            }
        });

        if (Object.keys(formErrors).length === 0) {
            // Form submission logic here
            setConfirmation(`Thank you, ${formData.fullName}! Your event on ${formData.eventDate} has been booked. Total prize: ${totalBudget}`);
        } else {
            setErrors(formErrors);
        }
    };

    async function handleBooking(event) {
        const data = {
            client_id:"663a7e97b5098afc83e15903",
            category:"Party",
            venue:formData.venue,
            city:formData.city,
            state1:formData.state,
            services:"cameraman",
            no_of_guest:180,
            // total_cost:findGig.total_cost,
            payment_status:"After Event",
            //gig_id:findGig._id,
            //organizer_id:findGig.organizer_id,
        };
    
        axios.post('http://localhost:3000/book/event', data)
            .then(response => {
                console.log('Response:', response.data);
                // Handle response data
                alert("Order Placed")
            })
            .catch(error => {
                if (error.response) {
                    console.error('Response Error:', error.response.data);
                } else if (error.request) {
                    console.error('Request Error:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
            });
    }
    



    return (
        <div className="bookingscreen shadow-box flexCenter font">
            <form onSubmit={handleSubmit} className="bookingagreement ">
                <h1 className="text">Booking Agreement</h1>
                <p>Complete form below to retain the services of an Event</p>
                <div>For Direct Inquiries contact Meharwanw@gmail.com or call (03488365045)</div>
                <br />
                <label className="text flexCenter" htmlFor="event">Event:</label>
                <select id="event" className="input" name="event" value={formData.event} onChange={handleChange} required>
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
                    <input type="text" id="state" name="state" placeholder="State" className="font input1" value={formData.state} onChange={handleChange} required />
                    {errors.state && <div className="error">{errors.state}</div>}
                    <input type="text" id="zipCode" name="zipCode" placeholder="ZipCode" className="font input1" value={formData.zipCode} onChange={handleChange} required />
                    {errors.zipCode && <div className="error">{errors.zipCode}</div>}
                </div>
                <br />
                {/* Dynamically render service checkboxes */}
                {servicesData.map(service => (
                    <div className="flexCenter input1 budgetEvent" key={service.id}>
                        <div className="budgetCheckbox flexCenter">
                            <input type="checkbox" id={service.name} name={service.name} value={service.price} onChange={handleChange} />
                            <span className="checkbox-icon"></span>
                            {service.name} (+{service.price})
                        </div>
                    </div>
                ))}
                <br />
                <div className="flexColCenter">
                    <label className="text flexCenter" htmlFor="">Signature</label>
                    <div className="Signature">
                        <SignatureCanvas 
                            canvasProps={{width: 200, height: 200, className: 'sigCanvas'}}
                            ref={data=>setSign(data)}
                        />
                    </div>
                    <br/>
                    <div className="flexCenter SignatureButtons">
                        <button className="button" onClick={handleClear}>Clear</button>
                        <button className="button" onClick={handleGenerate}>Save</button>
                    </div>
                    <br/>
                </div>
                <br />
                <button className="button" type="submit" onClick={handleBooking}>Submit</button>
            </form>
            {confirmation && <div id="confirmation">{confirmation}</div>}
        </div>
    );
};
