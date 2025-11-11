// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../features/auth/authSlice';
import { setAPIToken } from '../api/axios';
import { HiMenu, HiX, HiOutlineShoppingCart, HiOutlineHeart } from 'react-icons/hi';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth || {});
  const { isAuthenticated = false, user = null } = auth;
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // clear storage + axios header + redux
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAPIToken(null);
    dispatch(logoutAction());
    setOpen(false);
    navigate('/');
  };

  const username = user?.username || (user?.email ? user.email.split('@')[0] : null);

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold text-indigo-600">Cartify</Link>

          <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
            <Link to="/products" className="hover:text-indigo-700">Products</Link>
            <Link to="/wishlist" className="hover:text-indigo-700">Wishlist</Link>
            <Link to="/cart" className="hover:text-indigo-700">Cart</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-indigo-700">
            <HiOutlineShoppingCart className="w-5 h-5" /> <span className="text-sm">Cart</span>
          </Link>

          <Link to="/wishlist" className="flex items-center gap-2 text-gray-600 hover:text-indigo-700">
            <HiOutlineHeart className="w-5 h-5" /> <span className="text-sm">Wishlist</span>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/auth/login" className="text-sm text-gray-700 hover:text-indigo-700">Login</Link>
              <Link to="/auth/register" className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">Register</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">Hi, <span className="font-medium">{username}</span></span>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-sm text-gray-700 hover:text-indigo-700">Admin</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-2 text-sm px-3 py-1 border rounded border-gray-200 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        {/* mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="menu">
          {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link to="/products" onClick={() => setOpen(false)} className="py-2">Products</Link>
            <Link to="/wishlist" onClick={() => setOpen(false)} className="py-2">Wishlist</Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="py-2">Cart</Link>

            {!isAuthenticated ? (
              <>
                <Link to="/auth/login" onClick={() => setOpen(false)} className="py-2">Login</Link>
                <Link to="/auth/register" onClick={() => setOpen(false)} className="py-2">Register</Link>
              </>
            ) : (
              <>
                <div className="py-2">Hi, {username}</div>
                {user?.role === 'admin' && <Link to="/admin" onClick={() => setOpen(false)} className="py-2">Admin</Link>}
                <button onClick={handleLogout} className="text-left py-2">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
