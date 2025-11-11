// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API, { setAPIToken } from '../../api/axios';
import { setAuthStart, setAuthSuccess, setAuthFailure } from '../../features/auth/authSlice';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setLoadingLocal(true);
    dispatch(setAuthStart());

    try {
      const res = await API.post('/auth/login', form);

      // SAFELY extract token & user from response (handle multiple possible shapes)
      const resp = res?.data ?? {};
      const tokenFromRes = resp.token ?? resp.authToken ?? resp.accessToken ?? null;
      const userFromRes = resp.user ?? resp.userData ?? resp.profile ?? null;

      // persist token & user
      if (tokenFromRes) {
        localStorage.setItem('token', tokenFromRes);
        setAPIToken(tokenFromRes); // ensure API has header immediately
      }
      if (userFromRes) {
        localStorage.setItem('user', JSON.stringify(userFromRes));
      }

      // update redux (always pass an object, even if null)
      dispatch(setAuthSuccess({ token: tokenFromRes, user: userFromRes }));

      // navigate to dashboard or home
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      setLocalError(msg);
      dispatch(setAuthFailure(msg));
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>

        {localError && <p className="text-red-600 text-sm mb-3 text-center">{localError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loadingLocal}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loadingLocal ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-indigo-600 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
