import React from 'react';
import { Link } from 'react-router';
import LogoImage from '/logo.svg';

const Logo = () => {
  return (
    <Link>
      <img src={LogoImage} alt="It is website logo" />
    </Link>
  );
};

export default Logo;