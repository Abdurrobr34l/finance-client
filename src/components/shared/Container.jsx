import React from 'react';

const Container = ({ children, className = "" }) => {
  return (
    // <div className={`container mx-auto px-5 md:px-10 lg:px-14 xl:px-16 ${className}`}>
    <div className={`container mx-auto px-5 md:px-10 xl:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;