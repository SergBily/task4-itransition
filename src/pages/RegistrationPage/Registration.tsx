import React, { useState } from 'react';
import './Registration.scss';
import {
  Button, Container, Grid, Paper, TextField, InputAdornment, IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import handlerPreventDefault from '../../libs/handlers';
import RegistLoginFields from '../../models';
import useNewUser from '../../hooks/api';

const Registration: React.FC = (): JSX.Element => {
  const [visibilityPass, setvisibilityPass] = useState<boolean>(false);
  const [values, setValues] = useState<RegistLoginFields>({
    name: '',
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setvisibilityPass((visibility) => !visibility);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const hendleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    useNewUser(values);
  };

  return (
    <div>
      <form onSubmit={hendleOnSubmit} className="sign__form">
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
                    id="email"
                    type="email"
                    fullWidth
                    label="Email"
                    placeholder="enter your email"
                    variant="outlined"
                    value={values.email}
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="password"
                    type={visibilityPass ? 'text' : 'password'}
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
                            {visibilityPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" fullWidth variant="contained" className="sign__btn">
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <div className="sign__redirect">
              <p>Already have an account?</p>
              <Link to="/auth" className="sign__link">Sign in</Link>
            </div>
          </Grid>
        </Container>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Registration;
