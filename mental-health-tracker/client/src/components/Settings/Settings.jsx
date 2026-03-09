import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import apiService from '../../services/apiService';
import './Settings.css';

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        journalReminders: {
            enabled: true,
            frequency: 'daily',
            time: '20:00'
        },
        mentalHealthPreferences: {
            moodTracking: true,
            anxietyTracking: true,
            sleepTracking: false,
            stressTracking: true
        },
        focusSettings: {
            sessionDuration: 25,
            breakDuration: 5,
            dailyGoal: 4
        },
        privacy: {
            shareJournalEntries: false,
            shareMoodStats: false,
            shareProgress: true
        }
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const response = await apiService.getSettings();
            if (response.data) {
                setSettings(response.data);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSettingChange = async (category, setting, value) => {
        try {
            const updatedSettings = {
                ...settings,
                [category]: {
                    ...settings[category],
                    [setting]: value
                }
            };
            await apiService.updateSettings(updatedSettings);
            setSettings(updatedSettings);
            toast.success('Settings updated successfully');
        } catch (error) {
            toast.error('Failed to update settings');
        }
    };

    if (loading) {
        return (
            <div className="settings-container">
                <div className="loading">Loading settings...</div>
            </div>
        );
    }

    return (
        <motion.div 
            className="settings-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2>Mental Health Tracker Settings</h2>

            <div className="settings-grid">
                <div className="settings-section">
                    <h3>Journal Reminders</h3>
                    <div className="setting-item">
                        <label>
                            Enable Daily Reminders
                            <input
                                type="checkbox"
                                checked={settings.journalReminders.enabled}
                                onChange={(e) => handleSettingChange('journalReminders', 'enabled', e.target.checked)}
                            />
                        </label>
                    </div>
                    <div className="setting-item">
                        <label>
                            Reminder Time
                            <input
                                type="time"
                                value={settings.journalReminders.time}
                                onChange={(e) => handleSettingChange('journalReminders', 'time', e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Tracking Preferences</h3>
                    {Object.entries(settings.mentalHealthPreferences).map(([key, value]) => (
                        <div key={key} className="setting-item">
                            <label>
                                {key.split(/(?=[A-Z])/).join(' ')}
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => handleSettingChange('mentalHealthPreferences', key, e.target.checked)}
                                />
                            </label>
                        </div>
                    ))}
                </div>

                <div className="settings-section">
                    <h3>Focus Sessions</h3>
                    <div className="setting-item">
                        <label>
                            Session Duration (minutes)
                            <input
                                type="number"
                                min="5"
                                max="60"
                                value={settings.focusSettings.sessionDuration}
                                onChange={(e) => handleSettingChange('focusSettings', 'sessionDuration', parseInt(e.target.value))}
                            />
                        </label>
                    </div>
                    <div className="setting-item">
                        <label>
                            Daily Goal (sessions)
                            <input
                                type="number"
                                min="1"
                                max="12"
                                value={settings.focusSettings.dailyGoal}
                                onChange={(e) => handleSettingChange('focusSettings', 'dailyGoal', parseInt(e.target.value))}
                            />
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Privacy</h3>
                    {Object.entries(settings.privacy).map(([key, value]) => (
                        <div key={key} className="setting-item">
                            <label>
                                {key.split(/(?=[A-Z])/).join(' ')}
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;