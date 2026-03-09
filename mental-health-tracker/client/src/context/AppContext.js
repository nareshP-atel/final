import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/apiService';

const AppContext = createContext();

const initialState = {
    user: null,
    posts: [],
    journals: [],
    tasks: [],
    moods: [],
    insights: null,
    loading: {
        posts: false,
        journals: false,
        tasks: false,
        moods: false,
        insights: false
    },
    errors: {}
};

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: { ...state.loading, [action.payload.key]: action.payload.value }
            };
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'SET_JOURNALS':
            return { ...state, journals: action.payload };
        case 'SET_TASKS':
            return { ...state, tasks: action.payload };
        case 'SET_MOODS':
            return { ...state, moods: action.payload };
        case 'SET_INSIGHTS':
            return { ...state, insights: action.payload };
        case 'SET_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [action.payload.key]: action.payload.error }
            };
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map(post => 
                    post._id === action.payload._id ? action.payload : post
                )
            };
        case 'ADD_POST':
            return { ...state, posts: [action.payload, ...state.posts] };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const fetchAllData = async () => {
        const fetchMethods = {
            posts: apiService.getCommunityPosts,
            journals: apiService.getJournals,
            tasks: apiService.getTasks,
            moods: apiService.getMoods,
            insights: apiService.getInsights
        };

        for (const [key, fetchMethod] of Object.entries(fetchMethods)) {
            try {
                dispatch({ type: 'SET_LOADING', payload: { key, value: true } });
                const response = await fetchMethod();
                
                if (response.success) {
                    dispatch({ 
                        type: `SET_${key.toUpperCase()}`, 
                        payload: response[key] || response.data 
                    });
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                console.warn(`Failed to fetch ${key}:`, error);
                dispatch({ 
                    type: 'SET_ERROR', 
                    payload: { key, error: error.message || `Failed to load ${key}` }
                });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: { key, value: false } });
            }
        }
    };

    // Initial data fetch
    useEffect(() => {
        if (apiService.checkAuthStatus()) {
            fetchAllData();
        }
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch, fetchAllData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};