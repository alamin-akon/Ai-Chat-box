
import React, { useState, useCallback } from 'react';
import PromptForm from './components/PromptForm';
import ImageGrid from './components/ImageGrid';
import FullScreenModal from './components/FullScreenModal';
import Loader from './components/Loader';
import { generateWallpapers } from './services/geminiService';
import type { ImageResult, AspectRatio } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('ethereal jellyfish floating in a nebula');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);

  const handleGenerate = useCallback(async (currentPrompt: string) => {
    if (!currentPrompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setImages([]); // Clear previous images
    
    try {
      const base64Images = await generateWallpapers(currentPrompt, aspectRatio);
      const imageResults: ImageResult[] = base64Images.map((base64, index) => ({
        id: `${Date.now()}-${index}`,
        base64,
        prompt: currentPrompt,
      }));
      setImages(imageResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [aspectRatio]);

  const handleRemix = useCallback((imageToRemix: ImageResult) => {
    setSelectedImage(null);
    setPrompt(imageToRemix.prompt);
    // Use a timeout to allow the modal to close gracefully before starting generation
    setTimeout(() => {
        handleGenerate(imageToRemix.prompt);
    }, 100);
  }, [handleGenerate]);

  const handleDownload = useCallback((imageToDownload: ImageResult) => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${imageToDownload.base64}`;
    const fileName = imageToDownload.prompt.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 30) || 'vibewall-wallpaper';
    link.download = `${fileName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-cyan">
          VibeWall
        </h1>
        <p className="text-gray-400 mt-2">AI-Powered Wallpaper Generator</p>
      </header>

      <main className="w-full flex flex-col items-center flex-1">
        <PromptForm
          prompt={prompt}
          setPrompt={setPrompt}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="flex-1 flex items-center justify-center my-10">
            <Loader />
          </div>
        )}

        {error && (
          <div className="my-10 text-center p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <h3 className="font-bold text-red-400">Generation Failed</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {!isLoading && images.length === 0 && !error && (
             <div className="text-center text-gray-500 mt-16">
                <p>Describe your vibe and let the AI do the magic.</p>
                <p>Your next wallpaper is just a prompt away.</p>
            </div>
        )}

        <ImageGrid images={images} onImageSelect={setSelectedImage} />
      </main>

      <FullScreenModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onDownload={handleDownload}
        onRemix={handleRemix}
      />
    </div>
  );
};

export default App;
