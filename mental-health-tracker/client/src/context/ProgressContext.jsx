import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState({
        journalStreak: 0,
        totalSessions: 0,
        moodTrend: 'stable',
        completedTasks: 0,
        weeklyGoals: {
            journal: 7,
            focus: 5,
            tasks: 10
        },
        lastUpdate: new Date()
    });

    const updateProgress = (newData) => {
        setProgress(prev => ({
            ...prev,
            ...newData,
            lastUpdate: new Date()
        }));
    };

    return (
        <ProgressContext.Provider value={{ progress, updateProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};