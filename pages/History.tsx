
import React, { useState } from 'react';
import { AnalysisHistoryItem, PlantAnalysisResult, SoilAnalysisResult } from '../types';
import { PlantResultCard } from '../components/PlantResultCard';
import { SoilResultCard } from '../components/SoilResultCard';
import { HistoryIcon, LeafIcon, BeakerIconSolid } from '../components/IconComponents';

interface HistoryProps {
  history: AnalysisHistoryItem[];
  onNewAnalysis: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onNewAnalysis }) => {
  const [selectedItem, setSelectedItem] = useState<AnalysisHistoryItem | null>(null);
  
  if (selectedItem) {
    // Fix: Remove intermediate variables and use type narrowing directly on `selectedItem`.
    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setSelectedItem(null)} className="mb-6 text-green-600 font-semibold hover:underline">
          &larr; Back to History
        </button>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 items-start">
            <img src={selectedItem.previewUrl} alt="Analyzed asset" className="w-full h-auto object-cover rounded-tl-2xl rounded-bl-2xl shadow-md"/>
            <div className="p-6">
             {/* Fix: Use the discriminator 'type' to correctly render the component and pass the correctly typed props. */}
             {selectedItem.type === 'Leaf' ? <PlantResultCard result={selectedItem} /> : <SoilResultCard result={selectedItem} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
        <div className="text-center max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 mt-10 border border-gray-200/50">
            <HistoryIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">No Analysis History</h2>
            <p className="text-gray-500 mt-2 mb-6">Your past leaf and soil health analyses will appear here.</p>
            <button onClick={onNewAnalysis} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300">
                Go to Dashboard
            </button>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Analysis History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {history.map(item => {
          // Fix: Use type narrowing to safely access properties based on the item type.
          const title = item.type === 'Leaf'
            ? (item.isHealthy ? 'Healthy Leaf' : item.diseaseName || 'Disease Detected')
            : `${item.overallHealth} Soil`;
          
          return (
            <div key={item.id} onClick={() => setSelectedItem(item)} className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden cursor-pointer group hover:shadow-xl hover:border-green-300 transition-all duration-300">
              <div className="relative">
                 <img src={item.previewUrl} alt="History thumbnail" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"/>
                 <div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                    {item.type === 'Leaf' ? <LeafIcon className="h-5 w-5 text-green-600" /> : <BeakerIconSolid className="h-5 w-5 text-orange-600" />}
                 </div>
              </div>
              <div className="p-4">
                <p className={`font-bold text-lg truncate text-gray-800`}>
                  {title}
                </p>
                <p className="text-sm text-gray-500 mt-1">{new Date(item.date).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
