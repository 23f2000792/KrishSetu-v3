import React from 'react';
import { View } from '../App';
import { LeafIcon, ChartBarIcon, BeakerIconSolid, TruckIcon, UserGroupIcon, ChatBubbleLeftRightIcon, HistoryIcon } from '../components/IconComponents';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 hover:shadow-lg hover:-translate-y-1 hover:border-green-300 transition-all duration-300 cursor-pointer flex flex-col items-start"
  >
    <div className="p-3 bg-green-100 text-green-700 rounded-xl mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 flex-grow">{description}</p>
    <span className="text-sm font-semibold text-green-600 mt-4 group-hover:underline">Get Started &rarr;</span>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="text-left md:text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">Welcome, Farmer!</h1>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">How can Krishi Setu help you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<ChatBubbleLeftRightIcon className="h-8 w-8" />}
          title="Krishi AI Copilot"
          description="Ask any farming question in your language and get instant expert advice."
          onClick={() => onNavigate('chat')}
        />
        <FeatureCard
          icon={<LeafIcon className="h-8 w-8" />}
          title="Leaf Health Scanner"
          description="Upload a leaf image to instantly diagnose diseases or nutrient deficiencies."
          onClick={() => onNavigate('leaf_scanner')}
        />
        <FeatureCard
          icon={<ChartBarIcon className="h-8 w-8" />}
          title="Market Price Predictor"
          description="View real-time mandi price trends and AI-powered forecasts."
          onClick={() => onNavigate('market_view')}
        />
        <FeatureCard
          icon={<BeakerIconSolid className="h-8 w-8" />}
          title="Soil Analyzer"
          description="Analyze your soil health card for nutrient advice and crop recommendations."
          onClick={() => onNavigate('soil_analyzer')}
        />
         <FeatureCard
          icon={<TruckIcon className="h-8 w-8" />}
          title="Post-Harvest Advisor"
          description="Get expert strategies for storing and transporting your produce to reduce loss."
          onClick={() => onNavigate('post_harvest')}
        />
        <FeatureCard
          icon={<UserGroupIcon className="h-8 w-8" />}
          title="Community Hub"
          description="Connect with other farmers, share tips, and learn best practices."
          onClick={() => onNavigate('community_hub')}
        />
         <FeatureCard
          icon={<HistoryIcon className="h-8 w-8" />}
          title="Analysis History"
          description="Review all your past leaf and soil analysis reports in one place."
          onClick={() => onNavigate('history')}
        />
      </div>
    </div>
  );
};