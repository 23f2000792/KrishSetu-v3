import React, { useState, useCallback } from 'react';
import { getPostHarvestAdvice } from '../services/geminiService';
import { Loader } from '../components/Loader';
import { TruckIcon } from '../components/IconComponents';

export const PostHarvest: React.FC = () => {
    const [crop, setCrop] = useState('Tomato');
    const [duration, setDuration] = useState('2 weeks');
    const [advice, setAdvice] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchAdvice = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setAdvice(null);
        try {
            const result = await getPostHarvestAdvice(crop, duration);
            setAdvice(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to fetch advice. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [crop, duration]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Post-Harvest Advisor</h1>
                <p className="text-lg text-gray-600 mt-2">Get strategies to reduce storage and transport losses.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label htmlFor="crop" className="block text-sm font-medium text-gray-700">Crop</label>
                        <select id="crop" value={crop} onChange={(e) => setCrop(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                            <option>Tomato</option>
                            <option>Onion</option>
                            <option>Potato</option>
                            <option>Apples</option>
                            <option>Grains (Wheat/Rice)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Storage Duration</label>
                        <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                            <option>1-3 days</option>
                            <option>1 week</option>
                            <option>2 weeks</option>
                            <option>1 month</option>
                            <option>3+ months</option>
                        </select>
                    </div>
                    <button
                        onClick={handleFetchAdvice}
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Getting Advice...' : 'Get Advice'}
                    </button>
                </div>
            </div>

            {isLoading && <div className="flex justify-center p-10"><div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div></div>}
            {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
            
            {advice && (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200/50">
                     <div className="prose prose-green max-w-none prose-h2:text-xl prose-h2:font-bold prose-h2:mb-2 prose-ul:pl-5 prose-li:mb-1" dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, '<br />').replace(/### (.*?)\<br \/\>/g, '<h2>$1</h2>') }} />
                </div>
            )}

             {!advice && !isLoading && !error && (
                 <div className="text-center max-w-md mx-auto bg-white rounded-2xl p-10 mt-10 border border-dashed border-gray-200">
                    <TruckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700">Ready for Advice</h2>
                    <p className="text-gray-500 mt-2">Select a crop and desired storage duration to receive tailored post-harvest strategies.</p>
                </div>
            )}
        </div>
    );
};