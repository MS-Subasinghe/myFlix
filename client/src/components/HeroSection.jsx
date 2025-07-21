import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://wallpaperbat.com/img/814107-interstellar-matthew-mcconaughey-ultra-hd-desktop-background-wallpaper-for-4k-uhd-tv-widescreen-ultrawide-desktop-laptop-tablet-smartphone.jpg")',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full text-white">
        {/* Paramount Pictures Text */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-300 mt-20 drop-shadow">
          Paramount Pictures
        </h2>

        <h1 className="text-5xl md:text-[70px] md:leading-[5rem] font-semibold max-w-4xl drop-shadow-lg">
          Interstellar
        </h1>

        <div className="flex items-center gap-4 text-gray-300 drop-shadow">
          <span>Adventure | Drama | Sci-Fi</span>

          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4.5 h-4.5" /> 2014
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon className="w-4.5 h-4.5" /> 2h 49m
          </div>
        </div>

        <p className="max-w-md text-gray-300 drop-shadow">
          Interstellar follows a team of explorers who travel through a wormhole in space
          in an attempt to ensure humanity's survival. A visually stunning, emotional, and
          scientifically inspired journey directed by Christopher Nolan.
        </p>

        <button
          onClick={() => navigate('/movies')}
          className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer drop-shadow"
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
