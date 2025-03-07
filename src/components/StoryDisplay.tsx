import React from 'react';

interface StoryDisplayProps {
  story: string[];
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
  if (!story.length) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Story So Far</h2>
      <div className="prose max-w-none">
        {story.map((sentence, index) => (
          <p key={index} className="mb-2 last:mb-0 text-gray-700">
            {sentence}
          </p>
        ))}
      </div>
    </div>
  );
};

export default StoryDisplay;