import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get('/admin/dashboard');
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="👥"
          title="Total Students"
          value={analytics.totalStudents || 0}
          color="#3B82F6"
        />
        <StatCard
          icon="📚"
          title="Total Subjects"
          value={analytics.totalSubjects || 0}
          color="#8B5CF6"
        />
        <StatCard
          icon="📋"
          title="Total Results"
          value={analytics.totalResults || 0}
          color="#EC4899"
        />
        <StatCard
          icon="⭐"
          title="Average Score"
          value={Math.round(analytics.averageScore || 0)}
          color="#F59E0B"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin/students" className="block p-3 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100">
              <p className="font-semibold text-blue-600">➕ Add New Student</p>
              <p className="text-sm text-gray-600">Register a new student account</p>
            </a>
            <a href="/admin/subjects" className="block p-3 hover:bg-purple-50 rounded-lg transition-colors border border-purple-100">
              <p className="font-semibold text-purple-600">➕ Add New Subject</p>
              <p className="text-sm text-gray-600">Create a new subject</p>
            </a>
            <a href="/admin/results" className="block p-3 hover:bg-pink-50 rounded-lg transition-colors border border-pink-100">
              <p className="font-semibold text-pink-600">➕ Add Result</p>
              <p className="text-sm text-gray-600">Enter student results</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Info</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">System Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ Operational
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Database</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ Connected
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm text-gray-700">Last Update</span>
              <span className="text-sm text-gray-600">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;