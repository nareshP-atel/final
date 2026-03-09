import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const SessionsLineChart = ({ sessions }) => {
    const data = {
        labels: sessions.map(s => new Date(s.startTime).toLocaleDateString()),
        datasets: [{
            label: 'Focus Duration (minutes)',
            data: sessions.map(s => s.duration),
            borderColor: '#4CAF50',
            tension: 0.1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Focus Sessions Over Time'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Line data={data} options={options} />;
};

export const ProductivityDonutChart = ({ stats }) => {
    if (!stats || typeof stats.completedSessions === 'undefined') {
        return <div>No statistics available</div>;
    }

    const data = {
        labels: ['Completed', 'Pending'],
        datasets: [{
            data: [stats.completedSessions, stats.totalSessions - stats.completedSessions],
            backgroundColor: ['#4CAF50', '#f0f0f0']
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Session Completion Rate'
            }
        }
    };

    return <Doughnut data={data} options={options} />;
};

export const WeeklyStatsBar = ({ weeklyData }) => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Focus Minutes',
            data: weeklyData,
            backgroundColor: '#2196F3'
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weekly Focus Distribution'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Bar data={data} options={options} />;
};