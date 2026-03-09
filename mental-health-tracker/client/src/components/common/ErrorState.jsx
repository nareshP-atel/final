import React from 'react';
import { motion } from 'framer-motion';

const ErrorState = ({ message, onRetry }) => {
  return (
    <motion.div 
      className="error-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>😕 Oops!</h2>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry}>Try Again</button>
      )}
    </motion.div>
  );
};

export default ErrorState;