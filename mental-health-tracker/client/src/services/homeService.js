import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const homeService = {
  getDashboardData: async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  updateLastActivity: async () => {
    try {
      const response = await axios.post(`${API_URL}/dashboard/activity`);
      return response.data;
    } catch (error) {
      console.error('Error updating activity:', error);
      throw error;
    }
  }
};