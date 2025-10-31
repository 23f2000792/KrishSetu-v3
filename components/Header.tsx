import React from 'react';
import { View } from '../App';
import { KrishiSetuLogo, LeafIcon, ChartBarIcon, BeakerIconSolid, TruckIcon, UserGroupIcon, ChatBubbleLeftRightIcon, HistoryIcon } from './IconComponents';

interface HeaderProps {
    onNavigate: (view: View) => void;
    currentView: View;
}

const viewDetails: { [key in View]: { title: string, icon: React.ReactNode } } = {
    dashboard: { title: 'Dashboard', icon: null },
    chat: { title: 'Krishi AI Copilot', icon: <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" /> },
    leaf_scanner: { title: 'Leaf Health Scanner', icon: <LeafIcon className="h-5 w-5 mr-2" /> },
    market_view: { title: 'Market Price Predictor', icon: <ChartBarIcon className="h-5 w-5 mr-2" /> },
    soil_analyzer: { title: 'Soil Analyzer', icon: <BeakerIconSolid className="h-5 w-5 mr-2" /> },
    post_harvest: { title: 'Post-Harvest Advisor', icon: <TruckIcon className="h-5 w-5 mr-2" /> },
    community_hub: { title: 'Community Hub', icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
    history: { title: 'Analysis History', icon: <HistoryIcon className="h-5 w-5 mr-2" /> },
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm border-b border-gray-200/80 mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <KrishiSetuLogo className="h-9 w-9 text-green-600" />
                        <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">Krishi Setu</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-gray-500">
                        {currentView !== 'dashboard' && (
                            <>
                                <span onClick={() => onNavigate('dashboard')} className="hover:text-green-600 cursor-pointer">Dashboard</span>
                                <span className="mx-2">/</span>
                                <div className="flex items-center text-green-700">
                                    {viewDetails[currentView].icon}
                                    <span>{viewDetails[currentView].title}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
