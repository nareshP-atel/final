import api from './api';

const insightsService = {
    getStats: async () => {
        try {
            const response = await api.get('/insights/stats');
            return response.data;
        } catch (error) {
            console.error('Error fetching insights:', error);
            throw error;
        }
    }
};

export default insightsService;