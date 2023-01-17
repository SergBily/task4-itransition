import React from 'react';
import './Auth.scss';
import {
  IconButton, InputLabel, InputAdornment, FormControl, Input, Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

const Auth: React.FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="sign__container">
      <h2 className="title">UserManagement</h2>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
        <Input
          id="standard-adornment-password"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            )}
        />
      </FormControl>
      <Link to="auth" className="sign__btn-link">
        <Button variant="contained" size="medium" className="sign__btn">
          Sign in
        </Button>
      </Link>
      <div className="sign__redirect">
        <p>No account?</p>
        <Link to="/registration" className="sign__link">Sign up</Link>
      </div>
    </div>
  );
};

export default Auth;
