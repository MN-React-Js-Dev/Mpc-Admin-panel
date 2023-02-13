import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Navbar/Header';
import SmallNav from './Navbar/SmallNav';

export default () => {
  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <Header/>
            <div class="layout-page">
                <SmallNav  />
                <Outlet />
                <Footer />
            </div>
        </div>
        </div>
    </>
  );
};