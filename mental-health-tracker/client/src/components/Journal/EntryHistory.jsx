import React from 'react';
import { motion } from 'framer-motion';

const EntryHistory = ({ entries }) => {
  if (!entries.length) {
    return (
      <div className="empty-history">
        <p>No journal entries yet. Start writing to see your history!</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="entry-history"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {entries.map(entry => (
        <motion.div 
          key={entry.id} 
          className="history-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="entry-header">
            <span className="entry-mood">{entry.mood}</span>
            <span className="entry-date">{new Date(entry.date).toLocaleDateString()}</span>
          </div>
          <p className="entry-content">{entry.content}</p>
          {entry.aiMood && (
            <div className="ai-mood">AI Analysis: {entry.aiMood}</div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EntryHistory;