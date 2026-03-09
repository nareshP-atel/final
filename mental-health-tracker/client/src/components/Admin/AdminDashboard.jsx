import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Routes, Route } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import apiService from '../../services/apiService';
import './AdminDashboard.css';

// Create a DashboardHome component for the main dashboard content
const DashboardHome = ({ profile, progress }) => (
    <>
        <h2>Welcome, {profile?.username}!</h2>
        <div className="stats-grid">
            <motion.div 
                className="stat-card"
                whileHover={{ scale: 1.05 }}
            >
                <h3>Journal Streak</h3>
                <p>{progress.journalStreak} days</p>
                <Link to="/journal" className="card-link">Write Journal</Link>
            </motion.div>

            <motion.div 
                className="stat-card"
                whileHover={{ scale: 1.05 }}
            >
                <h3>Focus Sessions</h3>
                <p>{progress.totalSessions} completed</p>
                <Link to="/productivity" className="card-link">Start Session</Link>
            </motion.div>

            <motion.div 
                className="stat-card"
                whileHover={{ scale: 1.05 }}
            >
                <h3>Mood Trend</h3>
                <p>{progress.moodTrend}</p>
                <Link to="/mood" className="card-link">Track Mood</Link>
            </motion.div>
        </div>
        <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
                <Link to="/journal/new" className="action-btn">New Entry</Link>
                <Link to="/productivity" className="action-btn">Focus Mode</Link>
                <Link to="/insights" className="action-btn">View Insights</Link>
                <Link to="settings" className="action-btn">Settings</Link>
            </div>
        </div>
    </>
);

// Create a Settings component
const Settings = () => (
    <div className="admin-settings">
        <h2>Admin Settings</h2>
        {/* Add your settings content here */}
    </div>
);

const AdminDashboard = () => {
    const { progress } = useProgress();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await apiService.getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to load profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <motion.div 
            className="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Routes>
                <Route index element={<DashboardHome profile={profile} progress={progress} />} />
                <Route path="settings" element={<Settings />} />
            </Routes>
        </motion.div>
    );
};

export default AdminDashboard;