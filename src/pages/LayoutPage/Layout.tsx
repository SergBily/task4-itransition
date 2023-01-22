import React from 'react';
import './layout.scss';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Layout: React.FC = (): JSX.Element => (
  <div className="app__wrapper">
    <Header />
    <div className="wrapper">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default Layout;
