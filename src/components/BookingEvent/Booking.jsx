import React, { useState, useEffect} from "react";
import "./Booking.css";
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';


export const Booking = () => {
    const [sign,setSign] = useState()
    const [url,setUrl] = useState()

    const handleClear= () =>{
        sign.clear()
        setUrl('')
    }
    const handleGenerate= () =>{
        setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
    }

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
        venue:"",
        cameraman: false,
        decoration: false,
        termsAgreed: false,
        soundDj: false,
        hall: false,
        stage: false,
        floor: false,
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
    
    useEffect(() => {
        let budget = 0;
        if (formData.cameraman) budget += 25000;
        if (formData.decoration) budget += 25000;
        if (formData.soundDj) budget += 25000;
        if (formData.hall) budget += 25000;
        if (formData.stage) budget += 25000;
        if (formData.floor) budget += 25000;
        setTotalBudget(budget);
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== "termsAgreed") {
                formErrors[key] = "This field is required.";
            }
        });

        if (Object.keys(formErrors).length === 0) {
            
            let budget = 0;
            if (formData.cameraman) budget += 25000;
        if (formData.decoration) budget += 25000;
        if (formData.soundDj) budget += 25000;
        if (formData.hall) budget += 25000;
        if (formData.stage) budget += 25000;
        if (formData.floor) budget += 25000;
            budget += parseInt(formData.chairsPrize);
            setTotalBudget(budget);

            // Form submission logic here
            setConfirmation(`Thank you, ${formData.fullName}! Your event on ${formData.eventDate} has been booked. Total prize: ${budget}`);
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
    

    // async function handleBooking(event) {
       
    //     event.preventDefault();
    //    // setIsLoading(true);

    //    const data = {
    //        "client_id": "788",
    //        "category": "Party",
    //        "venue": "DolphinHall",
    //        "city": "Sukkur",
    //        "state1": "Sukkur",
    //        //"no_of_guest": "180",
    //        "services": "camerman"
    //        //"gig_id": "89210",
    //        //"organizer_id": "794204"
    //    };
       
    //    axios.post('http://localhost:3000/book/event', data)
    //        .then(response => {
    //            console.log('Response:', response.data);
    //            // Handle response data
    //        })
    //        .catch(error => {
    //            if (error.response) {
    //                // The request was made and the server responded with a status code that falls out of the range of 2xx
    //                console.error('Response Error:', error.response.data);
    //            } else if (error.request) {
    //                // The request was made but no response was received
    //                console.error('Request Error:', error.request);
    //            } else {
    //                // Something happened in setting up the request that triggered an Error
    //                console.error('Error:', error.message);
    //            }
    //        });
       

    //     // try {
    //     //     await axios.post("http://localhost:3000/book/event", {

    //     //     client_id:"788",
    //     //     category:"Party",
    //     //     venue:"DolphinHall",
    //     //     city:"Sukkur",
    //     //     state1:"Sukkur",
    //     //     //"no_of_guest":"180",
    //     //     services:"camerman",
    //     //     //"gig_id":"89210",
    //     //     //"organizer_id":"794204"
    //     //         //client_id:"663a7e97b5098afc83e15903",
    //     //         //category:"Party",
    //     //         // venue:formData.venue,
    //     //         // city:formData.city,
    //     //         // state1:formData.state,
    //     //         // services:"cameraman",
    //     //         // no_of_guest:3000,
    //     //         // // total_cost:findGig.total_cost,
    //     //         // payment_status:"After Event",
    //     //         // gig_id:findGig._id,
    //     //         // organizer_id:findGig.organizer_id,
    //     //     }).then(res =>{
 
    //     //         console.log("response form then booking ",res)

    //     //         if (res.data.status) {
    //     //             alert("Order placed: Wait for the confirmation of organizer")
    //     //             navigate('/home');
                    
                   
    //     //         } else {
    //     //             alert("there was an error placing your booking. Try Again!");            
                   
                   
    //     //         }
    //     //     }).catch(err =>{
    //     //         console.log("Error inside await post post signup",err)
    //     //     })
    //     // } 
    //     // catch (error) {
    //     //     console.error('Registration error:', error.message);
    //     //     alert('Failed to register. Please try again.');

    //     // } finally {
    //     //    // setIsLoading(false);
    //     // }
    // }

    return (
        <div className="bookingscreen shadow-box flexCenter font">
            <form onSubmit={handleSubmit} className="bookingagreement ">
                <h1 className="text">Booking Agreement</h1>
                <p>Complete form below to retain the services of an Event</p>
                <div>For Direct Inquiries contact Meharwanw@gmail.com or call (03488365045)</div>
                <br />
                <label className="text flexCenter" htmlFor="event ">Event:</label>
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
                <div class="flexCenter input1 budgetEvent">
                    <div class="budgetCheckbox flexCenter">
                        <input type="checkbox" id="cameraman" name="cameraman" checked={formData.cameraman} onChange={handleChange} />
                        <span class="checkbox-icon"></span>
                        Cameraman
                    </div>
                    <div class="budgetBox">
                        <span class="product">(+25,000)</span>
                    </div>
                </div>
                <div class="flexCenter input1 budgetEvent">
                    <div class="budgetCheckbox flexCenter">
                        <input type="checkbox" id="decoration" name="decoration" checked={formData.decoration} onChange={handleChange} />
                        <span class="checkbox-icon"></span>
                        Decoration
                    </div>
                    <div class="budgetBox">
                        <span class="product">(+25,000)</span>
                    </div>
                </div>
                <div class="flexCenter input1 budgetEvent">
                    <div class="budgetCheckbox flexCenter">
                        <input type="checkbox" id="soundDj" name="soundDj" checked={formData.soundDj} onChange={handleChange} />
                        <span class="checkbox-icon"></span>
                        Sound DJ
                    </div>
                    <div class="budgetBox">
                        <span class="product">(+25,000)</span>
                    </div>
                </div>
                <div class="flexCenter input1 budgetEvent">
                    <div class="budgetCheckbox flexCenter">
                        <input type="checkbox" id="hall" name="hall" checked={formData.hall} onChange={handleChange} />
                        <span class="checkbox-icon"></span>
                        Hall
                    </div>
                    <div class="budgetBox">
                        <span class="product">(+25,000)</span>
                    </div>
                </div>
                <div class="flexCenter input1 budgetEvent">
                    <div class="budgetCheckbox flexCenter">
                        <input type="checkbox" id="stage" name="stage" checked={formData.stage} onChange={handleChange} />
                        <span class="checkbox-icon"></span>
                        Stage
                    </div>
                    <div class="budgetBox">
                        <span class="product">(+25,000)</span>
                    </div>
                </div>
                <div class="flexCenter input1 budgetEvent">
                    <div class="budgetCheckbox flexCenter">
                        <input type="checkbox" id="floor" name="floor" checked={formData.floor} onChange={handleChange} />
                        <span class="checkbox-icon"></span>
                        DJ Floor
                    </div>
                    <div class="budgetBox">
                        <span class="product">(+25,000)</span>
                    </div>
                </div>
                <div class="flexCenter input1 budgetEvent">
                    <div class="budgetCheckbox flexCenter">
                        <label type="label" id="total" name="total" />
                        <span class="checkbox-icon"></span>
                       Total
                    </div>
                    <div class="budgetBox">
                        <span class="product">{totalBudget}</span>
                    </div>
                </div>

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
}
