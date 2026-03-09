import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <motion.div 
                className="hero-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Track Your Mental Wellbeing</h1>
                <p>Journal your thoughts, monitor productivity, and improve your mental health</p>
                <div className="cta-buttons">
                    <Link to="/register" className="cta-primary">Get Started</Link>
                    <Link to="/login" className="cta-secondary">Login</Link>
                </div>
            </motion.div>

            <div className="features-grid">
                <motion.div 
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                >
                    <h3>📝 Journaling</h3>
                    <p>Track your daily thoughts and emotions</p>
                </motion.div>

                <motion.div 
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                >
                    <h3>⏱️ Productivity</h3>
                    <p>Manage tasks and focus sessions</p>
                </motion.div>

                <motion.div 
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                >
                    <h3>📊 Insights</h3>
                    <p>Visualize your progress over time</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;