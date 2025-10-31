import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { KrishiSetuLogo } from '../components/IconComponents';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const KrishiChat: React.FC = () => {
    const [history, setHistory] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [language, setLanguage] = useState('English');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history, isLoading]);

    const handleSend = useCallback(async () => {
        if (!currentMessage.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', parts: [{ text: currentMessage.trim() }] };
        const newHistory = [...history, userMessage];
        
        setHistory(newHistory);
        setCurrentMessage('');
        setIsLoading(true);

        try {
            const responseText = await getChatResponse(currentMessage.trim(), history, language);
            const modelMessage: Message = { role: 'model', parts: [{ text: responseText }] };
            setHistory(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Failed to get chat response:", error);
            const errorMessage: Message = { role: 'model', parts: [{ text: "Sorry, I encountered an error. Please try again." }] };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [currentMessage, history, language, isLoading]);

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col h-[75vh] border border-gray-200/50">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Krishi AI Copilot</h1>
                <select value={language} onChange={e => setLanguage(e.target.value)} className="text-sm rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Punjabi</option>
                </select>
            </div>
            
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6">
                {history.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <div className="p-1.5 bg-green-100 rounded-full"><KrishiSetuLogo className="w-7 h-7 flex-shrink-0" /></div>}
                        <div className={`max-w-sm md:max-w-md lg:max-w-lg p-3 rounded-2xl prose prose-sm ${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            {msg.parts[0].text.split('\n').map((line, i) => <p key={i} className="my-1">{line}</p>)}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <div className="p-1.5 bg-green-100 rounded-full"><KrishiSetuLogo className="w-7 h-7 flex-shrink-0" /></div>
                        <div className="max-w-sm p-3 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
                            <div className="flex items-center space-x-1.5">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white/50">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={e => setCurrentMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about farming..."
                        className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <button onClick={handleSend} disabled={isLoading || !currentMessage.trim()} className="bg-green-600 text-white font-bold px-5 py-2 rounded-full shadow-md hover:bg-green-700 disabled:bg-gray-400">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};