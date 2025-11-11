// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// add other reducers as they come
const store = configureStore({
  reducer: {
    auth: authReducer,
    // products: productsReducer,
    // cart: cartReducer,
  },
});

// optional: expose store for debugging (remove in production)
if (typeof window !== 'undefined') {
  window.store = store;
}

export default store;
