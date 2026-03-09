import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import apiService from '../../services/apiService';
import './MoodTracker.css';

const MOOD_TYPES = {
    'GREAT': { emoji: '😊', value: 5 },
    'GOOD': { emoji: '🙂', value: 4 },
    'OKAY': { emoji: '😐', value: 3 },
    'BAD': { emoji: '😕', value: 2 },
    'TERRIBLE': { emoji: '😢', value: 1 }
};

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    loadMoodData();
  }, []);

  const loadMoodData = async () => {
    try {
      const response = await apiService.getMoodData();
      setMoods(response.data);
    } catch (error) {
      console.error('Failed to load mood data:', error);
    }
  };

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    try {
      await apiService.recordMood({
        mood: selectedMood,
        note,
        timestamp: new Date()
      });
      await loadMoodData();
      setSelectedMood(null);
      setNote('');
    } catch (error) {
      console.error('Failed to record mood:', error);
    }
  };

  const chartData = {
    labels: moods.map(d => new Date(d.timestamp).toLocaleDateString()),
    datasets: [{
      label: 'Mood Level',
      data: moods.map(d => MOOD_TYPES[d.mood].value),
      borderColor: '#4CAF50',
      tension: 0.4
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            return Object.entries(MOOD_TYPES).find(([_, m]) => m.value === value)?.[0] || '';
          }
        }
      }
    }
  };

  return (
    <div className="mood-tracker">
      <h2>Mood Tracker</h2>
      
      <form onSubmit={handleMoodSubmit} className="mood-form">
        <div className="mood-selector">
          {Object.entries(MOOD_TYPES).map(([mood, { emoji }]) => (
            <button
              key={mood}
              type="button"
              className={`mood-button ${selectedMood === mood ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood)}
            >
              <span className="mood-emoji">{emoji}</span>
              <span className="mood-label">{mood}</span>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about how you're feeling..."
          className="mood-note"
        />

        <button 
          type="submit" 
          className="submit-button"
          disabled={!selectedMood}
        >
          Record Mood
        </button>
      </form>

      <div className="mood-chart">
        <h3>Mood History</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MoodTracker;