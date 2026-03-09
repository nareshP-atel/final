import React from 'react';
import { motion } from 'framer-motion';

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <motion.div 
      className="loading-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="loading-spinner" />
      <p>{message}</p>
    </motion.div>
  );
};

export default LoadingState;