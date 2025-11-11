// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(() => {
    API.get(`/products/${id}`).then(r => setP(r.data)).catch(console.error);
  }, [id]);
  if (!p) return <div>Loading...</div>;
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{p.name}</h1>
      <p className="mb-4">{p.description}</p>
      <div className="text-2xl font-semibold">₹{p.price}</div>
    </div>
  );
}
