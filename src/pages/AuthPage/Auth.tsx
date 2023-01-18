import React, { useState } from 'react';
import './auth.scss';
import {
  Button, Container, Grid, Paper, TextField, InputAdornment, IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import handlerPreventDefault from '../../libs/handlers';

interface LoginFields {
  name: string,
  password: string,
  showPassword: boolean
}

const Auth: React.FC = (): JSX.Element => {
  const [values, setValues] = useState<LoginFields>({
    name: '',
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handlerPreventDefault} className="sign__form">
        <Container maxWidth="xs" className="sign__container">
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            className="sign__container-grid"
          >
            <h2 className="title">UserManagement</h2>
            <Paper elevation={2} sx={{ padding: 1 }} style={{ maxWidth: '100%' }}>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <TextField
                    id="name"
                    type="text"
                    fullWidth
                    label="Name"
                    placeholder="Enter your name"
                    variant="outlined"
                    value={values.name}
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="password"
                    type={values.showPassword ? 'text' : 'password'}
                    fullWidth
                    label="Password"
                    placeholder="enter your password"
                    variant="outlined"
                    value={values.password}
                    onChange={changeHandler}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handlerPreventDefault}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Link to="auth" className="sign__btn-link">
                    <Button variant="contained" fullWidth className="sign__btn">
                      Sign in
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Paper>
            <div className="sign__redirect">
              <p>No account?</p>
              <Link to="/registration" className="sign__link">Sign up</Link>
            </div>
          </Grid>
        </Container>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Auth;
