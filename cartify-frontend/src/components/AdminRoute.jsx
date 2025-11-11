// src/components/AdminRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Usage:
 * <Route element={<AdminRoute />}>
 *   <Route path="admin" element={<AdminPanel />} />
 * </Route>
 *
 * Redirects to /auth/login if not authenticated, or to / if not admin.
 */
export default function AdminRoute({ redirectTo = '/auth/login' }) {
  const auth = useSelector(state => state.auth || {});
  const { isAuthenticated, user } = auth;

  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
}
