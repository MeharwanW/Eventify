import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDashboard, BiSolidCalendar, BiGroup, BiDollarCircle, BiStore, BiMessageDots, BiAnalyse, BiCalendarCheck, BiCog, BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import './adminhub.css';

const socket = io.connect("http://localhost:3001");

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
    const [clientOrders, setClientOrders] = useState({});
    const [clientUsername,setClientUsername] = useState("")
	 const [loadingData, setLoadingData] = useState(false);
    const handleSearchFormToggle = () => {
        // Implement search form toggle logic here
    };

    const handleAddEventClick = () => {
        setShowAddEventForm(true);
    };



    // async function handleOrganizerImage(e){
    //     e.preventDefault();

    //     const authToken = localStorage.getItem("adminToken");
    //     const organizerId = localStorage.getItem("currentOrganizer");
        

    //     const formData = new FormData();
    //     formData.append('image', image); // Assuming `imageFile` is the file selected by the organizer
    //     formData.append('organizer_id', organizerId);


    //     axios.post('http://your-api-url/add/organizer/image', 
    //         formData, {
    //         headers: {
    //             Authorization: `Bearer ${authToken}`,
    //             "Content-Type": "multipart/form-data",
    //         }}).then(response => {

    //             console.log(response.data);
    //             // Handle success
    //             if (response.status) {
    //                 console.log("Gig upadated")
    //                 //navigate('/Login');
    //             } else {
    //                 alert('Gig not found');              
    //             }

    //         }).catch(error => {

    //             console.error(error);
    //             // Handle error
    //     });

    // }

    async function handleFormSubmit(event){

        event.preventDefault();
        setIsLoading(true);
        const authToken = localStorage.getItem("adminToken");
        const organizerId = localStorage.getItem("currentOrganizer");
        console.log("orgnaizerId from AdminHub ; ",organizerId )
        const organizerUsername = localStorage.getItem("currentOrganizerUsername");
        console.log("orgnaizerUsername from AdminHub ; ",organizerUsername )


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
        const userType =localStorage.getItem("userType");
        console.log("userType from useEffect AdminHub",userType)
        if(userType==='organizer'){
        getOrganizersOrders();
        }
        else if (userType==='client') {
            getClientOrders()
        }
    }, []);


const getClientOrders = async ()=>{

    const clientId = localStorage.getItem("currentClient");
    const result = await axios.get("http://localhost:4000/get/client/orders", {
        params: {
            clientId: clientId
        }
    });
    console.log(result.data.allOrders);

}

const getOrganizersOrders = async () => {

    const organizerId = localStorage.getItem("currentOrganizer");
   

    const result = await axios.get("http://localhost:4000/get/organizer/orders", {
        params: {
            organizerId: organizerId
        }
    });
    console.log(result.data.allOrders);

    

    if(result.status){
        setClientOrders(result.data)
        console.log("Orders Found")
	setLoadingData(true);
    }

   
};

const joinRoom = () => {
        
    const userType =localStorage.getItem("userType");

    if(userType==='organizer'){
        getOrganizersOrders();
        }
        else if (userType==='client') {
            getClientOrders()
        }
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

console.log("clientOrders",clientOrders)

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
            const response = await axios.post('http://localhost:4000/handle/decision', { orderId, decision,client_id });
    
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

        console.log("ClientOrders",clientOrders)
    };
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
            <td className='recentOrders'>{dataItem.client_username}</td>
            <td className='recentOrders'>{dataItem.venue}</td>
            <td className='recentOrders'>
                {dataItem.services_list.map((service, index) => (
                    <span className='flexStart' key={index}>{service.name}</span>
                ))}
            </td>       
            <td className='recentOrders'>{dataItem.order_status}</td>
            <td className='recentOrders'>
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
                                           
                                            <button className='button' type="button" onClick={handleAddService}>Add Service</button>
                                            <br />
                                            <div>
                                                <div className="form-group inputs1 flexCenter">
                                                    <label className='text' htmlFor="image">Image:</label>
                                                    <input className='input1' type="file" id="image" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                                                </div>
                                                <div className="flexCenter imageSet">
                                                    {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" />}
                                                </div>
                                            </div>
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
