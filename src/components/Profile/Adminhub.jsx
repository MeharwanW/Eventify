import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDashboard, BiSolidCalendar, BiGroup, BiDollarCircle, BiStore, BiMessageDots, BiAnalyse, BiCalendarCheck, BiCog, BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import './adminhub.css';
import Form from 'react-bootstrap/Form';

const AdminHub = () => {
    const [activeView, setActiveView] = useState('Dashboard');
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [description, setDescription] = useState('');
    const [venue, setVenue] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [state1, setState] = useState('');
    const [image, setImage] = useState(null);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [clientOrders, setClientOrders] = useState({});
    const [clientUsername, setClientUsername] = useState("");
    const [loadingData, setLoadingData] = useState(false);

    const handleSearchFormToggle = () => {
        // Implement search form toggle logic here
    };

    const handleAddEventClick = () => {
        setShowAddEventForm(true);
    };

    async function handleFormSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        const authToken = localStorage.getItem("adminToken");
        const organizerId = localStorage.getItem("currentOrganizer");
        console.log("orgnaizerId from AdminHub ; ", organizerId)
        const organizerUsername = localStorage.getItem("currentOrganizerUsername");
        console.log("orgnaizerUsername from AdminHub ; ", organizerUsername)

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
            const result = await axios.post("http://localhost:4000/addGig", formData, {
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

        const result = await axios.get("http://localhost:4000/get/orders", {
            params: {
                organizerId: organizerId
            }
        });
        console.log(result.data.allOrders);

        if (result.status) {
            setClientOrders(result.data);
            console.log("Orders Found");
            setLoadingData(true);
        }
    };

    console.log("clientOrders", clientOrders);

    const handleAddService = () => {
        const newService = { name: '', price: 0 };
        setServices([...services, newService]);
    };

    const handleServiceNameChange = (index, value) => {
        const updatedServices = [...services];
        updatedServices[index].name = value;
        setServices(updatedServices);
    };

    const handleServicePriceChange = (index, value) => {
        const updatedServices = [...services];
        updatedServices[index].price = value;
        setServices(updatedServices);
    };

    const handleRemoveService = (index) => {
        const updatedServices = [...services];
        updatedServices.splice(index, 1);
        setServices(updatedServices);
    };

    const handleDecision = async (decision, orderId, client_id) => {
        try {
            const response = await axios.post('http://localhost:4000/handle/decision', { orderId, decision, client_id });

            if (response.status) {
                console.log(response.data.message);
                alert(response.data.message);
            } else {
                console.log('Failed to process order');
                alert('Failed to process order');
            }
        } catch (error) {
            console.error(`Error ${decision === 'accept' ? 'accepting' : 'rejecting'} order:`, error);
            alert(`Error ${decision === 'accept' ? 'accepting' : 'rejecting'} order`);
        }
    };

    const renderDashboard = () => (
        <div>
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
                                <th className=' recentOrders'>Client</th>
                                <th className=' recentOrders'>Venue</th>
                                <th className=' recentOrders'>Services</th>
                                <th className=' recentOrders'>Status</th>
                                <th className=' recentOrders'>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loadingData ? (
                                <tr>
                                    <td colSpan="4">Loading...</td>
                                </tr>
                            ) : (
                                clientOrders.allOrders && clientOrders.allOrders.map((dataItem, index) => (
                                    <tr className='font' key={index}>
                                        <td className=' recentOrders'>{dataItem.client_username}</td>
                                        <td className=' recentOrders'>{dataItem.venue}</td>
                                        <td className=' recentOrders'>{dataItem.services_list.name}</td>
                                        <td className=' recentOrders'>{dataItem.order_status}</td>
                                        <td className=' recentOrders'>
                                            <button onClick={() => handleDecision("accept", dataItem._id, dataItem.client_id)} className='btn btn-sm btn-primary'>Accept</button>
                                            <button onClick={() => handleDecision("reject", dataItem._id, dataItem.client_id)} className='btn btn-danger btn-sm'>Reject</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showAddEventForm && renderAddEventForm()}
        </div>
    );

    const renderMessages = () => (
        <div>
            <h1 className='font'>Messages</h1>
            {/* Implement message viewing functionality here */}
            <p>Here you can view and manage messages.</p>
        </div>
    );

    const renderAddEventForm = () => (
        <div className="supplierInfoOverlay font">
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

                            <div className="form-group flexColCenter">
                                <label className='text' htmlFor="category">Category:</label>
                                <Form.Select className='input1' id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Event Category</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="meeting">Meeting</option>
                                    <option value="party">Party</option>
                                    <option value="reception">Reception</option>
                                </Form.Select>
                            </div>

                            <div className="form-group flexColCenter">
                                <label className='text' htmlFor="city">City:</label>
                                <Form.Select className='input1' id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value="">Select City</option>
                                    <option value="karachi">Karachi</option>
                                    <option value="islamabad">Islamabad</option>
                                    <option value="dera allah yar">Dera Allah Yar</option>
                                    <option value="sukkur">Sukkur</option>
                                    <option value="jacobabad">Jacobabad</option>
                                    <option value="hyderabad">Hyderabad</option>
                                </Form.Select>
                            </div>

                            <div className="form-group flexColCenter">
                                <label className='text' htmlFor="state1">State:</label>
                                <Form.Select className='input1' id="state1" value={state1} onChange={(e) => setState(e.target.value)}>
                                <option value="">Select State</option>
                                    <option value="sindh">Sindh</option>
                                    <option value="balochistan">Balochistan</option>
                                    <option value="punjab">Punjab</option>
                                    <option value="kpk">KPK</option>
                                </Form.Select>
                            </div>

                            <div style={{ width: "100%", height: "100%" }} className="form-group flexColCenter inputs1">
                                <label className='text' htmlFor="description">Description:</label>
                                <textarea className='input1 des' id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className='form-group flexColCenter eventFormField'>
                            <h3 className='font text'>Add Services:</h3>
                            {services.map((service, index) => (
                                <div key={index} className='flexColCenter'>
                                    <div className=''>
                                        <Form.Select
                                            className='inputs1'
                                            value={service.name}
                                            onChange={(e) => handleServiceNameChange(index, e.target.value)}
                                        >
                                            <option value="Camera man">Camera Man</option>
                                            <option value="Catering">Catering</option>
                                            <option value="Chairs">Chairs</option>
                                            <option value="Decoration">Decoration</option>
                                            <option value="Food">Food</option>
                                            <option value="Stage">Stage</option>
                                            <option value="Hall">Hall</option>
                                            <option value="Dj floor">DJ Floor</option>
                                            <option value="Music system">Music System</option>
                                        </Form.Select>
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
                                    <button className='button margin' type="button" onClick={() => handleRemoveService(index)}>Remove</button>
                                </div>
                            ))}
                            <br />
                            <button className='button' type="button" onClick={handleAddService}>Add Service</button>
                            <br />
                            <div>
                                <div className="flexColCenter eventFormField">
                                    <label className='text' htmlFor="image">Image:</label>
                                    <input className='input1' type="file" id="image" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className="flexCenter imageSet">
                                    {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" />}
                                </div>
                            </div>
                        </div>
                        <div className='eventFormField paddings flexCenter'>
                            <button className='button margin' type="submit">Submit</button>
                            <button className='button margin' onClick={() => { setShowAddEventForm(null) }} >Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <section id="sidebar">
                <ul className="side-menu top font">
                    <li className={activeView === 'Dashboard' ? 'active' : ''}>
                        <Link to="#" onClick={() => setActiveView('Dashboard')}>
                            <BiSolidDashboard className='bx bxs-dashboard' />
                            <span className="">Dashboard</span>
                        </Link>
                    </li>
                    <li className={activeView === 'Messages' ? 'active' : ''}>
                        <Link to="#" onClick={() => setActiveView('Messages')}>
                            <BiMessageDots className='bx' />
                            <span className="">Messages</span>
                        </Link>
                    </li>
                </ul>
            </section>

            <section id="content">
                <main>
                    {activeView === 'Dashboard' && renderDashboard()}
                    {activeView === 'Messages' && renderMessages()}
                </main>
            </section>
        </div>
    );
};

export default AdminHub;
