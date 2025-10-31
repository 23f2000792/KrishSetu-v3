import React, { useState, useCallback } from 'react';
import { PlantAnalysisResult } from '../types';
import { analyzePlantImage } from '../services/geminiService';
import { FileUpload } from '../components/FileUpload';
import { Loader } from '../components/Loader';
import { PlantResultCard } from '../components/PlantResultCard';
import { sampleDataSick } from '../constants';

interface LeafScannerProps {
  onAnalysisComplete: (result: PlantAnalysisResult, previewUrl: string, type: 'Leaf' | 'Soil') => void;
}

export const LeafScanner: React.FC<LeafScannerProps> = ({ onAnalysisComplete }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PlantAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [useSample, setUseSample] = useState<boolean>(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (file: File) => {
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
      setUseSample(false);
    }
  };
  
  const handleAnalyzeClick = useCallback(async () => {
    if ((!imageFile && !useSample) || !previewUrl) {
      setError('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      let resultData: Omit<PlantAnalysisResult, 'id' | 'date'>;
      if (useSample) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        resultData = sampleDataSick;
      } else if (imageFile) {
        const base64Image = await fileToBase64(imageFile);
        resultData = await analyzePlantImage(base64Image, imageFile.type);
      } else {
        throw new Error("No image available for analysis.");
      }

      const finalResult: PlantAnalysisResult = {
        ...resultData,
        id: `leaf-${Date.now()}`,
        date: new Date().toISOString()
      };
      
      setAnalysisResult(finalResult);
      onAnalysisComplete(finalResult, previewUrl, 'Leaf');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Analysis Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, useSample, previewUrl, onAnalysisComplete]);

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
    setUseSample(false);
  };

  const handleUseSample = () => {
    handleReset();
    setPreviewUrl('https://storage.googleapis.com/maker-suite-media/prompts/1715291249911_ நடு0.jpg'); 
    setUseSample(true);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/50">
        {!previewUrl ? (
        <FileUpload 
          onFileSelect={handleFileChange} 
          onUseSample={handleUseSample}
          title="Leaf Health Scanner"
          description="Upload a clear photo of an affected leaf for an instant AI-powered analysis."
        />
        ) : (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            <div className="relative aspect-square">
                <img
                src={previewUrl}
                alt="Plant preview"
                className="w-full h-full object-cover rounded-xl shadow-md border-4 border-white"
                />
                {isLoading && <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center"><Loader /></div>}
            </div>

            <div className="flex flex-col h-full">
                {analysisResult ? (
                    <PlantResultCard result={analysisResult} />
                ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-xl h-full border">
                    <h3 className="text-xl font-semibold text-gray-700">Ready to Analyze</h3>
                    <p className="mt-2 text-gray-500">Your leaf image is loaded. Click below to diagnose.</p>
                </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleAnalyzeClick}
                        disabled={isLoading || !!analysisResult}
                        className="w-full flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        Analyze Health
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Reset
                    </button>
                </div>
                {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
            </div>
            </div>
        </div>
        )}
    </div>
  );
};