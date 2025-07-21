import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = () => {
    const foundShow = dummyShowsData.find(show => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className='relative z-10 px-6 md:px-16 lg:px-40 pt-24 pb-20'>

  
      <BlurCircle top='-80px' left='-80px' />
      <BlurCircle top='100px' left='80%' />
      <BlurCircle top='600px' left='-60px' />
      <BlurCircle top='750px' left='70%' />

      <div className='flex flex-col md:flex-row gap-12 max-w-7xl mx-auto items-center md:items-start'>

     
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className='rounded-2xl w-full md:w-[400px] h-auto object-cover shadow-2xl border-4 border-gray-700'
        />

        {/* 📄 Movie Info */}
        <div className='flex flex-col gap-4 text-white max-w-2xl'>
          <p className='text-primary uppercase tracking-wider'>Language: English</p>

          <h1 className='text-5xl font-bold leading-tight text-balance'>
            {show.movie.title}
          </h1>

          <div className='flex items-center gap-2 text-yellow-400 text-lg font-medium'>
            <StarIcon className='w-5 h-5 fill-yellow-400' />
            {show.movie.vote_average.toFixed(1)} / 10
          </div>

          <p className='text-gray-300 text-sm leading-relaxed mt-2'>
            {show.movie.overview}
          </p>

          <p className='text-gray-400 mt-4 text-sm'>
            <span className='font-medium text-white'>Duration:</span> {timeFormat(show.movie.runtime)}<br />
            <span className='font-medium text-white'>Genres:</span> {show.movie.genres?.map(genre => genre.name).join(', ')}<br />
            <span className='font-medium text-white'>Year:</span> {show.movie.release_date?.split('-')[0]}
          </p>

            <div className='flex items-center flex-wrap gap-4 mt-4'>
              <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
                <PlayCircleIcon className='w-5 h-5'/>
                
                Watch Trailer</button>
              <a href='#dateSelect' className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
              <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                <Heart className={`w-5 h-5`}/>
              </button>
            </div>

        </div>
      </div>


      <p className='text-lg font-medium mt-20'>Your favourite cast</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
       <div className='flex items-center gap-4 w-max px-4'>
  {show.movie.casts.slice(0, 12).map((cast, index) => (
    <div key={index} className='flex flex-col items-center text-center text-white'>
      <img
        src={cast.profile_path}
        alt={cast.name}
        className='rounded-full h-20 w-20 object-cover border-2 border-gray-600'
      />
      <p className='font-medium text-xs mt-3'>{cast.name}</p>
    </div>
  ))}
</div>

         
          
      </div>
    </div>
  ) : (
    <div className='text-center py-20 text-gray-400 text-xl'>Loading...</div>
  );
};

export default MovieDetails;
