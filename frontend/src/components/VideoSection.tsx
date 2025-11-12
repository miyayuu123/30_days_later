import React from 'react';
import VideoPlayer from './VideoPlayer';

interface ScenarioData {
  type: 'main' | 'positive' | 'negative';
  title: string;
  description: string;
  probability: number;
  videoUrl: string;
}

interface VideoSectionProps {
  title: string;
  mainScenario: ScenarioData;
  positiveScenario: ScenarioData;
  negativeScenario: ScenarioData;
}

const VideoSection: React.FC<VideoSectionProps> = ({ 
  title,
  mainScenario,
  positiveScenario,
  negativeScenario
}) => {
  const scrollToNext = () => {
    const dashboardSection = document.getElementById('dashboard-section');
    dashboardSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen w-full bg-black relative">
      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-2xl font-light text-white/90 tracking-wide font-acoustic">
          {title}
        </h1>
      </div>

      {/* Main Scenario Video - Top 70% */}
      <div className="h-[70vh] relative">
        <VideoPlayer videoUrl={mainScenario.videoUrl} isPlaying={true} />
        
        {/* Small overlay in top right corner only */}
        <div className="absolute top-4 right-4 z-10">
          <div className="glass px-4 py-2 border border-white/20">
            <div className="flex items-center gap-3">
              <span className="text-white/90 font-light text-sm uppercase tracking-wide">
                Main Scenario
              </span>
              <div className="text-2xl font-light text-white font-acoustic">
                {mainScenario.probability}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Split Possibilities Section - Bottom 30% */}
      <div className="h-[30vh] flex">
        {/* Positive Possibility - Left */}
        <div className="flex-1 relative group">
          <VideoPlayer videoUrl={positiveScenario.videoUrl} isPlaying={true} />
          
          {/* Minimal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Small overlay in bottom left */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="glass px-3 py-2 border border-muted-green/30">
              <div className="flex items-center gap-2">
                <span className="text-muted-green font-light text-xs uppercase">
                  Positive
                </span>
                <div className="text-lg font-light text-muted-green font-acoustic">
                  {positiveScenario.probability}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-white/30 to-transparent relative z-10" />

        {/* Negative Possibility - Right */}
        <div className="flex-1 relative group">
          <VideoPlayer videoUrl={negativeScenario.videoUrl} isPlaying={true} />
          
          {/* Minimal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Small overlay in bottom right */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="glass px-3 py-2 border border-soft-orange/30">
              <div className="flex items-center gap-2">
                <span className="text-soft-orange font-light text-xs uppercase">
                  Risk
                </span>
                <div className="text-lg font-light text-soft-orange font-acoustic">
                  {negativeScenario.probability}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors cursor-pointer z-20 animate-bounce"
        title="Scroll to dashboard"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs">Scroll to explore</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default VideoSection;