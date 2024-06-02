import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDashboard, BiMessageDots } from 'react-icons/bi';
import axios from 'axios';
import './adminhub.css';
import './ChatBox.css'; // Import the ChatBox CSS styles

const ClientHub = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
    const [clientOrders, setClientOrders] = useState({});
    const [loadingData, setLoadingData] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const clientData = localStorage.getItem('currentClient');
        if (clientData) {
            setUserData(JSON.parse(clientData));
        }

        if (activeMenuItem === 'Dashboard') {
            getOrders();
        } else if (activeMenuItem === 'Messages') {
            fetchMessages();
            const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
            return () => clearInterval(interval);
        }
    }, [activeMenuItem]);

    const getOrders = async () => {
        const organizerData = localStorage.getItem('currentOrganizer');
        if (!organizerData) {
            return; // No organizer ID available, skip fetching orders
        }

        try {
            const organizerId = JSON.parse(organizerData)._id;
            const result = await axios.get('http://localhost:4000/get/orders', {
                params: { organizerId }
            });

            if (result.status === 200) {
                setClientOrders(result.data);
                setLoadingData(true);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const result = await axios.get('http://localhost:4000/get/messages');
            if (result.status === 200) {
                setMessages(result.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        try {
            const result = await axios.post('http://localhost:4000/send/message', { message: newMessage });
            if (result.status === 200) {
                setMessages([...messages, { text: newMessage, from: 'You' }]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <section id="sidebar">
                <ul className="side-menu top font">
                    <li className={activeMenuItem === 'Dashboard' ? 'active' : ''}>
                        <Link to="#" onClick={() => setActiveMenuItem('Dashboard')}>
                            <BiSolidDashboard className="bx bxs-dashboard" />
                            <span className="">Dashboard</span>
                        </Link>
                    </li>
                    <li className={activeMenuItem === 'Messages' ? 'active' : ''}>
                        <Link to="#" onClick={() => setActiveMenuItem('Messages')}>
                            <BiMessageDots className="bx" />
                            <span className="">Messages</span>
                        </Link>
                    </li>
                </ul>
            </section>

            <section id="content">
                <main>
                    {activeMenuItem === 'Dashboard' && (
                        <div>
                            <div className="head-title font">
                                <div className="left">
                                    <h1 className="font">Dashboard</h1>
                                    {userData && (
                                        <p className="font">Welcome, {userData.client_name}</p>
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
                                                <th className="recentOrders">Client</th>
                                                <th className="recentOrders">Venue</th>
                                                <th className="recentOrders">Services</th>
                                                <th className="recentOrders">Status</th>
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
                                                        <td className="recentOrders">{dataItem.client_username}</td>
                                                        <td className="recentOrders">{dataItem.venue}</td>
                                                        <td className="recentOrders">{dataItem.services_list.name}</td>
                                                        <td className="recentOrders">{dataItem.order_status}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeMenuItem === 'Messages' && (
                        <div className="chat-box">
                            <div className="chat-header">Chat</div>
                            <div className="chat-messages">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`message ${message.from === 'You' ? 'sent' : 'received'}`}
                                    >
                                        <span className="message-text">{message.text}</span>
                                    </div>
                                ))}
                            </div>
                            <form className="chat-input" onSubmit={sendMessage}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message"
                                />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    )}
                </main>
            </section>
        </div>
    );
};

export default ClientHub;
