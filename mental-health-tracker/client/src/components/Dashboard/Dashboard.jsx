import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        journalCount: 0,
        taskCount: 0,
        moodScore: 0,
        focusTime: 0
    });

    return (
        <div className="dashboard-layout">
            <nav className="dashboard-nav">
                <div className="nav-brand">Mental Tracker</div>
                <div className="nav-links">
                    <Link to="/journal">Journal</Link>
                    <Link to="/productivity">Productivity</Link>
                    <Link to="/insights">Insights</Link>
                    <Link to="/community">Community</Link>
                </div>
                <div className="profile-section">
                    <div className="profile-dropdown">
                        <div className="profile-trigger">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                                alt="profile" 
                                className="profile-avatar"
                            />
                            <span>{user?.name}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="dashboard-main">
                <div className="welcome-section">
                    <h1>Welcome back, {user?.name}!</h1>
                    <p>Track your mental wellness journey</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <i className="fas fa-book"></i>
                        <h3>Journal Entries</h3>
                        <p>{stats.journalCount}</p>
                    </div>
                    <div className="stat-card">
                        <i className="fas fa-tasks"></i>
                        <h3>Tasks Completed</h3>
                        <p>{stats.taskCount}</p>
                    </div>
                    <div className="stat-card">
                        <i className="fas fa-smile"></i>
                        <h3>Mood Score</h3>
                        <p>{stats.moodScore}/10</p>
                    </div>
                    <div className="stat-card">
                        <i className="fas fa-clock"></i>
                        <h3>Focus Time</h3>
                        <p>{stats.focusTime} hrs</p>
                    </div>
                </div>

                <div className="content-grid">
                    <div className="content-card recent-journals">
                        <h2>Recent Journal Entries</h2>
                        <div className="empty-state">
                            <i className="fas fa-book-open"></i>
                            <p>Start writing your thoughts</p>
                            <Link to="/journal" className="action-button">
                                Write Entry
                            </Link>
                        </div>
                    </div>

                    <div className="content-card mood-tracker">
                        <h2>Mood Overview</h2>
                        <div className="empty-state">
                            <i className="fas fa-chart-line"></i>
                            <p>Track your daily mood</p>
                            <Link to="/insights" className="action-button">
                                Check Insights
                            </Link>
                        </div>
                    </div>

                    <div className="content-card community-feed">
                        <h2>Community Updates</h2>
                        <div className="empty-state">
                            <i className="fas fa-users"></i>
                            <p>Connect with others</p>
                            <Link to="/community" className="action-button">
                                Join Discussion
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;