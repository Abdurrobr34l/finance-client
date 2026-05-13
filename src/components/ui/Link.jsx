import React from 'react';
import { NavLink } from 'react-router';

const Link = ({to, children}) => {
  return (
    <NavLink to={to}>
      {children}
    </NavLink>
  );
};

export default Link;