'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import StoryOption from '@/components/StoryOption';
import ImageDisplay from '@/components/ImageDisplay';
import StoryDisplay from '@/components/StoryDisplay';

export default function Home() {
  const [story, setStory] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [images, setImages] = useState<Record<number, string>>({});

  const generateInitialSentence = async () => {
    setLoadingOptions(true);
    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Start a new story',
          currentStory: '',
        }),
      });

      const data = await response.json();
      if (data.sentences && data.sentences.length > 0) {
        // Use the first generated sentence as the initial story sentence
        const firstSentence = data.sentences[0];
        setStory([firstSentence]);
        
        // Generate options for the next sentence
        generateNextOptions(firstSentence);
      }
    } catch (error) {
      console.error('Error starting story:', error);
    } finally {
      setLoadingOptions(false);
    }
  };

  const generateNextOptions = async (currentStory: string) => {
    setLoadingOptions(true);
    setSelectedOption(null);
    
    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Continue the story',
          currentStory: story.length > 0 ? story.join(' ') : currentStory,
        }),
      });

      const data = await response.json();
      if (data.sentences) {
        setOptions(data.sentences);
      }
    } catch (error) {
      console.error('Error generating options:', error);
    } finally {
      setLoadingOptions(false);
    }
  };

  const selectOption = (index: number) => {
    setSelectedOption(index);
  };

  const confirmSelection = () => {
    if (selectedOption !== null) {
      const selectedSentence = options[selectedOption];
      setStory([...story, selectedSentence]);
      setOptions([]);
      generateNextOptions([...story, selectedSentence].join(' '));
    }
  };

  const generateImage = async () => {
    if (story.length === 0) return;
    
    setLoadingImage(true);
    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: story.join(' '),
        }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setCurrentImage(data.imageUrl);
        setImages({ ...images, [story.length - 1]: data.imageUrl });
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoadingImage(false);
    }
  };

  const startNewStory = () => {
    setStory([]);
    setOptions([]);
    setSelectedOption(null);
    setCurrentImage(null);
    setImages({});
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-3">Story Weaver</h1>
          <p className="text-lg text-gray-600">Create amazing stories together with AI</p>
        </header>

        {story.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Ready to weave a story?</h2>
            <Button 
              onClick={generateInitialSentence} 
              disabled={loadingOptions}
              className="text-lg py-3 px-6"
            >
              {loadingOptions ? 'Creating your story...' : 'Start a New Adventure'}
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <StoryDisplay story={story} />
            
            {currentImage && (
              <ImageDisplay imageUrl={currentImage} isLoading={loadingImage} />
            )}

            {options.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">What happens next?</h2>
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <StoryOption
                      key={index}
                      text={option}
                      onClick={() => selectOption(index)}
                      isSelected={selectedOption === index}
                    />
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    onClick={confirmSelection}
                    disabled={selectedOption === null || loadingOptions}
                    className="flex-1"
                  >
                    {loadingOptions ? 'Thinking...' : 'Continue Story'}
                  </Button>
                  
                  <Button
                    onClick={generateImage}
                    variant="secondary"
                    disabled={loadingImage}
                    className="flex-1"
                  >
                    {loadingImage ? 'Generating...' : 'Generate Image'}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center">
              <Button onClick={startNewStory} variant="outline">
                Start a New Story
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
