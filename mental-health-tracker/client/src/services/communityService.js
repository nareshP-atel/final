import api from './api';

const communityService = {
    getPosts: async () => {
        const response = await api.get('/community');
        return response.data;
    },

    createPost: async (postData) => {
        const response = await api.post('/community', postData);
        return response.data;
    },

    likePost: async (postId) => {
        const response = await api.put(`/community/${postId}/like`);
        return response.data;
    }
};

export default communityService;