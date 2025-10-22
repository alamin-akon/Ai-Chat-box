
import React from 'react';
import type { ImageResult } from '../types';
import Icon from './Icon';

interface FullScreenModalProps {
  image: ImageResult | null;
  onClose: () => void;
  onDownload: (image: ImageResult) => void;
  onRemix: (image: ImageResult) => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ image, onClose, onDownload, onRemix }) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-gray-900 rounded-lg p-4 max-w-md w-full max-h-[90vh] flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-gray-800 rounded-full p-2 text-white hover:bg-gray-700 z-10"
          aria-label="Close"
        >
          <Icon name="close" className="w-5 h-5"/>
        </button>
        
        <div className="flex-shrink-0 overflow-hidden rounded-md">
            <img src={`data:image/jpeg;base64,${image.base64}`} alt={image.prompt} className="w-full h-auto object-contain max-h-[65vh]" />
        </div>
        
        <div className="flex-grow flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                onClick={() => onDownload(image)}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-cyan text-gray-900 font-bold rounded-lg hover:bg-cyan-300 transition-colors"
            >
                <Icon name="download" className="w-5 h-5"/>
                Download
            </button>
            <button
                onClick={() => onRemix(image)}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-purple text-white font-bold rounded-lg hover:bg-violet-700 transition-colors"
            >
                <Icon name="remix" className="w-5 h-5"/>
                Remix
            </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
