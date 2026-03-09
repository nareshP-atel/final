import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/apiService';
import './Insights.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Add default chart data
const defaultChartData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: ['#4CAF50', '#2196F3', '#F44336', '#FF9800']
    }]
};

const Insights = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [productivityData, setProductivityData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Focus Minutes',
                data: [],
                borderColor: '#2196F3',
                tension: 0.4
            },
            {
                label: 'Sessions Count',
                data: [],
                borderColor: '#4CAF50',
                tension: 0.4
            }
        ]
    });
    // Add summary stats state
    const [summaryStats, setSummaryStats] = useState({
        totalSessions: 0,
        totalMinutes: 0,
        averageCompletion: 0,
        completion: {
            score: 0
        }
    });

    useEffect(() => {
        fetchProductivityInsights();
    }, []);

    const fetchProductivityInsights = async () => {
        try {
            const response = await apiService.getProductivityInsights();
            if (response.success) {
                const { daily, summary } = response.stats;

                setProductivityData({
                    labels: daily.map(day => day._id),
                    datasets: [
                        {
                            label: 'Focus Minutes',
                            data: daily.map(day => day.totalMinutes),
                            borderColor: '#2196F3',
                            tension: 0.4
                        },
                        {
                            label: 'Sessions Count',
                            data: daily.map(day => day.sessionsCount),
                            borderColor: '#4CAF50',
                            tension: 0.4,
                            yAxisID: 'sessions'
                        }
                    ]
                });

                setSummaryStats({
                    totalSessions: summary.totalSessions,
                    totalMinutes: summary.totalMinutes,
                    averageCompletion: summary.averageCompletion,
                    completion: {
                        score: summary.averageCompletion
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching insights:', error);
            toast.error('Failed to load productivity insights');
        }
    };

    const renderProductivityMetrics = () => {
        if (!summaryStats) return null;

        return (
            <div className="productivity-metrics">
                <div className="metric-card">
                    <h3>Productivity Score</h3>
                    <div className="score">{summaryStats.averageCompletion}%</div>
                </div>
                <div className="metric-card">
                    <h3>Total Focus Time</h3>
                    <div className="time">{Math.round(summaryStats.totalMinutes / 60)} hours</div>
                </div>
                <div className="metric-card">
                    <h3>Sessions Completed</h3>
                    <div className="sessions">{summaryStats.totalSessions}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="insights-container">
            <div className="insights-header">
                <h1>Your Insights & Analytics</h1>
                <p>Track your progress and discover patterns</p>
            </div>

            <div className="insights-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'mood' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mood')}
                >
                    Mood Analysis
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'productivity' ? 'active' : ''}`}
                    onClick={() => setActiveTab('productivity')}
                >
                    Productivity
                </button>
            </div>

            <div className="insights-content">
                {activeTab === 'productivity' && (
                    <>
                        {renderProductivityMetrics()}
                        <div className="chart-card large">
                            <h2>Weekly Focus Time</h2>
                            <Line 
                                data={productivityData}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Minutes'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </>
                )}
                {/* ...existing content... */}
            </div>
        </div>
    );
};

export default Insights;