import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BiSolidDashboard,
  BiSolidCalendar,
  BiGroup,
  BiDollarCircle,
  BiStore,
  BiMessageDots,
  BiAnalyse,
  BiCalendarCheck,
  BiCog,
  BiLogOut,
} from "react-icons/bi";
import axios from "axios";
import "./adminhub.css";
import Form from "react-bootstrap/Form";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");
const AdminHub = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("adminToken");
  const token = localStorage.getItem("currentOrganizer");
  const userData = JSON.parse(token);
  const organizerId = userData._id;
  const organizeUsername = userData.organizer_username;

  console.log("username and id:", organizerId, " , ", organizeUsername);

  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state1, setState] = useState("");
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clientOrders, setClientOrders] = useState({});
  const [loadingData, setLoadingData] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (activeMenuItem === "Dashboard") {
      getOrders();
    } else if (activeMenuItem === "Messages") {
      // fetchMessages();
    }
  }, [activeMenuItem]);

  const handleAddEventClick = () => {
    setShowAddEventForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("organizer_id", organizerId);
    formData.append("organizer_username", organizeUsername);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("venue", venue);
    formData.append("category", category);
    formData.append("city", city);
    formData.append("state1", state1);
    formData.append("services", JSON.stringify(services));

    try {
      const result = await axios.post(
        "http://localhost:4000/addGig",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result.status) {
        alert("Gig created");
      } else {
        alert("Gig already exists");
      }
    } catch (error) {
      alert("Failed to add. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrders = async () => {
    const result = await axios.get(
      "http://localhost:4000/get/organizer/orders",
      {
        params: {
          organizerId: organizerId,
        },
      }
    );

    if (result.status) {
      setClientOrders(result.data);
      setLoadingData(true);
    }
  };

  const fetchMessages = async () => {
    const result = await axios.get("http://localhost:4000/get/messages");
    if (result.status) {
      setMessages(result.data);
    }
  };

  const sendMessage = async () => {
    const result = await axios.post("http://localhost:4000/send/message", {
      message: newMessage,
    });
    if (result.status) {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage("");
    }
  };

  const handleAddService = () => {
    const newService = { name: "", price: 0 };
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
      const response = await axios.post(
        "http://localhost:4000/handle/decision",
        { orderId, decision, client_id }
      );

      if (response.status) {
        alert(response.data.message);
      } else {
        alert("Failed to process order");
      }
    } catch (error) {
      console.error(
        `Error ${decision === "accept" ? "accepting" : "rejecting"} order:`,
        error
      );
      alert(`Error ${decision === "accept" ? "accepting" : "rejecting"} order`);
    }
  };

  const [userChat, setUserChat] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (roomKey) => {
    setRoom(roomKey);
    setUserChat(organizeUsername);

    if (userChat !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      <section id="sidebar">
        <ul className="side-menu top font">
          <li className={activeMenuItem === "Dashboard" ? "active" : ""}>
            <Link to="#" onClick={() => setActiveMenuItem("Dashboard")}>
              <BiSolidDashboard className="bx bxs-dashboard" />
              <span className="">Dashboard</span>
            </Link>
          </li>
        </ul>
      </section>

      <section id="content">
        <main>
          {activeMenuItem === "Dashboard" && (
            <div>
              <div className="head-title font">
                <div className="left">
                  <h1 className="font">Dashboard</h1>
                </div>
                <div className="button" onClick={handleAddEventClick}>
                  <span className="">Add Event</span>
                </div>
              </div>
              <ul className="box-info font">
                <li>
                  <BiSolidCalendar className="bx" />
                  <span className="text">
                    <h3>5</h3>
                    <p>New Order</p>
                  </span>
                </li>
                <li>
                  <BiGroup className="bx" />
                  <span className="text">
                    <h3>20</h3>
                    <p>Visitors</p>
                  </span>
                </li>
                <li>
                  <BiDollarCircle className="bx" />
                  <span className="text">
                    <h3>45000</h3>
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
                      <tr className="text font">
                        <th className=" recentOrders">Client</th>
                        <th className=" recentOrders">Venue</th>
                        <th className=" recentOrders">Services</th>
                        <th className=" recentOrders">Status</th>
                        <th className="recentOrders">Message</th>
                        <th className=" recentOrders">Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loadingData ? (
                        <tr>
                          <td colSpan="4">Loading...</td>
                        </tr>
                      ) : (
                        clientOrders.allOrders &&
                        clientOrders.allOrders.map((dataItem, index) => (
                          <tr className="font" key={index}>
                            <td className=" recentOrders">
                              {dataItem.client_username}
                            </td>
                            <td className=" recentOrders">{dataItem.venue}</td>
                            <td className=" flexColStart">
                              {dataItem.services_list.map((service, i) => (
                                <span key={i}>
                                  {service.name}
                                  {i < dataItem.services_list.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </td>
                            <td className=" recentOrders">
                              {dataItem.order_status}
                            </td>
                            <td className=" recentOrders">
                              <button
                                onClick={() =>
                                  joinRoom(dataItem._id)
                                }
                                className="btn btn-sm btn-primary"
                              >
                                Message
                              </button>
                            </td>
                            <td className="flexStart flexCenter">
                              <button
                                onClick={() =>
                                  handleDecision(
                                    "accept",
                                    dataItem._id,
                                    dataItem.client_id
                                  )
                                }
                                className="btn btn-sm btn-primary"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleDecision(
                                    "reject",
                                    dataItem._id,
                                    dataItem.client_id
                                  )
                                }
                                className="btn btn-danger btn-sm"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {showAddEventForm && (
                <div className="supplierInfoOverlay font">
                  <div className="supplierInfoContainer addEvent flexColCenter">
                    <div>
                      <h1 className="font text">Add Your Event</h1>
                    </div>
                    <div>
                      <form
                        onSubmit={handleFormSubmit}
                        className="flexColCenter eventForm"
                      >
                        <div className="flexCenter eventFormField">
                          <div className="form-group flexColCenter inputs1">
                            <label className="text" htmlFor="venue">
                              Venue:
                            </label>
                            <input
                              className="input1"
                              type="text"
                              id="venue"
                              value={venue}
                              onChange={(e) => setVenue(e.target.value)}
                            />
                          </div>

                          <div className="form-group flexColCenter">
                            <label className="text" htmlFor="category">
                              Category:
                            </label>
                            <Form.Select
                              className="input1"
                              id="category"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              <option value="">Select Category</option>
                              <option value="wedding">Wedding</option>
                              <option value="meeting">Meeting</option>
                              <option value="party">Party</option>
                              <option value="reception">Reception</option>
                            </Form.Select>
                          </div>

                          <div className="form-group flexColCenter">
                            <label className="text" htmlFor="city">
                              City:
                            </label>
                            <Form.Select
                              className="input1"
                              id="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            >
                              <option value="">Select City</option>
                              <option value="karachi">Karachi</option>
                              <option value="islamabad">Islamabad</option>
                              <option value="dera allah yar">
                                Dera Allah Yar
                              </option>
                              <option value="sukkur">Sukkur</option>
                              <option value="jacobabad">Jacobabad</option>
                              <option value="hyderabad">Hyderabad</option>
                            </Form.Select>
                          </div>

                          <div className="form-group flexColCenter">
                            <label className="text" htmlFor="state">
                              State:
                            </label>
                            <Form.Select
                              className="input1"
                              id="state"
                              value={state1}
                              onChange={(e) => setState(e.target.value)}
                            >
                              <option value="">Select Province</option>
                              <option value="sindh">Sindh</option>
                              <option value="balochistan">Balochistan</option>
                              <option value="punjab">Punjab</option>
                              <option value="kpk">KPK</option>
                            </Form.Select>
                          </div>

                          <div
                            style={{ width: "100%", height: "100%" }}
                            className="form-group flexColCenter inputs1"
                          >
                            <label className="text" htmlFor="description">
                              Description:
                            </label>
                            <textarea
                              className="input1 des"
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="form-group flexColCenter eventFormField">
                          <h3 className="font text">Add Services:</h3>
                          {services.map((service, index) => (
                            <div key={index} className="flexColCenter">
                              <div className="">
                                <Form.Select
                                  className="inputs1"
                                  value={service.name}
                                  onChange={(e) =>
                                    handleServiceNameChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select Services</option>
                                  <option value="Camera man">Camera Man</option>
                                  <option value="Catering">Catering</option>
                                  <option value="Chairs">Chairs</option>
                                  <option value="Decoration">Decoration</option>
                                  <option value="Food">Food</option>
                                  <option value="Stage">Stage</option>
                                  <option value="Hall">Hall</option>
                                  <option value="Dj floor">DJ Floor</option>
                                  <option value="Music system">
                                    Music System
                                  </option>
                                </Form.Select>
                              </div>
                              <div className="inputs1">
                                <input
                                  className="input1 "
                                  type="number"
                                  placeholder="Service Price"
                                  value={service.price}
                                  onChange={(e) =>
                                    handleServicePriceChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <button
                                className="button margin"
                                type="button"
                                onClick={() => handleRemoveService(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <br />
                          <button
                            className="button"
                            type="button"
                            onClick={handleAddService}
                          >
                            Add Service
                          </button>
                          <br />
                          <div>
                            <div className="flexColCenter eventFormField">
                              <label className="text" htmlFor="image">
                                Image:
                              </label>
                              <input
                                className="input1"
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                            </div>
                            <div className="flexCenter imageSet">
                              {image && (
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="Uploaded Image"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="eventFormField paddings flexCenter">
                          <button className="button margin" type="submit">
                            Submit
                          </button>
                          <button
                            className="button margin"
                            onClick={() => {
                              setShowAddEventForm(null);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
         
         {showChat && (
                <div>
                  <Chat socket={socket} username={userChat} room={room} />
                  <button className="button"onClick={()=> setShowChat(false)}>Close Chat</button>
                </div>
              )}
        </main>
      </section>
    </div>
  );
};

export default AdminHub;
