// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store'; // <-- single import
import { setAuthSuccess } from './features/auth/authSlice';
import { setAPIToken } from './api/axios';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx'; 
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';

import './index.css';

// initialize auth state from localStorage (once, before render)
const initialToken = localStorage.getItem('token');
const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
if (initialToken) {
  setAPIToken(initialToken);
  store.dispatch(setAuthSuccess({ token: initialToken, user: initialUser }));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="products">
              <Route index element={<Products />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>

            {/* Protected: only authenticated users */}
          <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cart" element={<div>Cart page (protected)</div>} />
          <Route path="wishlist" element={<div>Wishlist page (protected)</div>} />
          </Route>
            {/* Admin-only */}
             <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPanel />} />
            </Route>
            <Route path="auth">
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route path="*" element={<div className="p-8">Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
