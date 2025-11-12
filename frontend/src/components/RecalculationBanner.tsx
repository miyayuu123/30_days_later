import React from 'react';

interface RecalculationBannerProps {
  isVisible: boolean;
  progress: number;
}

const RecalculationBanner: React.FC<RecalculationBannerProps> = ({ 
  isVisible, 
  progress 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-warm-brown/30 p-4 z-40">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 relative">
            <div 
              className="absolute inset-0 border-2 border-soft-orange rounded-full animate-spin"
              style={{
                borderTopColor: 'transparent',
                borderRightColor: 'transparent'
              }}
            />
          </div>
          <span className="text-warm-cream font-light font-acoustic">
            Recalculating your future...
          </span>
        </div>

        <div className="flex-1 mx-4">
          <div className="w-full bg-warm-brown/30 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-soft-orange to-muted-green h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="text-warm-brown/80 text-sm font-light min-w-[3rem] text-right">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default RecalculationBanner;