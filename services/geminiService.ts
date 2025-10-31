import { GoogleGenAI, Type } from '@google/genai';
import { PlantAnalysisResult, SoilAnalysisResult, MarketData, MarketDataPoint } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API key is not set. Using mocked data. Please set process.env.API_KEY.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// --- Leaf Scanner Service ---
const plantResponseSchema = {
  type: Type.OBJECT,
  properties: {
    isHealthy: { type: Type.BOOLEAN },
    diseaseName: { type: Type.STRING },
    confidenceScore: { type: Type.NUMBER },
    description: { type: Type.STRING },
    organicSolutions: { type: Type.ARRAY, items: { type: Type.STRING } },
    chemicalTreatments: { type: Type.ARRAY, items: { type: Type.STRING } },
    preventativeMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ['isHealthy', 'diseaseName', 'confidenceScore', 'description', 'organicSolutions', 'chemicalTreatments', 'preventativeMeasures'],
};

export const analyzePlantImage = async (base64Image: string, mimeType: string): Promise<Omit<PlantAnalysisResult, 'id' | 'date'>> => {
  if (!ai) throw new Error("Gemini AI client not initialized.");
  const systemInstruction = `You are an expert AI agronomist. Analyze the plant leaf image. Respond ONLY with a valid JSON object adhering to the schema. Do not include markdown.`;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ inlineData: { data: base64Image, mimeType } }, { text: "Analyze this plant image for diseases." }] },
    config: { systemInstruction, responseMimeType: 'application/json', responseSchema: plantResponseSchema, temperature: 0.2 },
  });
  return JSON.parse(response.text.trim());
};


// --- Soil Analyzer Service ---
const soilResponseSchema = {
    type: Type.OBJECT,
    properties: {
        overallHealth: { type: Type.STRING, enum: ['Poor', 'Average', 'Good', 'Excellent'] },
        phLevel: { type: Type.NUMBER },
        nitrogen: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
        phosphorus: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
        potassium: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        suitableCrops: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['overallHealth', 'phLevel', 'nitrogen', 'phosphorus', 'potassium', 'recommendations', 'suitableCrops'],
};

export const analyzeSoilImage = async (base64Image: string, mimeType: string): Promise<Omit<SoilAnalysisResult, 'id' | 'date'>> => {
    if (!ai) throw new Error("Gemini AI client not initialized.");
    const systemInstruction = `You are a soil science expert. Analyze the image of a soil health card. Extract or infer the key metrics. Respond ONLY with a valid JSON object adhering to the schema. Do not include markdown. If the image is not a soil card, make your best guess based on the soil's appearance.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ inlineData: { data: base64Image, mimeType } }, { text: "Analyze this soil health card image." }] },
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: soilResponseSchema, temperature: 0.3 },
    });
    return JSON.parse(response.text.trim());
};

// --- Market View Service ---
const marketResponseSchema = {
    type: Type.OBJECT,
    properties: {
        historical: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { date: { type: Type.STRING }, price: { type: Type.NUMBER } } } },
        forecast: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { date: { type: Type.STRING }, price: { type: Type.NUMBER } } } },
        analysisSummary: { type: Type.STRING, description: "A brief summary explaining how the provided data sources influenced the forecast." }
    },
    required: ['historical', 'forecast', 'analysisSummary'],
};

export const getMarketData = async (crop: string, location: string, dataSources: string[]): Promise<Omit<MarketData, 'crop' | 'location'>> => {
    if (!ai) throw new Error("Gemini AI client not initialized.");
    const systemInstruction = `You are an agricultural market analyst. Generate realistic but synthetic price data for the user's request. Respond ONLY with a valid JSON object adhering to the schema. Do not include markdown. Create 7 days of historical data ending today, and a 3-day forecast. Your analysis and forecast must be influenced by the factors provided by the user. Also, provide a brief summary of 2-3 sentences explaining how these factors influenced your forecast.`;
    const prompt = `Generate market price data for ${crop} in ${location}. Consider the following factors in your forecast: ${dataSources.join(', ')}.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: marketResponseSchema, temperature: 0.8 },
    });
    return JSON.parse(response.text.trim());
};

// --- Post-Harvest Service ---
export const getPostHarvestAdvice = async (crop: string, duration: string): Promise<string> => {
    if (!ai) throw new Error("Gemini AI client not initialized.");
    const systemInstruction = `You are a post-harvest technology expert. Provide clear, actionable advice in markdown format. Give separate sections for 'Storage Strategies' and 'Transport Tips'.`;
    const prompt = `Provide post-harvest advice for ${crop} that needs to be stored for ${duration}.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction, temperature: 0.5 },
    });
    return response.text;
};

// --- Krishi Chat Service ---
export const getChatResponse = async (message: string, history: {role: string, parts: {text: string}[]}[], language: string): Promise<string> => {
    if (!ai) throw new Error("Gemini AI client not initialized.");
    const aiChat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are Krishi Setu, a friendly and expert AI agricultural assistant. Your goal is to provide concise, helpful advice to farmers. Respond in ${language}. Keep your answers easy to understand.`,
      },
      history: history,
    });
    const response = await aiChat.sendMessage({ message });
    return response.text;
};
