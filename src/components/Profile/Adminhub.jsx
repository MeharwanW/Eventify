import React, { useState, useEffect } from 'react';
import { BiSmile, BiStore, BiAnalyse, BiMessageDots,BiSolidCalendar, BiGroup, BiCog, BiLogOut, BiCalendarCheck, BiDollarCircle, BiSearch, BiBell, BiPlus, BiDotsVerticalRounded, BiChevronRight, BiCloud, BiSolidDashboard } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './adminhub.css';

const AdminHub = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

    useEffect(() => {
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

        const handleClick = (e) => {
            const li = e.target.parentElement;
            setActiveMenuItem(li.textContent.trim());
        };

        allSideMenu.forEach(item => {
            item.addEventListener('click', handleClick);
        });

        return () => {
            allSideMenu.forEach(item => {
                item.removeEventListener('click', handleClick);
            });
        };
    }, []);

    const handleSearchFormToggle = () => {
        // Implement search form toggle logic here
    };

    return (
        <div>
            <section id="sidebar">
                <Link to="/" className="brand">
                    <BiSmile className='bx bxs-smile'/>

                    <span className="color-text">Eventify</span>
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
                <Link to="#" className="button">
                    <BiCloud />
                    <span className="">Download PDF</span>
                </Link >
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
                <div className="todo">
                    <div className="head">
                        <h3>Todos</h3>
                        <BiPlus />
                        <BiDotsVerticalRounded />
                    </div>
                    <ul className="todo-list">
                        <li className="completed">
                            <p>Todo List</p>
                            <BiDotsVerticalRounded />
                        </li>
                        {/* Additional todo items */}
                    </ul>
                </div>
            </div>
        </main>
            </section>
        </div>
    );
};

export default AdminHub;