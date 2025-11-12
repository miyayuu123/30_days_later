import React from 'react';

interface FutureRecalculationModalProps {
  isVisible: boolean;
  progress: number;
}

const FutureRecalculationModal: React.FC<FutureRecalculationModalProps> = ({ 
  isVisible, 
  progress 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="acoustic-card max-w-md w-full mx-6 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-warm-brown/30 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-soft-orange rounded-full animate-spin"
              style={{
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent'
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-soft-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-light text-warm-cream mb-2 font-acoustic">
            Recalculating Your Future
          </h3>
          <p className="text-warm-brown/80 font-light">
            Analyzing your progress and updating scenarios...
          </p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-warm-brown/30 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-soft-orange to-muted-green h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-warm-brown/60 text-sm font-light">
            {progress}% Complete
          </p>
        </div>

        <div className="space-y-2 text-sm text-warm-brown/70 font-light">
          <div className={`transition-opacity duration-300 ${progress > 20 ? 'opacity-100' : 'opacity-50'}`}>
            ✓ Processing task completion
          </div>
          <div className={`transition-opacity duration-300 ${progress > 50 ? 'opacity-100' : 'opacity-50'}`}>
            ✓ Updating scenario probabilities  
          </div>
          <div className={`transition-opacity duration-300 ${progress > 80 ? 'opacity-100' : 'opacity-50'}`}>
            ✓ Generating new video content
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureRecalculationModal;