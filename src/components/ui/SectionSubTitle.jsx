import React from 'react';

const SectionSubTitle = ({ children, customCss }) => {
  return (
    <p className={`mt-4 text-base leading-6 text-secondary md:text-lg ${customCss}`}>
      {children}
    </p>
  );
};

export default SectionSubTitle;