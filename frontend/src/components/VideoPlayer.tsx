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

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleLoadStart = () => setLoading(true);
  const handleCanPlay = () => setLoading(false);

  return (
    <div className="video-container">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-future-dark">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-future-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Generating your future...</p>
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