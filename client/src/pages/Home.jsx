// Home.jsx
import React from 'react';
import HeroSection from '../components/heroSection.jsx';
import FeaturedSection from '../components/FeaturedSection.jsx';
import TrailerSection from '../components/TrailerSection.jsx';

const Home = () => {
  return (
    <>
      <HeroSection/>
      <FeaturedSection/>
      <TrailerSection/>
    </>
  );
};

export default Home;
