import React, { useEffect } from 'react';
import './App.scss';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  Auth, Home, Layout, Management, NotFound, Registration,
} from './pages';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from './redux/Store';
import { getLocalStorage } from './libs/localStorage';
import { checkAuth, reset } from './redux/features/authSlice';

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const token: string = getLocalStorage('token');
    if (token) {
      dispatch(checkAuth());
      navigate('/management');
      dispatch(reset());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Auth />} />
          <Route path="registration" element={<Registration />} />
          <Route path="management" element={<Management />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
