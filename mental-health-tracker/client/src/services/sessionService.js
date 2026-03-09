import api from './api';

const sessionService = {
    startSession: async (type = 'work', duration = 25) => {
        try {
            const response = await api.post('/api/v1/sessions/start', {
                type,
                duration
            });
            return response.data;
        } catch (error) {
            console.error('Error starting session:', error);
            throw error;
        }
    },

    completeSession: async (sessionId) => {
        try {
            const response = await api.put(`/api/v1/sessions/${sessionId}/complete`);
            return response.data;
        } catch (error) {
            console.error('Error completing session:', error);
            throw error;
        }
    }
};

export default sessionService;