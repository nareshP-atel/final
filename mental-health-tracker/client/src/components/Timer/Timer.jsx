import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sessionService from '../../services/sessionService';

const Timer = () => {
    const [session, setSession] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = async (type = 'work') => {
        try {
            const newSession = await sessionService.startSession(type);
            setSession(newSession);
            setTimeLeft(newSession.duration * 60);
            setIsRunning(true);
        } catch (err) {
            console.error('Failed to start timer:', err);
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && session) {
            sessionService.completeSession(session._id);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, session]);

    return (
        <motion.div 
            className="timer-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="time-display">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="controls">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startTimer('work')}
                    disabled={isRunning}
                >
                    Start Work
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startTimer('break')}
                    disabled={isRunning}
                >
                    Take Break
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Timer;