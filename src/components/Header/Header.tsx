import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

const Header: React.FC = (): JSX.Element => (
  <>
    <Link to="auth">Auth</Link>
    <Link to="registration">registration</Link>
    <Link to="management">management</Link>
  </>
);

export default Header;
