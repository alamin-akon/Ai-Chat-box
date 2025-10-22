
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-brand-cyan border-t-transparent"></div>
      <p className="text-lg text-gray-300">Generating your vibe...</p>
    </div>
  );
};

export default Loader;
