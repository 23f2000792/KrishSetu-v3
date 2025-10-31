import React, { useState, useCallback } from 'react';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/Header';
import { LeafScanner } from './pages/LeafScanner';
import { SoilAnalyzer } from './pages/SoilAnalyzer';
import { MarketView } from './pages/MarketView';
import { PostHarvest } from './pages/PostHarvest';
import { CommunityHub } from './pages/CommunityHub';
import { KrishiChat } from './pages/KrishiChat';
import { History } from './pages/History';
import { PlantAnalysisResult, SoilAnalysisResult, AnalysisHistoryItem } from './types';

export type View = 'dashboard' | 'leaf_scanner' | 'soil_analyzer' | 'market_view' | 'post_harvest' | 'community_hub' | 'chat' | 'history';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistoryItem[]>([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  const handleAnalysisComplete = useCallback((result: PlantAnalysisResult | SoilAnalysisResult, previewUrl: string, type: 'Leaf' | 'Soil') => {
    const newHistoryItem: AnalysisHistoryItem = {
      ...result,
      type,
      previewUrl,
    };
    setAnalysisHistory(prev => [newHistoryItem, ...prev]);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'leaf_scanner':
        return <LeafScanner onAnalysisComplete={handleAnalysisComplete} />;
      case 'soil_analyzer':
        return <SoilAnalyzer onAnalysisComplete={handleAnalysisComplete} />;
      case 'market_view':
        return <MarketView />;
      case 'post_harvest':
        return <PostHarvest />;
      case 'community_hub':
        return <CommunityHub />;
      case 'chat':
        return <KrishiChat />;
      case 'history':
        return <History history={analysisHistory} onNewAnalysis={() => handleNavigate('dashboard')} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F5ED]">
      <Header onNavigate={handleNavigate} currentView={currentView} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
