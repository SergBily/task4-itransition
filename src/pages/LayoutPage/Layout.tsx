import React from 'react';
import './layout.scss';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Layout: React.FC = (): JSX.Element => (
  <>
    <Header />
    <div className="wrapper">
      <Outlet />
    </div>
  </>
);

export default Layout;
