import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSolidDashboard, BiMessageDots } from "react-icons/bi";
import axios from "axios";
import io from "socket.io-client";
import "./adminhub.css";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

const ClientHub = () => {
  const authToken = localStorage.getItem("clientToken");
  const token = localStorage.getItem("currentClient");
  const userData1 = JSON.parse(token);
  const clientId = userData1._id;
  const clientUserName = userData1.client_username;

  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [clientOrders, setClientOrders] = useState({});
  const [loadingData, setLoadingData] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const [userChat, setUserChat] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const clientData = localStorage.getItem("currentClient");
    if (clientData) {
      setUserData(JSON.parse(clientData));
    }

    if (activeMenuItem === "Dashboard") {
      getOrders();
    } else if (activeMenuItem === "Messages") {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
      return () => clearInterval(interval);
    }
  }, [activeMenuItem]);

  const getOrders = async () => {
    const result = await axios.get("http://localhost:4000/get/client/orders", {
      params: {
        clientId: clientId,
      },
    });

    if (result.status) {
      setClientOrders(result.data);
      setLoadingData(true);
    }
  };

  const fetchMessages = async () => {
    try {
      const result = await axios.get("http://localhost:4000/get/messages");
      if (result.status === 200) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      const result = await axios.post("http://localhost:4000/send/message", {
        message: newMessage,
      });
      if (result.status === 200) {
        setMessages([...messages, { text: newMessage, from: "You" }]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const joinRoom = (roomKey) => {
    setRoom(roomKey);
    setUserChat(clientUserName);

    if (clientUserName !== "" && room !== "") {
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
                  {userData && (
                    <p className="font">Welcome, {userData.clientUserName}</p>
                  )}
                </div>
              </div>

              <div className="table-data font">
                <div className="order">
                  <div className="head">
                    <h3>Recent Orders</h3>
                  </div>
                  <table>
                    <thead>
                      <tr className="text font">
                        <th className="recentOrders">Organizer</th>
                        <th className="recentOrders">Venue</th>
                        <th className="recentOrders">Services</th>
                        <th className="recentOrders">Status</th>
                        <th className="recentOrders">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loadingData ? (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      ) : (
                        clientOrders.allOrders &&
                        clientOrders.allOrders.map((dataItem, index) => (
                          <tr className="font" key={index}>
                            <td className="recentOrders">
                              {dataItem.organizer_username}
                            </td>
                            <td className="recentOrders">{dataItem.venue}</td>
                            <td className="recentOrders">
                              {" "}
                              {dataItem.services_list.map((service, i) => (
                                <span key={i}>
                                  {service.name}
                                  {i < dataItem.services_list.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </td>
                            <td className="recentOrders">
                              {dataItem.order_status}
                            </td>
                            <td className="recentOrders">
                              <button
                                onClick={() =>
                                  joinRoom(dataItem._id)
                                }
                                className="btn btn-sm btn-primary"
                              >
                                Message
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {showChat && (
            <div>
              <Chat socket={socket} username={userChat} room={room} />
              <button className="button" onClick={() => setShowChat(false)}>
                Close Chat
              </button>
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default ClientHub;
