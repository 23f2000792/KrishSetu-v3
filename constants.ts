
import { PlantAnalysisResult, SoilAnalysisResult } from './types';

export const sampleDataSick: Omit<PlantAnalysisResult, 'id' | 'date'> = {
  isHealthy: false,
  diseaseName: 'Tomato Late Blight',
  confidenceScore: 0.92,
  description: 'Late blight is a potentially devastating disease of tomatoes and potatoes, caused by the fungus-like oomycete pathogen Phytophthora infestans. It thrives in cool, moist conditions.',
  organicSolutions: [
    'Apply copper-based fungicides as a preventative measure.',
    'Ensure good air circulation by pruning and spacing plants properly.',
    'Remove and destroy infected plant debris immediately.',
    'Use drip irrigation to avoid wetting foliage.'
  ],
  chemicalTreatments: [
    'Fungicides containing chlorothalonil, mancozeb, or metalaxyl are effective.',
    'Alternate between different fungicide classes to prevent resistance.',
    'Follow application instructions carefully, especially regarding harvest intervals.'
  ],
  preventativeMeasures: [
    'Plant resistant tomato varieties if available in your region.',
    'Water plants at the base to keep foliage dry.',
    'Monitor plants regularly, especially during cool, wet weather.',
    'Rotate crops and avoid planting tomatoes or potatoes in the same spot for at least 3 years.'
  ]
};

export const sampleSoilData: Omit<SoilAnalysisResult, 'id' | 'date'> = {
  overallHealth: 'Good',
  phLevel: 6.8,
  nitrogen: 'Medium',
  phosphorus: 'High',
  potassium: 'Medium',
  recommendations: [
    'Apply a balanced NPK fertilizer at a lower rate, focusing on nitrogen and potassium.',
    'Incorporate compost or well-rotted manure to improve soil structure and organic matter.',
    'Monitor pH levels annually and apply lime only if levels drop below 6.2.',
    'No additional phosphorus is needed for the next 1-2 seasons.'
  ],
  suitableCrops: [
    'Tomatoes',
    'Peppers',
    'Beans',
    'Cucumbers',
    'Leafy Greens'
  ]
};
