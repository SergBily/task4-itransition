import React from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../redux/Store';

const Header: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className="header__wrapper">
      <div className="header__container">
        <h1 className="header__title">UserManagement</h1>
        <nav className="header__nav">
          {user ? (
            <Button variant="contained" size="medium" className="header__btn" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="login" className="header__link">
                <Button variant="contained" size="medium" className="header__btn">
                  Sign in
                </Button>
              </Link>
              <Link to="registration" className="header__link">
                <Button variant="contained" size="medium" className="header__btn">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
