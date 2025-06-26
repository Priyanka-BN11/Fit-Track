import React from 'react';
import { Bar } from 'react-chartjs-2';

interface ProgressData {
    labels: string[];
    data: number[];
}

const ProgressDashboard: React.FC<{ progressData: ProgressData }> = ({ progressData }) => {
    const data = {
        labels: progressData.labels,
        datasets: [
            {
                label: 'Progress',
                data: progressData.data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar data={data} />;
};

export default ProgressDashboard;