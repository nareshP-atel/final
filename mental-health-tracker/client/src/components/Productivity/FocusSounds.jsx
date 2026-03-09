import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

const FocusSounds = () => {
  const [playing, setPlaying] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const sounds = [
    { id: 'rain', label: '🌧️ Rain', url: '/sounds/rain.mp3', color: '#4299E1' },
    { id: 'cafe', label: '☕ Cafe', url: '/sounds/cafe.mp3', color: '#9F7AEA' },
    { id: 'nature', label: '🌳 Nature', url: '/sounds/nature.mp3', color: '#48BB78' },
    { id: 'whitenoise', label: '⚪ White Noise', url: '/sounds/whitenoise.mp3', color: '#718096' }
  ];

  const handleSoundPlay = (sound) => {
    if (playing === sound.id) {
      audioRef.current.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(sound.url);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.play();
      setPlaying(sound.id);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <motion.div 
      className="focus-sounds"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="focus-sounds-header">
        <h3>🎵 Focus Sounds</h3>
        <div className="volume-control">
          {volume === 0 ? <HiVolumeOff /> : <HiVolumeUp />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div className="sound-buttons">
        {sounds.map(sound => (
          <motion.button
            key={sound.id}
            onClick={() => handleSoundPlay(sound)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`sound-button ${playing === sound.id ? 'playing' : ''}`}
            style={{ 
              '--button-color': sound.color,
              background: playing === sound.id ? sound.color : 'transparent',
              color: playing === sound.id ? 'white' : sound.color,
              borderColor: sound.color
            }}
          >
            {sound.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FocusSounds;