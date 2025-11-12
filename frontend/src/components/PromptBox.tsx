import React, { useState } from 'react';

interface PromptBoxProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
}

const PromptBox: React.FC<PromptBoxProps> = ({ onSubmit, disabled = false }) => {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSubmit(prompt.trim());
      setPrompt('');
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="ui-interactive">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className={`relative transition-all duration-300 ${isExpanded ? 'transform -translate-y-4' : ''}`}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !prompt && setIsExpanded(false)}
            onKeyDown={handleKeyDown}
            placeholder="Change your story... (Press Enter to submit)"
            disabled={disabled}
            className={`
              w-full px-6 py-4 bg-black/70 backdrop-blur-md border border-white/20 
              rounded-2xl text-white placeholder-gray-400 resize-none
              focus:outline-none focus:ring-2 focus:ring-future-blue focus:border-transparent
              transition-all duration-300 ${isExpanded ? 'h-32' : 'h-16'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            rows={isExpanded ? 4 : 1}
          />
          
          {prompt && (
            <button
              type="submit"
              disabled={disabled}
              className="
                absolute right-3 bottom-3 px-4 py-2 bg-future-blue hover:bg-blue-700 
                text-white rounded-lg transition-colors duration-200 text-sm font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PromptBox;