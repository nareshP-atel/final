import axios from 'axios';

// Utility functions
const handleApiError = (error, defaultMessage) => {
    console.error('API Error:', error);
    return {
        success: false,
        message: error.response?.data?.message || defaultMessage
    };
};

const logApiCall = (method, endpoint, error = null) => {
    if (error) {
        console.error(`API ${method} ${endpoint} failed:`, error);
    } else {
        console.log(`API ${method} ${endpoint} called`);
    }
};

const api = axios.create({
    baseURL: 'http://localhost:5001/api/v1'
});

// Add request interceptor for authentication
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add response interceptor
api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response?.status === 401) {
        // Token expired or invalid - clear storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

const apiService = {
    // Update only the login method
    login: async (credentials) => {
        try {
            console.log('Attempting login...', credentials.email);
            const response = await api.post('/auth/login', credentials);
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                return {
                    success: true,
                    user: response.data.user
                };
            }
            
            return response.data;
        } catch (error) {
            console.error('Login error:', error.response || error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    },

    register: async (userData) => {
        try {
            // Log registration attempt
            console.log('Attempting registration for:', userData.email);

            const response = await api.post('/auth/register', userData);
            
            // Log server response for debugging
            console.log('Registration response:', response.data);

            if (response.data && response.data.success) {
                // Store token immediately after successful registration
                localStorage.setItem('token', response.data.token);
                
                return {
                    success: true,
                    user: response.data.user,
                    token: response.data.token,
                    message: 'Registration successful!'
                };
            }

            // If we get here, the server responded but without success
            throw new Error(response.data?.message || 'Registration failed');

        } catch (error) {
            console.error('Registration failed:', error);
            
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Registration failed',
                user: null,
                token: null
            };
        }
    },

    // Community methods
    getCommunityPosts: async () => {
        try {
            const response = await api.get('/community/posts');
            return {
                success: true,
                posts: response.data.posts
            };
        } catch (error) {
            return handleApiError(error, 'Failed to fetch community posts');
        }
    },

    createPost: async (postData) => {
        try {
            const response = await api.post('/community/posts', postData);
            return response.data;
        } catch (error) {
            console.error('Create post error:', error.response?.data || error);
            throw error;
        }
    },

    likePost: async (postId) => {
        try {
            const response = await api.post(`/community/posts/${postId}/like`);
            return response.data;
        } catch (error) {
            console.error('Like post error:', error.response?.data || error);
            throw error;
        }
    },

    // Journal methods
    createJournalEntry: async (journalData) => {
        try {
            logApiCall('POST', '/journal');
            console.log('Sending journal data:', journalData); // Debug log

            const response = await api.post('/journal', journalData);
            console.log('Server response:', response.data); // Debug log
            
            if (response.data.success) {
                return {
                    success: true,
                    journal: response.data.journal,
                    message: 'Journal entry created successfully'
                };
            }
            throw new Error(response.data.message || 'Failed to create journal entry');
        } catch (error) {
            logApiCall('POST', '/journal', error);
            console.error('Journal creation error:', error.response?.data || error);
            return handleApiError(error, 'Failed to create journal entry');
        }
    },

    getJournalEntries: async () => {
        try {
            logApiCall('GET', '/journal');
            const response = await api.get('/journal');
            console.log('Fetched journal entries:', response.data); // Debug log
            
            if (response.data.success) {
                return {
                    success: true,
                    journals: response.data.journals || []
                };
            }
            throw new Error(response.data.message || 'Failed to fetch journal entries');
        } catch (error) {
            logApiCall('GET', '/journal', error);
            console.error('Journal fetch error:', error.response?.data || error);
            return handleApiError(error, 'Failed to fetch journal entries');
        }
    },

    // Task methods
    getTasks: async () => {
        try {
            logApiCall('GET', '/tasks');
            const response = await api.get('/tasks');
            return {
                success: true,
                tasks: response.data.tasks || []
            };
        } catch (error) {
            logApiCall('GET', '/tasks', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch tasks',
                tasks: []
            };
        }
    },

    createTask: async (taskData) => {
        try {
            const response = await api.post('/tasks', taskData);
            return {
                success: true,
                task: response.data.task
            };
        } catch (error) {
            return handleApiError(error, 'Failed to create task');
        }
    },

    updateTask: async (taskId, taskData) => {
        try {
            const response = await api.patch(`/tasks/${taskId}`, taskData);
            return {
                success: true,
                task: response.data.task
            };
        } catch (error) {
            return handleApiError(error, 'Failed to update task');
        }
    },

    deleteTask: async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            return {
                success: true
            };
        } catch (error) {
            return handleApiError(error, 'Failed to delete task');
        }
    },

    // Mood methods
    getMoods: async () => {
        const response = await api.get('/moods');
        return response.data;
    },

    // Insights methods
    getInsights: async () => {
        const response = await api.get('/insights');
        return response.data;
    },

    getProductivityInsights: async () => {
        try {
            const response = await api.get('/insights/productivity');
            console.log('Productivity insights response:', response.data); // Debug log

            if (response.data.success) {
                return {
                    success: true,
                    stats: response.data.stats
                };
            }
            throw new Error(response.data.message || 'Failed to fetch insights');
        } catch (error) {
            console.error('Get productivity insights error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch insights',
                stats: null
            };
        }
    },

    // Focus Session methods
    getFocusSessions: async () => {
        try {
            logApiCall('GET', '/productivity/sessions');
            const response = await api.get('/productivity/sessions');
            
            if (response.data.success) {
                return {
                    success: true,
                    sessions: response.data.sessions
                };
            }
            throw new Error(response.data.message || 'Failed to fetch focus sessions');
        } catch (error) {
            logApiCall('GET', '/productivity/sessions', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch focus sessions',
                sessions: []
            };
        }
    },

    startFocusSession: async (sessionConfig) => {
        try {
            logApiCall('POST', '/productivity/session/start');
            const response = await api.post('/productivity/session/start', sessionConfig);
            
            if (response.data.success) {
                return {
                    success: true,
                    session: response.data.session
                };
            }
            throw new Error(response.data.message || 'Failed to start focus session');
        } catch (error) {
            logApiCall('POST', '/productivity/session/start', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to start focus session'
            };
        }
    },

    updateSessionProgress: async (sessionId, progressData) => {
        try {
            logApiCall('PATCH', `/productivity/session/${sessionId}`);
            const response = await api.patch(`/productivity/session/${sessionId}`, progressData);
            
            if (response.data.success) {
                return {
                    success: true,
                    session: response.data.session
                };
            }
            throw new Error(response.data.message || 'Failed to update session');
        } catch (error) {
            logApiCall('PATCH', `/productivity/session/${sessionId}`, error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update session'
            };
        }
    },

    completeSession: async (sessionId, data) => {
        try {
            logApiCall('PATCH', `/productivity/session/${sessionId}/complete`);
            const response = await api.patch(`/productivity/session/${sessionId}/complete`, data);
            
            if (response.data.success) {
                return {
                    success: true,
                    session: response.data.session,
                    message: response.data.message
                };
            }
            throw new Error(response.data.message || 'Failed to complete session');
        } catch (error) {
            logApiCall('PATCH', `/productivity/session/${sessionId}/complete`, error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to complete session'
            };
        }
    },

    // Debug helper
    checkAuthStatus: () => {
        const token = localStorage.getItem('token');
        console.log('Current auth token:', token?.substring(0, 20) + '...');
        return !!token;
    }
};

export default apiService;