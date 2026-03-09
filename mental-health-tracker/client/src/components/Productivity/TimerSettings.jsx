import React from 'react';
import { motion } from 'framer-motion';
import { HiClock } from 'react-icons/hi';

export default function TimerSettings({ settings, onSettingsChange }) {
  return (
    <motion.div 
      className="timer-settings"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="settings-header">
        <HiClock />
        <h3>Timer Settings</h3>
      </div>
      <div className="settings-grid">
        <div className="setting-item">
          <label htmlFor="workTime">Work Duration</label>
          <input
            id="workTime"
            type="number"
            min="1"
            max="60"
            value={settings.work}
            onChange={(e) => onSettingsChange('work', parseInt(e.target.value) || 25)}
          />
          <span className="unit">min</span>
        </div>
        <div className="setting-item">
          <label htmlFor="breakTime">Break Duration</label>
          <input
            id="breakTime"
            type="number"
            min="1"
            max="30"
            value={settings.break}
            onChange={(e) => onSettingsChange('break', parseInt(e.target.value) || 5)}
          />
          <span className="unit">min</span>
        </div>
        <div className="setting-item">
          <label htmlFor="longBreakTime">Long Break</label>
          <input
            id="longBreakTime"
            type="number"
            min="1"
            max="45"
            value={settings.longBreak}
            onChange={(e) => onSettingsChange('longBreak', parseInt(e.target.value) || 15)}
          />
          <span className="unit">min</span>
        </div>
      </div>
    </motion.div>
  );
}