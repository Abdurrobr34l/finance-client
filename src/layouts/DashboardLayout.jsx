import React from 'react';
import { Outlet } from 'react-router';
import Dashboard from '../pages/Dashboard';

const DashboardLayout = () => {
  return (
    <>
      <Dashboard />
      <Outlet />
    </>
  );
};

export default DashboardLayout;