import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../api/baseURL';

export const resetPassword =
  createAsyncThunk(
    'resetPassword/resetPassword',

    async (
      { token, password, confirmPassword },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          `${baseURL}/api/reset-password/${token}`,
          {
            password,
            confirmPassword,
          }
        );
        return response.data;

      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
          'Bir hata oluştu.'
        );
      }
    }
  );

const resetPasswordSlice = createSlice({
  name: 'resetPassword',

  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetResetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        resetPassword.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        resetPassword.fulfilled,
        (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        }
      )

      .addCase(
        resetPassword.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  resetResetPasswordState
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;