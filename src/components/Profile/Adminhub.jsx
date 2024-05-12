import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDashboard, BiSolidCalendar, BiGroup, BiDollarCircle, BiStore, BiMessageDots, BiAnalyse, BiCalendarCheck, BiCog, BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import './adminhub.css';

const AdminHub = () => {

    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [description, setDescription] = useState('');
    const [venue, setVenue] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [state1, setState] = useState('');
    const [image, setImage] = useState(null);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [clientOrders,setClientOrders] = useState("")
    const [clientUsername,setClientUsername] = useState("")
 
   
    const handleSearchFormToggle = () => {
        // Implement search form toggle logic here
    };

    const handleAddEventClick = () => {
        setShowAddEventForm(true);
    };

    async function handleFormSubmit(event){

        event.preventDefault();
        setIsLoading(true);
        const authToken = localStorage.getItem("adminToken");
        const organizerId = localStorage.getItem("currentOrganizer");
        console.log("orgnaizerId from AdminHub ; ",organizerId )

        const formData = new FormData();
        formData.append("organizer_id", organizerId);
        formData.append("image", image);
        formData.append("description", description);
        formData.append("venue", venue);
        formData.append("category", category);
        formData.append("city", city);
        formData.append("state1", state1);
        formData.append("services", JSON.stringify(services));

        try {
            const result = await axios.post("http://localhost:3000/addGig", formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (result.status) {
                alert("Gig created");
            } else {
                alert('Gig already exists');
            }
        } catch (error) {
            alert('Failed to add. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);


const getOrders = async () => {

    const organizerId = localStorage.getItem("currentOrganizer");
   

    const result = await axios.get("http://localhost:3000/get/orders", {
        params: {
            organizerId: organizerId
        }
    });

    console.log(result.data.allOrders);

    if(result.status){
        setClientOrders(result.data)
        console.log("Orders Found")
    }



    const clientIds=result.data.allOrders.map(order => order.client_id);
    const clientIdsString = clientIds.join(',');

    const clientResult = await axios.get("http://localhost:3000/get/client/username", {
        params: {
            client_id: clientIdsString
        }
    });
    console.log(clientResult.data.clientData);

    if(clientResult.status){
        setClientUsername(clientResult.data)
        console.log("Orders Found")
    }


    //setAllImage(result.data.data);
};


const handleDecision = async (decision) => {
    try{
        const response =  await axios.post('http://localhost:3000/handle/decision', {orderId, decision, client_email });

        if (response.status) {
            console.log(response.data.message);
            alert(response.data.message);
        } else {
            console.log('Failed to process order');
            alert('Failed to process order');
        }
       // alert(`Order ${decision === 'accepted' ? 'accepted' : 'rejected'}`);
    } 
    catch (error) {
        console.error(`Error ${decision === 'accepted' ? 'accepting' : 'rejecting'} order:`, error);
            alert(`Error ${decision === 'accepted' ? 'accepting' : 'rejecting'} order`);
    }
};


 
    // const handleFormSubmit = (event) => {
    //     event.preventDefault();
    //       const formData = {
    //         description,
    //         venue,
    //         category,
    //         city,
    //         state,
    //         image
    //     };
        
    //     setDescription('');
    //     setVenue('');
    //     setCategory('');
    //     setImage(null);
    //     setShowAddEventForm(false);

    //     console.log(formData);
    // };

    console.log("Befir ret client id using clientOders: ", clientOrders.allOrders)

    return (
        <div>
            <section id="sidebar">
                <ul className="side-menu top font">
                    <li className={activeMenuItem === 'Dashboard' ? 'active' : ''}>
                        <Link to="/">
                            <BiSolidDashboard className='bx bxs-dashboard' />
                            <span className="">Dashboard</span>
                        </Link>
                    </li>
                 </ul>
            </section>

            <section id="content">
                <main>
                    <div className="head-title font">
                        <div className="left">
                            <h1 className='font'>Dashboard</h1>
                        </div>
                        <div className="button" onClick={handleAddEventClick}>
                            <span className="">Add Event</span>
                        </div>
                    </div>
                    <ul className="box-info font">
                        <li >
                            <BiSolidCalendar className='bx' />
                            <span className="text">
                                <h3>1020</h3>
                                <p>New Order</p>
                            </span>
                        </li>
                        <li >
                            <BiGroup className='bx' />
                            <span className="text">
                                <h3>2834</h3>
                                <p>Visitors</p>
                            </span>
                        </li>
                        <li>
                            <BiDollarCircle className='bx' />
                            <span className="text">
                                <h3>$2543</h3>
                                <p>Total Sales</p>
                            </span>
                        </li>
                    </ul>
                    <div className="table-data font">
                        <div className="order">
                            <div className="head">
                                <h3>Recent Orders</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr className='text font' >
                                        
                                        <th className=' recentOrders'>venue</th>
                                        <th className=' recentOrders'>services</th>
                                        <th className=' recentOrders'>Status</th>
                                        <th className=' recentOrders'>Order Status</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingData ? (
                                        <tr>
                                            <td colSpan="4">Loading...</td>
                                        </tr>
                                    ) : (
                                        clientOrders.allOrders.map((dataItem, index) => (
                                            <tr className='font' key={index}>
                                                <td className=' recentOrders'></td>
                                                <td className=' recentOrders'>{dataItem.venue}</td>
                                                <td className=' recentOrders'>{dataItem.services}</td>
                                                <td className=' recentOrders'>{dataItem.order_status}</td>
                                                <td className=' recentOrders'><button className='btn btn-sm btn-primary'>Accept</button><button className=' btn btn-danger btn-sm'>Reject</button></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showAddEventForm && (
                        <div className="supplierInfoOverlay font ">
                            <div className="supplierInfoContainer addEvent flexColCenter">
                                <div>
                                    <h1 className="font text">Add Your Event</h1>
                                </div>
                                <div>
                                    <form onSubmit={handleFormSubmit} className='flexColCenter eventForm'>
                                        <div className='flexCenter eventFormField'>
                                            <div className="form-group flexColCenter inputs1">
                                                <label className='text' htmlFor="venue">Venue:</label>
                                                <input className='input1' type="text" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
                                            </div>

                                            <div className="form-group flexColCenter inputs1">
                                                <label className='text' htmlFor="category">Category:</label>
                                                <input className='input1' type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                                            </div>

                                            <div className="form-group flexColCenter inputs1">
                                                <label className='text' htmlFor="city">City:</label>
                                                <input className='input1' type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                                            </div>

                                            <div className="form-group flexColCenter inputs1">
                                                <label className='text' htmlFor="state">State:</label>
                                                <input className='input1' type="text" id="state" value={state1} onChange={(e) => setState(e.target.value)} />
                                            </div>

                                            <div style={{ width: "100%", height: "100%" }} className="form-group flexColCenter inputs1">
                                                <label className='text' htmlFor="description">Description:</label>
                                                <textarea className='input1 des' id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <div className='flexColCenter eventFormField'>
                                            <h3 className='font text'>Add Services:</h3>
                                            {services.map((service, index) => (
                                                <div key={index} className='flexCenter eventFormField'>
                                                    <div className='inputs1'>
                                                        <input
                                                            className='input1 '
                                                            type="text"
                                                            placeholder="Service Name"
                                                            value={service.name}
                                                            onChange={(e) => handleServiceNameChange(index, e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='inputs1'>
                                                        <input
                                                            className='input1 '
                                                            type="number"
                                                            placeholder="Service Price"
                                                            value={service.price}
                                                            onChange={(e) => handleServicePriceChange(index, e.target.value)}
                                                        />
                                                    </div>
                                                    <button className='button' type="button" onClick={() => handleRemoveService(index)}>Remove</button>
                                                </div>
                                            ))}
                                            <div>
                                                <div className="form-group inputs1 flexCenter">
                                                    <label className='text' htmlFor="image">Image:</label>
                                                    <input className='' type="file" id="image" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                                                </div>
                                                <div className="imageSet">
                                                    {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" />}
                                                </div>
                                            </div>
                                            <button className='button' type="button" onClick={handleAddService}>Add Service</button>
                                        </div>
                                        <div className='eventFormField'>
                                            <button className='button' type="submit">Submit</button>
                                            <button className='button' onClick={() => { setShowAddEventForm(null) }} >Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </section>
        </div>
    );
};

export default AdminHub;
