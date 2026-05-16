import React from 'react';
import { Link } from 'react-router';
import LogoImage from '/logo.png';

const Logo = ({ customCss }) => {
  return (
    <Link to={"/"} className='hover:cursor-pointer'>
      <img src="/logo.png" alt="Website logo" className={`size-16 ${customCss}`} />
    </Link>
  );
};

export default Logo;