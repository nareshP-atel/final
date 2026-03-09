import api from './api';

const settingsService = {
    getSettings: async () => {
        const response = await api.get('/settings');
        return response.data;
    },

    updateSettings: async (settings) => {
        const response = await api.put('/settings', settings);
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/settings/profile', profileData);
        return response.data;
    }
};

export default settingsService;