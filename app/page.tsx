import Script from 'next/script';
import React from 'react';
import HomePage from './home/page';

const LandwindPage = () => {
  return (
    <>
    <HomePage/>
      {/* Script components for optimized loading */}
      <Script async defer src="https://buttons.github.io/buttons.js" strategy="afterInteractive" />
      <Script src="https://flowbite.com/docs/flowbite.min.js" strategy="lazyOnload" />
    </>
  );
};

export default LandwindPage;