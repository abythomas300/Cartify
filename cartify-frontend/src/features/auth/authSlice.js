// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') || null;
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  token,
  user,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStart(state) {
      state.loading = true;
      state.error = null;
    },
    setAuthSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.token || state.token;
      state.user = action.payload.user || state.user;
      state.isAuthenticated = !!state.token;
      state.error = null;
    },
    setAuthFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAuthStart, setAuthSuccess, setAuthFailure, logout } = authSlice.actions;
export default authSlice.reducer;
