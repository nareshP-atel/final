import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <motion.nav 
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <Link to="/" className="nav-logo">
                🧠 Mental Tracker
            </Link>
            
            <div className="nav-links">
                {token ? (
                    <>
                        <Link to="/journal">Journal</Link>
                        <Link to="/productivity">Productivity</Link>
                        <Link to="/insights">Insights</Link>
                        <Link to="/community">Community</Link>
                        <Link to="/settings">Settings</Link>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                <NavLink to="/tasks" className={({isActive}) => isActive ? 'active' : ''}>
                    Tasks
                </NavLink>
            </div>
        </motion.nav>
    );
};

export default Navbar;