import { useState } from "react";
import { dummyTrailers } from "../assets/assets.js";
import { PlayCircleIcon } from "lucide-react";

// Simple BlurCircle component
const BlurCircle = ({ top, right }) => (
  <div
    className="absolute w-32 h-32 bg-blue-500 rounded-full blur-xl opacity-20"
    style={{ top, right }}
  />
);

// Enhanced VideoPlayer with error handling
const VideoPlayer = ({ url, controls = true, playing = false, muted = true }) => {
  const [hasError, setHasError] = useState(false);

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        <p className="text-white">Invalid video URL</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-center p-8">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <p className="text-white mb-2">Video cannot be embedded</p>
        <p className="text-gray-400 text-sm mb-4">This video has embedding restrictions</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Watch on YouTube
        </a>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${playing ? 'autoplay=1&' : ''}${muted ? 'mute=1&' : ''}rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <iframe
      src={embedUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
      onError={() => setHasError(true)}
      onLoad={(e) => {
        setTimeout(() => {
          try {
            const iframe = e.target;
            if (iframe.contentWindow && iframe.contentWindow.location.href === 'about:blank') {
              setHasError(true);
            }
          } catch (error) {
            console.log('Video loaded (cross-origin restrictions normal)');
          }
        }, 1000);
      }}
    />
  );
};

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden text-white bg-gray-900 min-h-screen">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">Trailers</p>

      <div className="relative mt-6 flex justify-center">
        <BlurCircle top="-100px" right="-100px" />
        <div className="w-full max-w-[960px] aspect-video border border-white bg-black">
          {currentTrailer?.videoUrl ? (
            <VideoPlayer
              url={currentTrailer.videoUrl}
              controls={true}
              playing={false}
              muted={true}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white">No video URL available</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mt-10 max-w-4xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="relative cursor-pointer transition duration-300 hover:-translate-y-1"
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="Trailer thumbnail"
              className="rounded-lg w-full h-full object-cover brightness-75"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 h-8 md:w-10 md:h-10 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
