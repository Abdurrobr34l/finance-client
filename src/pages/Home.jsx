import React from 'react';
import HeroSect from '../components/home/HeroSect';
import AboutSect from '../components/home/about/AboutSect';
import FeatureSect from '../components/home/FeatureSect';
import CommingSoonBanner from '../components/ui/ComingSoonPage/ComingSoonBanner';

const Home = () => {
  return (
    <>
      <HeroSect />
      <AboutSect />
      <FeatureSect />
      <CommingSoonBanner />
    </>
  );
};

export default Home;