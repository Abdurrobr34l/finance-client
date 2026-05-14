import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/navbar/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main className='min-h-[calc(100vh-448px)]'>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;