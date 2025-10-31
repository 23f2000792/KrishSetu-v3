
import React from 'react';
import { UserGroupIcon } from '../components/IconComponents';

export const CommunityHub: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 mt-10 border border-gray-200/50">
        <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Community Hub</h1>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
          This feature is coming soon! Connect with fellow farmers, share knowledge, and grow together.
        </p>
      </div>
    </div>
  );
};
