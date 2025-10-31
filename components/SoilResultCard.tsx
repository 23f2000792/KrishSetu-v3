import React from 'react';
import { SoilAnalysisResult } from '../types';
import { SparklesIcon, LeafIcon } from './IconComponents';

interface SoilResultCardProps {
  result: SoilAnalysisResult;
}

const HealthBadge: React.FC<{ health: string }> = ({ health }) => {
    const colorClasses = {
        'Poor': 'bg-red-100 text-red-800',
        'Average': 'bg-yellow-100 text-yellow-800',
        'Good': 'bg-green-100 text-green-800',
        'Excellent': 'bg-blue-100 text-blue-800',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses[health] || 'bg-gray-100'}`}>{health}</span>;
}

const NutrientLevel: React.FC<{ name: string; level: string }> = ({ name, level }) => {
     const colorClasses = {
        'Low': 'bg-red-200 text-red-800',
        'Medium': 'bg-yellow-200 text-yellow-800',
        'High': 'bg-green-200 text-green-800',
    };
    return (
        <div className="flex flex-col items-center p-3 bg-white rounded-lg border">
            <p className="text-sm font-medium text-gray-600 mb-2">{name}</p>
            <div className={`w-full h-8 rounded-md flex items-center justify-center font-bold text-sm ${colorClasses[level] || 'bg-gray-200'}`}>{level}</div>
        </div>
    );
};

export const SoilResultCard: React.FC<SoilResultCardProps> = ({ result }) => {
  const { overallHealth, phLevel, nitrogen, phosphorus, potassium, recommendations, suitableCrops, date } = result;
  
  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex-grow space-y-5">
        <div className="p-4 rounded-lg bg-orange-50/80 text-orange-900 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">Soil Analysis Report</h3>
            <div className="flex items-center gap-2 mt-1.5">
                <HealthBadge health={overallHealth} />
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">pH: {phLevel}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600/70 ml-2 whitespace-nowrap">{new Date(date).toLocaleDateString()}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center p-3 bg-gray-50 rounded-lg border">
            <NutrientLevel name="Nitrogen (N)" level={nitrogen} />
            <NutrientLevel name="Phosphorus (P)" level={phosphorus} />
            <NutrientLevel name="Potassium (K)" level={potassium} />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold text-gray-800 flex items-center mb-2"><SparklesIcon className="h-5 w-5 text-green-600 mr-2" />Recommendations</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2">
              {recommendations.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
           <div>
            <h4 className="text-md font-semibold text-gray-800 flex items-center mb-2"><LeafIcon className="h-5 w-5 text-green-600 mr-2" />Suitable Crops</h4>
            <div className="flex flex-wrap gap-2">
                {suitableCrops.map((item, index) => <span key={index} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};