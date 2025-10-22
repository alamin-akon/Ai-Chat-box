
import React from 'react';
import type { AspectRatio } from '../types';
import Icon from './Icon';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const ASPECT_RATIO_OPTIONS: AspectRatio[] = ["9:16", "16:9", "1:1", "4:3", "3:4"];

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, aspectRatio, setAspectRatio, onSubmit, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4 space-y-4">
        <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., rainy cyberpunk lo-fi, synthwave sunset..."
            rows={3}
            className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder-gray-500 disabled:opacity-50"
            disabled={isLoading}
        />
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-1/2">
                <label htmlFor="aspect-ratio" className="block text-sm font-medium text-gray-400 mb-1">Aspect Ratio</label>
                <select
                    id="aspect-ratio"
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                    disabled={isLoading}
                    className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all"
                >
                    {ASPECT_RATIO_OPTIONS.map(ratio => (
                        <option key={ratio} value={ratio}>{ratio} (Phone)</option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full sm:w-1/2 mt-2 sm:mt-6 flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-purple rounded-lg shadow-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isLoading ? 'Vibing...' : 'Generate'}
                {!isLoading && <Icon name="generate" className="w-5 h-5"/>}
            </button>
        </div>
    </form>
  );
};

export default PromptForm;
