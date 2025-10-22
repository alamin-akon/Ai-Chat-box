
import React from 'react';
import type { ImageResult } from '../types';

interface ImageGridProps {
  images: ImageResult[];
  onImageSelect: (image: ImageResult) => void;
}

const ImageCard: React.FC<{ image: ImageResult; onSelect: () => void }> = ({ image, onSelect }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg aspect-[9/16] transition-transform duration-300 ease-in-out hover:scale-105"
      onClick={onSelect}
    >
      <img src={`data:image/jpeg;base64,${image.base64}`} alt={image.prompt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
        <p className="text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">View</p>
      </div>
    </div>
  );
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageSelect }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image} onSelect={() => onImageSelect(image)} />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
