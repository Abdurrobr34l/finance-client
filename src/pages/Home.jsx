import React from 'react';
import HeroSect from '../components/home/HeroSect';
import AboutSect from '../components/home/about/AboutSect';
import FeatureSect from '../components/home/FeatureSect';

const Home = () => {
  return (
    <>
      <HeroSect />
      <AboutSect />
      <FeatureSect />
    </>
  );
};

export default Home;