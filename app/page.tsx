import Script from 'next/script';
import React from 'react';
import Header from './components/header';
import Hero from './components/hero';
import MotionLogoCarousel from './components/trusted';
import Footer from './components/footer';
import ServiceCoverage from './components/services';
import CarygooFeature from './components/carygooFeature';
import AppFeatures from './components/appFeature';
import CarygooStatsDark from './components/carygooStatsDark';

const LandwindPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <MotionLogoCarousel />
      <ServiceCoverage />
      <CarygooFeature />
      <AppFeatures/>
      <CarygooStatsDark />
      <Footer />
      {/* Script components for optimized loading */}
      <Script async defer src="https://buttons.github.io/buttons.js" strategy="afterInteractive" />
      <Script src="https://flowbite.com/docs/flowbite.min.js" strategy="lazyOnload" />
    </>
  );
};

export default LandwindPage;