import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/navbar/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;