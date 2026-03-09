import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import apiService from '../../services/apiService';
import './Journal.css';

const Journal = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({
        title: '',
        content: '',
        mood: 'neutral',
        tags: []
    });

    const fetchEntries = async () => {
        try {
            const response = await apiService.getJournalEntries();
            if (response.success) {
                setEntries(response.journals);
            } else {
                toast.error(response.message || 'Failed to fetch entries');
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
            toast.error('Failed to load journal entries');
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchEntries();
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!newEntry.title || !newEntry.content) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            // Add form button type and onSubmit handler
            const response = await apiService.createJournalEntry({
                title: newEntry.title.trim(),
                content: newEntry.content.trim(),
                mood: newEntry.mood,
                tags: newEntry.tags
            });
            
            console.log('Create journal response:', response); // Debug log

            if (response.success) {
                toast.success('Journal entry saved!');
                setNewEntry({
                    title: '',
                    content: '',
                    mood: 'neutral',
                    tags: []
                });
                await fetchEntries(); // Refresh entries immediately
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Journal creation error:', error);
            toast.error('Failed to save journal entry');
        }
    };

    return (
        <div className="journal-layout">
            <div className="journal-header">
                <h1>Journal Entries</h1>
                <p>Express your thoughts and track your journey</p>
            </div>

            <div className="journal-content">
                <form onSubmit={handleSubmit} className="journal-form">
                    <input
                        type="text"
                        placeholder="Entry Title"
                        value={newEntry.title}
                        onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                        className="journal-input"
                        required
                    />
                    <textarea
                        placeholder="Write your thoughts..."
                        value={newEntry.content}
                        onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                        className="journal-textarea"
                        required
                    />
                    <div className="form-controls">
                        <select 
                            value={newEntry.mood}
                            onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
                            className="mood-select"
                        >
                            <option value="happy">Happy</option>
                            <option value="neutral">Neutral</option>
                            <option value="sad">Sad</option>
                            <option value="anxious">Anxious</option>
                        </select>
                        <button type="submit" className="submit-button">Save Entry</button>
                    </div>
                </form>

                <div className="entries-list">
                    {entries.length === 0 ? (
                        <div className="empty-journal">
                            <i className="fas fa-book-open"></i>
                            <p>No entries yet. Start writing!</p>
                        </div>
                    ) : (
                        entries.map(entry => (
                            <div key={entry._id} className={`journal-entry mood-${entry.mood}`}>
                                <h3>{entry.title}</h3>
                                <p>{entry.content}</p>
                                <div className="entry-footer">
                                    <span className="mood-tag">{entry.mood}</span>
                                    <span className="entry-date">
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Journal;