import React from 'react';
import { KrishiSetuLogo } from '../components/IconComponents';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-[#F0F5ED] flex items-center justify-center p-4" style={{backgroundImage: `radial-gradient(circle, #E0EBE4 0%, #F0F5ED 70%)`}}>
        <div className="w-full max-w-sm">
             <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
                 <div className="inline-block p-4 bg-green-100/80 rounded-full mb-5">
                    <KrishiSetuLogo className="h-14 w-14" />
                 </div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome to Krishi Setu</h1>
                <p className="text-gray-600 mt-2 mb-8">Your AI-powered agricultural copilot.</p>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" id="email" value="farmer@demo.com" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:ring-0 text-gray-500" readOnly/>
                    </div>
                     <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" id="password" value="demopassword" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:ring-0 text-gray-500" readOnly/>
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all duration-300 mt-8 transform hover:scale-105"
                >
                   Login & Get Started
                </button>
                <p className="text-xs text-gray-400 mt-6">
                    This is a demo application. User authentication is mocked.
                </p>
             </div>
        </div>
    </div>
  );
};