import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/student/profile');
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const ProfileField = ({ label, value }) => (
    <div className="p-4 border-b border-gray-200 last:border-b-0">
      <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
      <p className="text-lg text-gray-900 font-semibold">{value || '—'}</p>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">View and manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-white font-bold">
              {profile.name?.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600 mt-2">{profile.email}</p>
            <div className="mt-4 inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              ✓ Active
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm divide-y">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
              <ProfileField label="Email Address" value={profile.email} />
              <ProfileField label="Roll Number" value={profile.rollNumber} />
              <ProfileField label="Course" value={profile.course} />
              <ProfileField label="Current Semester" value={profile.semester} />
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Type</h3>
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
                <span className="text-2xl mr-2">👨‍🎓</span>
                <span className="font-semibold text-blue-900 capitalize">{profile.role} Account</span>
              </div>
            </div>

            <div className="p-6 bg-blue-50">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Profile Complete</h4>
                  <p className="text-sm text-blue-700">Your profile information is complete and up to date.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;