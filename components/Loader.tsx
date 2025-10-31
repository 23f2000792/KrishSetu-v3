
import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-white text-center p-4">
    <div className="w-16 h-16 border-4 border-white/50 border-t-white border-solid rounded-full animate-spin mb-4"></div>
    <p className="text-lg font-semibold">Consulting AI Agronomist...</p>
    <p className="text-sm opacity-80">This may take a moment.</p>
  </div>
);