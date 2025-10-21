import React, { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import NavBar from "./NavBar";

const Browse = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      id: 1,

      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop",
    },
    {
      id: 2,

      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=200&fit=crop",
    },
    {
      id: 3,

      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjaAWw7xr2u28rQNHoRFhZsaCT7TZ1f4kfxg&s",
    },
    
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [currentVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoSelect = (index) => {
    setCurrentVideo(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <>
      <NavBar />
      <div className="relative h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          key={currentVideo}
        >
          <source src={videos[currentVideo].url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>

        <div className="absolute bottom-8 right-8 flex gap-3 z-20">
          <button
            onClick={togglePlayPause}
            className="bg-black/70 hover:bg-black/90 p-3 rounded-full backdrop-blur-sm transition-all duration-300 group"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform fill-white" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="bg-black/70 hover:bg-black/90 p-3 rounded-full backdrop-blur-sm transition-all duration-300 group"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Volume2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        <div className="absolute left-5 md:left-10 bottom-8 w-full max-w-[600px] z-20 px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => handleVideoSelect(index)}
                className={`relative flex-shrink-1 w-40 h-24 md:w-48 md:h-28 rounded-lg overflow-x-hidden cursor-pointer transition-all duration-300 group ${
                  currentVideo === index
                    ? "ring-4 ring-red-600 scale-105"
                    : "ring-2 ring-gray-700 hover:ring-white hover:scale-105"
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    currentVideo === index
                      ? "bg-red-600/20"
                      : "bg-black/40 group-hover:bg-black/20"
                  }`}
                >
                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`bg-black/70 p-2 rounded-full transition-all duration-300 ${
                        currentVideo === index
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    >
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                  <p className="text-white text-xs font-semibold truncate">
                    {video.title}
                  </p>
                </div>

                {/* Active Indicator */}
                {currentVideo === index && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>
    </>
  );
};

export default Browse;
