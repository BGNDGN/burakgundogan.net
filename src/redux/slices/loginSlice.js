import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../api/baseURL';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/login`,
        userData
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);

      return { token, user };

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login hatası'
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  'login/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return rejectWithValue('Token yok');
      }

      const res = await axios.get(`${baseURL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          _t: Date.now(), 
        },
      });

      return res.data?.user || null;

    } catch (error) {
      localStorage.removeItem('token');

      return rejectWithValue(
        error.response?.data?.message || 'Auth başarısız'
      );
    }
  }
);
  
const loginSlice = createSlice({
  name: 'login',

  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },

  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;