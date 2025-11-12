import React from 'react';
import VideoPlayer from './VideoPlayer';

interface VideoSectionProps {
  videoUrl?: string;
  title: string;
  description: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ 
  videoUrl, 
  title, 
  description 
}) => {
  const scrollToNext = () => {
    const dashboardSection = document.getElementById('dashboard-section');
    dashboardSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="video-section">
      <VideoPlayer videoUrl={videoUrl} isPlaying={true} />
      
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-light text-white/90 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h1>
      </div>

      <button 
        onClick={scrollToNext}
        className="scroll-indicator text-white/70 hover:text-white transition-colors cursor-pointer"
        title="Scroll to dashboard"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default VideoSection;