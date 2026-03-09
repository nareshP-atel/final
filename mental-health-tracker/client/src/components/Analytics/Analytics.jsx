import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
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
import apiService from '../../services/apiService';
import './Analytics.css';

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

const Analytics = () => {
    const [moodData, setMoodData] = useState({});
    const [productivityData, setProductivityData] = useState({});
    const [journalData, setJournalData] = useState({});

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        const mood = await apiService.getMoods();
        const productivity = await apiService.getProductivityStats();
        const journals = await apiService.getJournalEntries();

        // Process mood data
        const moodChartData = {
            labels: ['Happy', 'Neutral', 'Sad', 'Anxious'],
            datasets: [{
                data: [
                    mood.stats?.happy || 0,
                    mood.stats?.neutral || 0,
                    mood.stats?.sad || 0,
                    mood.stats?.anxious || 0
                ],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#F44336',
                    '#FF9800'
                ]
            }]
        };
        setMoodData(moodChartData);

        // Process productivity data
        const productivityChartData = {
            labels: productivity.stats?.map(stat => stat.date) || [],
            datasets: [{
                label: 'Focus Minutes',
                data: productivity.stats?.map(stat => stat.focusMinutes) || [],
                borderColor: '#2196F3',
                tension: 0.4
            }]
        };
        setProductivityData(productivityChartData);

        // Process journal data
        const journalChartData = {
            labels: ['Last 7 Days'],
            datasets: [{
                label: 'Journal Entries',
                data: [journals.journals?.length || 0],
                backgroundColor: '#4CAF50'
            }]
        };
        setJournalData(journalChartData);
    };

    return (
        <div className="analytics-container">
            <h1>Your Progress Analytics</h1>
            
            <div className="charts-grid">
                <div className="chart-card">
                    <h2>Mood Distribution</h2>
                    <Pie 
                        data={moodData}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Mood Distribution'
                                }
                            }
                        }}
                    />
                </div>

                <div className="chart-card">
                    <h2>Productivity Trend</h2>
                    <Line 
                        data={productivityData}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Focus Time (Minutes)'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>

                <div className="chart-card">
                    <h2>Journal Activity</h2>
                    <Bar 
                        data={journalData}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Journal Entries'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Analytics;