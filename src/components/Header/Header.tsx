import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Header: React.FC = (): JSX.Element => (
  <div className="header__wrapper">
    <div className="header__container">
      <h1>UserManagement</h1>
      <nav className="header__nav">
        <Link to="auth" className="header__link">
          <Button variant="contained" size="medium" className="header__btn">
            Sign in
          </Button>
        </Link>
        <Link to="registration" className="header__link">
          <Button variant="contained" size="medium" className="header__btn">
            Sign up
          </Button>
        </Link>
        <Link to="management" className="header__link">
          <Button variant="contained" size="medium" className="header__btn">
            management
          </Button>
        </Link>
      </nav>
    </div>
  </div>
);

export default Header;
