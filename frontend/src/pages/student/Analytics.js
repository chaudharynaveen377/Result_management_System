import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import API from '../../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get('/student/analytics');
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  const barData = {
    labels: ['Average Marks', 'Highest Marks', 'Lowest Marks'],
    datasets: [
      {
        label: 'Marks',
        data: [analytics.averageMarks, analytics.highestMarks, analytics.lowestMarks],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const pieData = {
    labels: Object.keys(analytics.gradeDistribution || {}),
    datasets: [
      {
        data: Object.values(analytics.gradeDistribution || {}),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Performance Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Marks Overview</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Subjects</p>
            <p className="text-2xl font-bold">{analytics.totalSubjects}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Marks</p>
            <p className="text-2xl font-bold">{analytics.averageMarks?.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;