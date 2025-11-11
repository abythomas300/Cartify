// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Cartify</h1>
      <p className="mb-6">A simple MERN + S3 + Razorpay demo store.</p>
      <Link to="/products" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded">Browse products</Link>
    </div>
  );
}
