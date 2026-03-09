import React from 'react';
import { motion } from 'framer-motion';

const TaskProgress = ({ tasks }) => {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div className="task-progress">
      <div className="progress-stats">
        <span>{completed}/{total} Tasks</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default TaskProgress;