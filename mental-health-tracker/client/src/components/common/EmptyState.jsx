import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ message, icon }) => {
  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="empty-icon">{icon || '📊'}</div>
      <p>{message || 'No data available'}</p>
    </motion.div>
  );
};

export default EmptyState;