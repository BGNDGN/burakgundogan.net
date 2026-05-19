import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';

import axios from 'axios';

import baseURL from '../../api/baseURL';

export const forgotPassword =
  createAsyncThunk(

    'forgotPassword/forgotPassword',

    async (email, { rejectWithValue }) => {

      try {

        const response = await axios.post(
          `${baseURL}/api/forgot-password`,
          { email },
          {
            headers: {
              'Content-Type': 'application/json',
            },

            timeout: 15000,
          }
        );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data?.message ||
          error.message ||
          'Bir hata oluştu'
        );
      }
    }
  );

const forgotPasswordSlice = createSlice({

  name: 'forgotPassword',

  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {

    resetForgotPasswordState: (state) => {

      state.loading = false;

      state.success = false;

      state.error = null;

    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        forgotPassword.pending,
        (state) => {

          state.loading = true;

          state.success = false;

          state.error = null;
        }
      )

      .addCase(
        forgotPassword.fulfilled,
        (state) => {

          state.loading = false;

          state.success = true;

          state.error = null;
        }
      )

      .addCase(
        forgotPassword.rejected,
        (state, action) => {

          state.loading = false;

          state.success = false;

          state.error = action.payload;
        }
      );
  },
});

export const {
  resetForgotPasswordState
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
