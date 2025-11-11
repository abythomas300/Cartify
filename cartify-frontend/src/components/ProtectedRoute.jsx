// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Usage:
 * <Route element={<ProtectedRoute />}>
 *   <Route path="dashboard" element={<Dashboard />} />
 * </Route>
 *
 * This will redirect to /auth/login if not authenticated.
 */
export default function ProtectedRoute({ redirectTo = '/auth/login' }) {
  const auth = useSelector(state => state.auth || {});
  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to={redirectTo} replace />;
}
