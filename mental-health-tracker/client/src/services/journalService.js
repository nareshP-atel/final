import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const journalService = {
  analyzeEntry: async (content) => {
    try {
      const response = await axios.post(`${API_URL}/journal/analyze`, { content });
      return response.data;
    } catch (error) {
      console.error('Error analyzing entry:', error);
      throw error;
    }
  },

  createEntry: async (entryData) => {
    try {
      const response = await axios.post(`${API_URL}/journal/entries`, entryData);
      return response.data;
    } catch (error) {
      console.error('Error creating entry:', error);
      throw error;
    }
  }
};