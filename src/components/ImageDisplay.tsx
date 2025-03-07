import React from 'react';
import Image from 'next/image';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Generating image...</div>
      </div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg mb-6">
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={imageUrl}
          alt="Generated story illustration"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default ImageDisplay;