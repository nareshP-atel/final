import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SessionSummary({ show, onClose, sessionData }) {
  if (!show || !sessionData) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="session-summary"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <h3>Session Complete!</h3>
        <div className="summary-content">
          <p>Type: {sessionData.type}</p>
          <p>Duration: {sessionData.duration} minutes</p>
          <p>Tasks Completed: {sessionData.tasksCompleted}</p>
        </div>
        <button onClick={onClose}>Close</button>
      </motion.div>
    </AnimatePresence>
  );
}