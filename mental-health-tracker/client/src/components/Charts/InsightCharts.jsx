import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export const ProductivityTrend = ({ dailyStats }) => {
    const data = {
        labels: dailyStats.map(stat => stat.date),
        datasets: [{
            label: 'Focus Minutes',
            data: dailyStats.map(stat => stat.duration),
            borderColor: '#4CAF50',
            tension: 0.1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Daily Productivity Trend'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Minutes'
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export const MoodDistribution = ({ moodTrends }) => {
    const data = {
        labels: moodTrends.map(trend => trend.mood),
        datasets: [{
            data: moodTrends.map(trend => trend.frequency),
            backgroundColor: [
                '#4CAF50', // happy
                '#F44336', // angry
                '#2196F3', // sad
                '#FFC107', // anxious
                '#9C27B0'  // other
            ]
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Mood Distribution'
            }
        }
    };

    return <Doughnut data={data} options={options} />;
};

export const CompletionRateChart = ({ completionRate }) => {
    const data = {
        labels: ['Completed', 'Incomplete'],
        datasets: [{
            data: [completionRate, 100 - completionRate],
            backgroundColor: ['#4CAF50', '#ff9800']
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Session Completion Rate'
            }
        }
    };

    return <Doughnut data={data} options={options} />;
};