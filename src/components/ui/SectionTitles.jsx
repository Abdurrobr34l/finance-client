import React from 'react';

const SectionTitles = ({ children, customCss }) => {
  return (
    <h2 className={`text-4xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl 2xl:leading-18 ${customCss}`}>
      {children}
    </h2>
  );
};

export default SectionTitles;