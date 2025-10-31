
export interface PlantAnalysisResult {
  id: string;
  date: string;
  isHealthy: boolean;
  diseaseName: string;
  confidenceScore: number;
  description: string;
  organicSolutions: string[];
  chemicalTreatments: string[];
  preventativeMeasures: string[];
}

export interface SoilAnalysisResult {
  id: string;
  date: string;
  overallHealth: 'Poor' | 'Average' | 'Good' | 'Excellent';
  phLevel: number;
  nitrogen: 'Low' | 'Medium' | 'High';
  phosphorus: 'Low' | 'Medium' | 'High';
  potassium: 'Low' | 'Medium' | 'High';
  recommendations: string[];
  suitableCrops: string[];
}

export type AnalysisHistoryItem = 
  ({ type: 'Leaf'; previewUrl: string; } & PlantAnalysisResult) | 
  ({ type: 'Soil'; previewUrl: string; } & SoilAnalysisResult);


export interface MarketDataPoint {
    date: string;
    price: number;
}

export interface MarketData {
    crop: string;
    location: string;
    historical: MarketDataPoint[];
    forecast: MarketDataPoint[];
    analysisSummary: string;
}
