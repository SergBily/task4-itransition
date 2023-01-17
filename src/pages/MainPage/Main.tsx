import React from 'react';
import './Main.scss';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Main: React.FC = (): JSX.Element => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Main;
