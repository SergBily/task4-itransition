import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ManagementState } from '../../models/State';

import UserService from '../../services/UserService';

type ErrorResponse = {
  errors: string[],
  message: string,
};

const initialState: ManagementState = {
  users: null,
  isSuccess: false,
  isLoading: false,
};

export const getAllUsers = createAsyncThunk(
  '/users',
  async (_, thunkAPI) => {
    try {
      return await UserService.getAllUsers();
    } catch (e) {
      const error = e as AxiosError;
      const message = ((error.response && error.response.data)
        || error.message || error.toString()) as ErrorResponse;
      return thunkAPI.rejectWithValue(message.message);
    }
  },
);

export const managementSlice = createSlice({
  name: 'management',
  initialState,
  reducers: {
    resetMan: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      });
  },
});

export const { resetMan } = managementSlice.actions;
export default managementSlice.reducer;
