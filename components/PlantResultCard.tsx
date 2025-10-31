import React from 'react';
import { PlantAnalysisResult } from '../types';
import { CheckCircleIcon, WarningIcon, SparklesIcon, BeakerIcon, ShieldCheckIcon } from './IconComponents';

interface PlantResultCardProps {
  result: PlantAnalysisResult;
}

const ResultSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div>
        <h4 className="text-md font-semibold text-gray-800 flex items-center mb-2">
            {icon}
            <span className="ml-2">{title}</span>
        </h4>
        {children}
    </div>
);

export const PlantResultCard: React.FC<PlantResultCardProps> = ({ result }) => {
  const { isHealthy, diseaseName, confidenceScore, description, organicSolutions, chemicalTreatments, preventativeMeasures, date } = result;
  
  const confidencePercent = (confidenceScore * 100).toFixed(0);

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex-grow space-y-5">
        <div className={`p-4 rounded-lg flex items-start justify-between ${isHealthy ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
          <div className="flex items-start">
            {isHealthy ? <CheckCircleIcon className="h-7 w-7 mr-3 flex-shrink-0 mt-0.5" /> : <WarningIcon className="h-7 w-7 mr-3 flex-shrink-0 mt-0.5" />}
            <div>
              <h3 className="text-lg font-bold">
                {isHealthy ? 'Plant is Healthy' : `Diagnosis: ${diseaseName}`}
              </h3>
              {!isHealthy && <p className="text-sm font-medium opacity-80">Confidence: {confidencePercent}%</p>}
            </div>
          </div>
          <p className="text-xs opacity-70 ml-2 whitespace-nowrap">{new Date(date).toLocaleDateString()}</p>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

        {!isHealthy && (
          <div className="space-y-4">
            <ResultSection title="Organic Solutions" icon={<SparklesIcon className="h-5 w-5 text-green-600" />}>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2">
                {organicSolutions.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </ResultSection>

            <ResultSection title="Chemical Treatments" icon={<BeakerIcon className="h-5 w-5 text-orange-600" />}>
               <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2">
                {chemicalTreatments.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </ResultSection>
          </div>
        )}
         <ResultSection title="Preventative Measures" icon={<ShieldCheckIcon className="h-5 w-5 text-blue-600" />}>
           <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2">
            {preventativeMeasures.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </ResultSection>
      </div>
    </div>
  );
};