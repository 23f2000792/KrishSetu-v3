import React, { useState, useCallback } from 'react';
import { getMarketData } from '../services/geminiService';
import { MarketData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartBarIcon } from '../components/IconComponents';

export const MarketView: React.FC = () => {
    const [crop, setCrop] = useState('Onion');
    const [location, setLocation] = useState('Nashik, Maharashtra');
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setMarketData(null);

        const dataSources = ['Recent rainfall patterns', 'Government MSP announcements', 'Fuel price trends'];
        
        try {
            const result = await getMarketData(crop, location, dataSources);
            setMarketData({ ...result, crop, location });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to fetch market data. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [crop, location]);
    
    const formatChartData = () => {
        if (!marketData) return [];
        const combined = [...marketData.historical, ...marketData.forecast];
        return combined.map(d => ({
            date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: d.price,
            forecastPrice: marketData.historical.some(h => h.date === d.date) ? null : d.price,
            historicalPrice: marketData.historical.some(h => h.date === d.date) ? d.price : null,
        }));
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Market Price Predictor</h1>
                <p className="text-lg text-gray-600 mt-2">Get AI-powered price forecasts for your crops.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label htmlFor="crop-market" className="block text-sm font-medium text-gray-700">Crop</label>
                        <select id="crop-market" value={crop} onChange={(e) => setCrop(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                            <option>Onion</option>
                            <option>Tomato</option>
                            <option>Wheat</option>
                            <option>Cotton</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="location-market" className="block text-sm font-medium text-gray-700">Location (Mandi)</label>
                        <input type="text" id="location-market" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                    </div>
                    <button
                        onClick={handleFetchData}
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Analyzing...' : 'Get Forecast'}
                    </button>
                </div>
            </div>

            {isLoading && <div className="flex justify-center p-10"><div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div></div>}
            {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

            {marketData && (
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200/50">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Price Trend for {marketData.crop}</h2>
                    <p className="text-sm text-gray-500 mb-6">{marketData.location}</p>

                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <LineChart data={formatChartData()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" domain={['dataMin - 100', 'dataMax + 100']} />
                                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '0.5rem' }} />
                                <Legend />
                                <Line type="monotone" dataKey="historicalPrice" name="Historical Price (₹/Quintal)" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                                <Line type="monotone" dataKey="forecastPrice" name="Forecasted Price (₹/Quintal)" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analysis Summary</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{marketData.analysisSummary}</p>
                    </div>
                </div>
            )}
            
            {!marketData && !isLoading && !error && (
                 <div className="text-center max-w-md mx-auto bg-white rounded-2xl p-10 mt-10 border border-dashed border-gray-200">
                    <ChartBarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700">Market Insights Await</h2>
                    <p className="text-gray-500 mt-2">Select a crop and location to generate historical price data and an AI-powered forecast.</p>
                </div>
            )}

        </div>
    );
};
