import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import managementReducer from './features/managementSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    management: managementReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
