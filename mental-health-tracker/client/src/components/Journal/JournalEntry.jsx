import React from 'react';
import { motion } from 'framer-motion';

const JournalEntry = ({ entry }) => {
    return (
        <motion.div 
            className="journal-entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="entry-header">
                <span className="mood">{entry.mood}</span>
                <span className="date">{new Date(entry.date).toLocaleDateString()}</span>
            </div>
            <p className="content">{entry.content}</p>
        </motion.div>
    );
};

export default JournalEntry;