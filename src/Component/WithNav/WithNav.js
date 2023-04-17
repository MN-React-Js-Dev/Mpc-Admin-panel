import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Navbar/Header';
import SmallNav from './Navbar/SmallNav';

export default () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('MPCADMIN')

  useEffect(() => { 
    !token && navigate('/')
  },[token])

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