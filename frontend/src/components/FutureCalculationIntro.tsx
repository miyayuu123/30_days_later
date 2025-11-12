import React, { useState, useEffect } from 'react';

interface FutureCalculationIntroProps {
  isVisible: boolean;
  onComplete: () => void;
}

const FutureCalculationIntro: React.FC<FutureCalculationIntroProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'calculating' | 'title-reveal' | 'complete'>('calculating');

  useEffect(() => {
    if (!isVisible) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setPhase('title-reveal');
          
          // Title reveal phase duration
          setTimeout(() => {
            setPhase('complete');
            setTimeout(() => {
              onComplete();
            }, 1000);
          }, 2000);
          
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {phase === 'calculating' && (
        <div className="text-center max-w-lg px-6">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
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
                <svg className="w-10 h-10 text-soft-orange animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-light text-warm-cream mb-4 font-acoustic">
            Calculating Your Future
          </h2>
          <p className="text-warm-brown/80 font-light mb-8">
            Processing your data to generate personalized scenarios...
          </p>

          <div className="mb-6">
            <div className="w-full bg-warm-brown/30 rounded-full h-1.5 mb-3">
              <div 
                className="bg-gradient-to-r from-soft-orange to-muted-green h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-warm-brown/60 text-sm font-light">
              {Math.round(progress)}% Complete
            </p>
          </div>

          <div className="space-y-3 text-sm text-warm-brown/70 font-light">
            <div className={`transition-opacity duration-500 ${progress > 25 ? 'opacity-100' : 'opacity-50'}`}>
              ✓ Analyzing your profile and goals
            </div>
            <div className={`transition-opacity duration-500 ${progress > 50 ? 'opacity-100' : 'opacity-50'}`}>
              ✓ Generating potential life scenarios
            </div>
            <div className={`transition-opacity duration-500 ${progress > 75 ? 'opacity-100' : 'opacity-50'}`}>
              ✓ Creating personalized timeline
            </div>
            <div className={`transition-opacity duration-500 ${progress > 95 ? 'opacity-100' : 'opacity-50'}`}>
              ✓ Preparing your future visualization
            </div>
          </div>
        </div>
      )}

      {phase === 'title-reveal' && (
        <div className="text-center animate-fade-in">
          <h1 className="text-8xl font-light text-warm-cream mb-4 font-acoustic animate-title-reveal">
            30 Days Later
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-soft-orange to-transparent mx-auto animate-line-expand"></div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="text-center animate-fade-out">
          <h1 className="text-8xl font-light text-warm-cream mb-4 font-acoustic">
            30 Days Later
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-soft-orange to-transparent mx-auto"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes title-reveal {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.9);
            letter-spacing: 0.2em;
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            letter-spacing: 0.05em;
          }
        }
        
        @keyframes line-expand {
          from { width: 0; }
          to { width: 8rem; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-out {
          animation: fade-out 1s ease-out;
        }
        
        .animate-title-reveal {
          animation: title-reveal 1.5s ease-out;
        }
        
        .animate-line-expand {
          animation: line-expand 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default FutureCalculationIntro;