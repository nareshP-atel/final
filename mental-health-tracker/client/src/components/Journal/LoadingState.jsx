import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <motion.div 
      className="loading-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="loading-spinner" />
      <p>Loading your journal...</p>
    </motion.div>
  );
}