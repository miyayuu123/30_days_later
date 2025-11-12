import React, { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  isPlaying?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  isPlaying = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const isGenerating = videoUrl === "generating";

  useEffect(() => {
    if (videoRef.current && !isGenerating) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isGenerating]);

  const handleLoadStart = () => setLoading(true);
  const handleCanPlay = () => setLoading(false);

  // Show generating placeholder if video is being generated
  if (isGenerating) {
    return (
      <div className="video-container">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-future-dark via-black to-future-dark">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-soft-orange/30 rounded-full mx-auto"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-soft-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-2 w-16 h-16 border-4 border-muted-green border-b-transparent rounded-full animate-spin-reverse mx-auto"></div>
            </div>
            <h3 className="text-warm-cream font-light text-lg mb-2 font-acoustic">Generating Video</h3>
            <p className="text-warm-brown/60 text-sm">Your personalized future is being created...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-container">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-future-dark">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-future-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading video...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="video-player"
        loop
        muted
        autoPlay
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        src={videoUrl}
      />
      
      <div className="overlay" />
    </div>
  );
};

export default VideoPlayer;