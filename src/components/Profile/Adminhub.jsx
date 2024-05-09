import React, { useState, useEffect } from 'react';
import { BiSolidDashboard,BiSmile, BiStore, BiAnalyse, BiMessageDots, BiSolidCalendar, BiGroup, BiCog, BiLogOut, BiCalendarCheck, BiDollarCircle, BiSearch, BiBell, BiPlus, BiDotsVerticalRounded, BiChevronRight } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import { Link , useLocation} from 'react-router-dom';
import './adminhub.css';
import axios from 'axios';

// import authToken from '../SignIn/Login.js';

// console.log("authToken: ", authToken);

const AdminHub = () => {
    
    const { state } = useLocation();

    const userData = state?.userData;
    //const client = userData.userData

    //console.log("Userdata in dashboard",userData)
    //console.log(userData.userData.organizer_name)

    //const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [description, setDescription] = useState('');
    const [venue, setVenue] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [state1, setState] = useState('');
   // const [image, setImage] = useState(null);
    const [accountRole,setAccountRole] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    //const [organizer,setOrganizer]=useState("")

    //const navigate = useNavigate();
    //setOrganizer(userData.userData._id)
    //console.log(organizer)

   
    const handleSearchFormToggle = () => {
        // Implement search form toggle logic here
    };

    const handleAddEventClick = () => {
        setShowAddEventForm(true);
    };

    async function handleFormSubmit(event){

        event.preventDefault();
        setIsLoading(true);
       // console.log("Auth Token from AdminHub", authToken)
        //console.log("Organizer Id in Dashboard: ", userData.userData._id)
       // console.log("Organizer Name in Dashboard: ",userData.userData.organizer_name)

        try {
            await axios.post("http://localhost:3000/addGig", {

            //selectedCategory,
            description,
            venue,
            category,
            city,
            state1,
            //image,
            accountRole


            }).then(res =>{

            console.log("response form then addminHub ",res)
            console.log(res.data.status)
            if (res.status) {

                alert("Gig created")
                //navigate('/Login');
                 
            } else {
                alert('Gig already exist');            
               
               
            }
        }).catch(err =>{
            console.log("Error inside catch await post adminHub",err)
        })
    } 
    catch (error) {
        alert('Failed to add. Please try again.');
        console.error('Registration error:', error);
    } finally {
        setIsLoading(false);
    }


    }

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

    return (
        <div>
            <section id="sidebar">
                <Link to="/" className="brand">
                    <BiSmile className='bx bxs-smile'/>

                    <span className="color-text">Dashboard</span>
                </Link>
                <ul className="side-menu top font">
                    <li className={activeMenuItem === 'Dashboard' ? 'active' : ''}>
                        <Link to="/">
                            <BiSolidDashboard className='bx bxs-dashboard'/>
                            <span className="">Dashboard</span>
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'My Store' ? 'active' : ''}>
                        <Link to="/store">
                            <BiStore className='bx bxs-shopping-bag-alt'/>
                            <span className="">My Store</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="/message">
                            <BiMessageDots className='bx '/>
                            <span className="">Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/analytics">
                            <BiAnalyse className='bx '/>
                            <span className="">Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/team">
                            <BiCalendarCheck className='bx '/>
                            <span className="">Team</span>
                        </Link>
                    </li>
                </ul>
                <ul className="side-menu font">
                    <li>
                        <Link to="/settings">
                            <BiCog className='bx'/>
                            <span className="">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className="logout">
                            <BiLogOut className='bx '/>
                            <span className="">Logout</span>
                        </Link>
                    </li>
                </ul>
            </section>

            <section id="content">
                <nav>
                    <i className='bx bx-menu'></i>
                    <Link to="/" className="nav-link font">Categories</Link>
                    <form action="#">
                        <div className="form-input">
                         <input type="search" placeholder="Search..." />
                            <button type="submit" className="search-btn" onClick={handleSearchFormToggle}>
                                <BiSearch />
                            </button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    
                    <Link to="/notifications" className="notification">
                        <BiBell />
                        <span className="num">8</span>
                    </Link>
                    <Link to="/profile" className="profile">
                        <img src="img/people.png" alt="Profile" />
                    </Link>
                </nav>
                <main>
                    <div className="head-title font">
                        <div className="left">
                            <h1 className='font'>Dashboard</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <Link to="#">Dashboard</Link >
                                </li>
                                <li><BiChevronRight /></li>
                                <li>
                                    <Link className="active" to="#">Home</Link >
                                </li>
                            </ul>
                        </div>
                        <div className="button" onClick={handleAddEventClick}>
                        <Link to="#" >
                        <span className="">Add Event</span>
                         </Link>
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
                                <BiSearch />
                                <BiDotsVerticalRounded />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Date Order</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src="img/people.png" alt="User" />
                                            <p>John Doe</p>
                                        </td>
                                        <td>01-10-2021</td>
                                        <td><span className="status completed">Completed</span></td>
                                    </tr>
                                    {/* Additional table rows */}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    {showAddEventForm && (
                        <div className="supplierInfoOverlay flexCenter add-event-form font">
                        <div className="supplierInfoContainer flexCenter">
                            <form onSubmit={handleFormSubmit} className='flexColCenter'>
                            <Form.Select onChange={(e) => setAccountRole(e.target.value)} className="font form_option input1">
                                <option value="">Select Your Role</option>
                                <option value="Makeup_artist">Makeup Artist</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Wedding_Planner">Wedding Planner/Coordinator</option>
                                <option value="Transport_Supplier">Transport Supplier</option>
                                <option value="Decoration Supplier">Decoration Supplier</option>
                                <option value="Cameraman">Cameraman/Photographer</option>
                            </Form.Select>
                            <div className="form-group inputs1">
                                    <label className='text' htmlFor="venue">Venue:</label>
                                    <input className='input1' type="text" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
                                </div>
                                <div className="form-group inputs1">
                                    <label className='text' htmlFor="category">Category:</label>
                                    <input className='input1' type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>
                                <div className="form-group inputs1">
                                    <label className='text' htmlFor="city">City:</label>
                                    <input className='input1' type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className="form-group inputs1">
                                    <label className='text' htmlFor="state">State:</label>
                                    <input className='input1' type="text" id="state" value={state1} onChange={(e) => setState(e.target.value)} />
                                </div>
                                <div className="form-group inputs1">
                                    <label className='text' htmlFor="description">Description:</label>
                                    <textarea className='input1' id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                {/* <div className="form-group inputs1 flexCenter">
                                    <label className='text' htmlFor="image">Image:</label>
                                    <input className='' type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                </div> */}
                                {/* <div className="imageSet">
                                    {image}
                                </div> */}
                                <button className='button' type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    )}
                </main>
            </section>
        </div>
    );
};

export default AdminHub;
