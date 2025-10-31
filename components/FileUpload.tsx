import React, { useCallback, useState } from 'react';
import { UploadIcon } from './IconComponents';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onUseSample?: () => void;
  title: string;
  description: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, onUseSample, title, description }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 mb-8 max-w-xl mx-auto">{description}</p>

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-10 transition-colors duration-300 ${
          isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
        />
        <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
          <span className="font-semibold text-green-700">Click to upload</span>
          <span className="text-gray-500 mt-1">or drag and drop</span>
          <p className="text-xs text-gray-400 mt-4">PNG, JPG, or WEBP (max 10MB)</p>
        </label>
      </div>
      {onUseSample && (
        <div className="mt-6">
          <button onClick={onUseSample} className="text-sm font-semibold text-green-600 hover:text-green-800 transition-colors">
            Or Use a Sample Image
          </button>
        </div>
      )}
    </div>
  );
};