import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../api/baseURL';

export const changePassword = createAsyncThunk(
  'changePassword/changePassword',

  async (passwordData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${baseURL}/api/change-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Şifre değiştirilemedi'
      );
    }
  }
);

const changePasswordSlice = createSlice({
  name: 'changePassword',

  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetChangePasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetChangePasswordState
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;