import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import {
  Auth, Main, Management, NotFound, Registration,
} from './pages';

const App: React.FC = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route path="auth" element={<Auth />} />
      <Route path="registration" element={<Registration />} />
      <Route path="management" element={<Management />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
