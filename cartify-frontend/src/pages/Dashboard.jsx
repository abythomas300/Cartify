// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseJwt } from '../utils/auth';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (!auth.user && auth.token) {
      const p = parseJwt(auth.token);
      setPayload(p || null);
    } else {
      setPayload(null);
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  const username = auth.user?.username || payload?.username || payload?.email || 'User';

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {username} 👋</h1>
          <p className="text-sm text-gray-600 mt-1">This is your dashboard. Manage orders, wishlist and profile here.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link to="/products" className="p-4 border rounded hover:shadow">
          <h3 className="font-semibold">Browse Products</h3>
          <p className="text-sm text-gray-500">See all products</p>
        </Link>
        <Link to="/cart" className="p-4 border rounded hover:shadow">
          <h3 className="font-semibold">Your Cart</h3>
          <p className="text-sm text-gray-500">View items in cart</p>
        </Link>
        <Link to="/wishlist" className="p-4 border rounded hover:shadow">
          <h3 className="font-semibold">Wishlist</h3>
          <p className="text-sm text-gray-500">Items you saved</p>
        </Link>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-medium">Account</h2>
        <div className="mt-2 text-sm text-gray-700">
          <div><strong>Email:</strong> {auth.user?.email || payload?.email || '—'}</div>
          <div className="mt-1"><strong>Role:</strong> {auth.user?.role || payload?.role || 'user'}</div>
        </div>
      </section>
    </div>
  );
}
