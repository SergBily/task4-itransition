import React, { useState, useEffect } from 'react';
import './auth.scss';
import {
  Button, Container, Grid, Paper, TextField, InputAdornment, IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../redux/Store';
import handlerPreventDefault from '../../libs/handlers';
import RegistrationUser from '../../models/RegistrationUser';
import Spinner from '../../components/spiner/Spinner';
import toastPostionBottom from '../../libs/toat-position';

const Auth: React.FC = (): JSX.Element => {
  const [visibilityPass, setvisibilityPass] = useState<boolean>(false);

  const [values, setValues] = useState<Omit<RegistrationUser, 'name'>>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, toastPostionBottom);
    }
    if (isSuccess) {
      toast.success('You are login', toastPostionBottom);
      navigate('/management');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleClickShowPassword = () => {
    setvisibilityPass((visibility) => !visibility);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const hendleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(values));
  };

  if (isLoading) {
    return <Spinner />;
  }

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
                    id="email"
                    type="email"
                    fullWidth
                    label="Email"
                    placeholder="Enter your email"
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
                  <Button type="submit" variant="contained" fullWidth className="sign__btn">
                    Sign in
                  </Button>
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
