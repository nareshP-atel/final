import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/apiService';
import './Productivity.css';

const Productivity = () => {
    const { user } = useAuth();
    const [activeSession, setActiveSession] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [sessionHistory, setSessionHistory] = useState([]);
    const [recentSessions, setRecentSessions] = useState([]);

    // Session configuration
    const [sessionConfig, setSessionConfig] = useState({
        duration: 25,
        type: 'focus'
    });

    useEffect(() => {
        // Load previous sessions
        fetchSessionHistory();
        fetchRecentSessions();

        // Cleanup timer on unmount
        return () => {
            if (activeSession?.timerId) {
                clearInterval(activeSession.timerId);
            }
        };
    }, []);

    const fetchSessionHistory = async () => {
        const response = await apiService.getFocusSessions();
        if (response.success) {
            setSessionHistory(response.sessions);
        }
    };

    const fetchRecentSessions = async () => {
        const response = await apiService.getFocusSessions();
        if (response.success) {
            setRecentSessions(response.sessions.slice(0, 5)); // Show last 5 sessions
        }
    };

    const startSession = async () => {
        try {
            const response = await apiService.startFocusSession(sessionConfig);
            
            if (response.success) {
                const session = response.session;
                setTimeLeft(sessionConfig.duration * 60);
                
                // Start timer
                const timerId = setInterval(() => {
                    setTimeLeft(prev => {
                        if (prev <= 1) {
                            completeSession(session._id);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                setActiveSession({ ...session, timerId });
                toast.success('Focus session started!');
            }
        } catch (error) {
            toast.error('Failed to start session');
        }
    };

    const completeSession = async () => {
        try {
            if (!activeSession) return;

            // Clear the timer
            if (activeSession.timerId) {
                clearInterval(activeSession.timerId);
            }

            const response = await apiService.completeSession(activeSession._id, {
                completedMinutes: sessionConfig.duration - Math.floor(timeLeft / 60)
            });
            
            if (response.success) {
                toast.success('Session completed successfully!');
                setActiveSession(null);
                setTimeLeft(0);
                await fetchSessionHistory(); // Refresh the session list
            } else {
                toast.error(response.message || 'Failed to complete session');
            }
        } catch (error) {
            console.error('Complete session error:', error);
            toast.error('Failed to complete session');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Add this to handle early completion
    const handleCompleteClick = () => {
        if (window.confirm('Are you sure you want to end this session early?')) {
            completeSession();
        }
    };

    return (
        <div className="productivity-container">
            <div className="productivity-header">
                <h1>Focus Sessions</h1>
                <p>Stay productive with timed focus sessions</p>
            </div>

            <div className="session-configuration">
                {!activeSession && (
                    <div className="config-controls">
                        <select
                            value={sessionConfig.duration}
                            onChange={(e) => setSessionConfig({
                                ...sessionConfig,
                                duration: parseInt(e.target.value)
                            })}
                        >
                            <option value="15">15 minutes</option>
                            <option value="25">25 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>
                        <button onClick={startSession} className="start-btn">
                            Start Focus Session
                        </button>
                    </div>
                )}

                {activeSession && (
                    <div className="active-session">
                        <div className="timer">{formatTime(timeLeft)}</div>
                        <button 
                            onClick={handleCompleteClick}
                            className="complete-btn"
                        >
                            Complete Session
                        </button>
                    </div>
                )}
            </div>

            <div className="session-history">
                <h2>Recent Sessions</h2>
                <div className="history-list">
                    {sessionHistory.map(session => (
                        <div key={session._id} className="session-card">
                            <div className="session-info">
                                <span className="duration">{session.duration}min</span>
                                <span className="status">{session.status}</span>
                            </div>
                            <div className="session-date">
                                {new Date(session.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add this to your JSX */}
            <div className="recent-sessions">
                <h2>Recent Sessions</h2>
                <div className="sessions-list">
                    {recentSessions.map(session => (
                        <div key={session._id} className={`session-card ${session.status}`}>
                            <div className="session-info">
                                <span className="duration">{session.duration}min</span>
                                <span className="completion">
                                    {Math.round((session.completedMinutes / session.duration) * 100)}%
                                </span>
                            </div>
                            <div className="session-date">
                                {new Date(session.startTime).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Productivity;
