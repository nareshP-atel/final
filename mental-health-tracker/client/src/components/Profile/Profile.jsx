import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
        }
        setUser(userData);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
                    <span>{user?.name?.charAt(0).toUpperCase()}</span>
                    {showDropdown && (
                        <div className="profile-dropdown">
                            <div className="dropdown-item">
                                <i className="fas fa-user"></i>
                                Profile
                            </div>
                            <div className="dropdown-item">
                                <i className="fas fa-cog"></i>
                                Settings
                            </div>
                            <div className="dropdown-item" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-info">
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                        <div className="stats-grid">
                            <div className="stat-box">
                                <h3>Journal Entries</h3>
                                <span>0</span>
                            </div>
                            <div className="stat-box">
                                <h3>Tasks</h3>
                                <span>0</span>
                            </div>
                            <div className="stat-box">
                                <h3>Focus Sessions</h3>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;