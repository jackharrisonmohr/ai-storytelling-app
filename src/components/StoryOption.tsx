import React from 'react';

interface StoryOptionProps {
  text: string;
  onClick: () => void;
  isSelected?: boolean;
}

const StoryOption: React.FC<StoryOptionProps> = ({ text, onClick, isSelected = false }) => {
  return (
    <div 
      className={`p-4 mb-3 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
        isSelected 
          ? 'bg-indigo-100 border-indigo-500' 
          : 'bg-white border-gray-200 hover:border-indigo-300'
      }`}
      onClick={onClick}
    >
      <p className="text-gray-800">{text}</p>
    </div>
  );
};

export default StoryOption;