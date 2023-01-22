import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import SERVER_URL from '../../environment';
import { getLocalStorage, setLocalStorage } from '../../libs/localStorage';
import { AuthResponse, UserAuthResponse } from '../../models/AuthResponse';
import RegistrationUser from '../../models/RegistrationUser';
import { UserState } from '../../models/State';
import AuthService from '../../services/AuthService';

const user: UserAuthResponse | null = <UserAuthResponse>getLocalStorage('user');

type ErrorResponse = {
  errors: string[],
  message: string
};

const initialState: UserState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const registration = createAsyncThunk<UserAuthResponse, RegistrationUser>(
  '/registration',
  async (userData, thunkAPI) => {
    try {
      return await AuthService.registration(userData);
    } catch (e) {
      const error = e as AxiosError;
      const message = ((error.response && error.response.data)
        || error.message || error.toString()) as ErrorResponse;
      return thunkAPI.rejectWithValue(message.message);
    }
  },
);

export const login = createAsyncThunk<UserAuthResponse, Omit<RegistrationUser, 'name'>>(
  '/login',
  async (userData, thunkAPI) => {
    try {
      return await AuthService.login(userData);
    } catch (e) {
      const error = e as AxiosError;
      const message = ((error.response && error.response.data)
        || error.message || error.toString()) as ErrorResponse;
      return thunkAPI.rejectWithValue(message.message);
    }
  },
);

export const logout = createAsyncThunk<void, void>(
  '/logout',
  async () => {
    await AuthService.logout();
  },
);

export const checkAuth = createAsyncThunk(
  '/refresh',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<AuthResponse>(`${SERVER_URL}/refresh`, { withCredentials: true });
      const { data } = response;
      setLocalStorage('token', data.accessToken);
      return data.user;
    } catch (e) {
      const error = e as AxiosError;
      const message = ((error.response && error.response.data)
        || error.message || error.toString()) as ErrorResponse;
      return thunkAPI.rejectWithValue(message.message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
