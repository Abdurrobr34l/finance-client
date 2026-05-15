import React from 'react';
import HeroSect from '../components/home/HeroSect';
import AboutSect from '../components/home/about/AboutSect';
import FeatureSect from '../components/home/FeatureSect';
import CommingSoonBanner from '../components/ui/ComingSoonPage/ComingSoonBanner';
import Testimonials from '../components/home/testimonials/Testimonials';
import HowItWorks from '../components/home/HowItWorks';

const Home = () => {
  return (
    <>
      <HeroSect />
      <AboutSect />
      <FeatureSect />
      <HowItWorks/>
      {/* Security */}
      <Testimonials/>
      {/* client */}
      {/* faq */}
      {/* get started */}
      <CommingSoonBanner />
    </>
  );
};

export default Home;