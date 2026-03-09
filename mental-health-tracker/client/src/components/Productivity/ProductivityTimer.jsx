import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/apiService';
import './ProductivityTimer.css';

const ProductivityTimer = ({ onSessionComplete }) => {
    const [session, setSession] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startNewSession = async (taskData) => {
        try {
            const response = await apiService.startFocusSession(taskData);
            if (response.success) {
                setSession(response.session);
                setTimeLeft(response.session.targetDuration * 60);
                setIsRunning(true);
                toast.success('Focus session started!');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to start session');
        }
    };

    const updateProgress = useCallback(async (progress) => {
        if (!session) return;

        try {
            const response = await apiService.updateSessionProgress(session._id, progress);
            if (response.success) {
                setSession(response.session);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update progress');
        }
    }, [session]);

    const endCurrentSession = async (notes) => {
        if (!session) return;

        try {
            const response = await apiService.endSession(session._id, { notes });
            if (response.success) {
                setSession(null);
                setIsRunning(false);
                onSessionComplete?.(response.session);
                toast.success('Session completed!');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to end session');
        }
    };

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1;
                    const progress = Math.round(
                        ((session.targetDuration * 60 - newTime) / (session.targetDuration * 60)) * 100
                    );
                    updateProgress(progress);
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0 && session) {
            endCurrentSession('Time completed');
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft, session, updateProgress]);

    return (
        <div className="productivity-timer">
            <div className="timer-display">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            {!session ? (
                <button 
                    onClick={() => startNewSession({
                        taskTitle: 'Focus Session',
                        targetDuration: 25,
                        type: 'focus'
                    })}
                    className="start-button"
                >
                    Start Focus Session
                </button>
            ) : (
                <button 
                    onClick={() => endCurrentSession('Session manually ended')}
                    className="end-button"
                >
                    End Session
                </button>
            )}
        </div>
    );
};

export default ProductivityTimer;