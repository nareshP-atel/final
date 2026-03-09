import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../context/ProgressContext';
import './ProgressDisplay.css';

export default function ProgressDisplay() {
  const { progress, getProgressPercentage } = useProgress();

  return (
    <motion.div 
      className="achievements-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3>Your Progress</h3>
      <div className="progress-cards">
        <div className="progress-card">
          <span>📝 Journal Entries</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{width: `${getProgressPercentage('moodEntries')}%`}}
            />
          </div>
          <span>{progress.moodEntries} entries</span>
        </div>
        <div className="progress-card">
          <span>✅ Tasks Completed</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{width: `${getProgressPercentage('tasksDone')}%`}}
            />
          </div>
          <span>{progress.tasksDone} tasks</span>
        </div>
        <div className="progress-card">
          <span>⏱️ Focus Time</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{width: `${getProgressPercentage('focusMinutes')}%`}}
            />
          </div>
          <span>{progress.focusMinutes} minutes</span>
        </div>
      </div>
    </motion.div>
  );
}