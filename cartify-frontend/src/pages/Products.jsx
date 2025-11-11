// src/pages/Products.jsx
import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

// optional primitives (if you created them)
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-56 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await API.get('/products', { signal: ac.signal });
        // backend sometimes returns { items: [...] } or plain array
        const data = res.data?.items ?? res.data;
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === 'CanceledError' || err.message === 'canceled') return;
        console.error(err);
        setError(err?.response?.data?.message || err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => ac.abort();
  }, []);

  return (
    <main className="container mx-auto py-8">
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Products</h2>
          <p className="text-sm text-gray-600 mt-1">Browse our catalog — filter, search and add to cart.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/products?sort=new" className="text-sm text-gray-700 hover:text-brand-600">Newest</Link>
          <Link to="/products?sort=popular" className="text-sm text-gray-700 hover:text-brand-600">Popular</Link>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* loading skeletons */}
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-card p-4">
            <SkeletonCard />
          </div>
        ))}

        {/* empty state */}
        {!loading && items.length === 0 && (
          <div className="col-span-full bg-white p-8 rounded-xl text-center shadow-card">
            <h3 className="text-xl font-semibold">No products yet</h3>
            <p className="text-sm text-gray-500 mt-2">Check back later or add products from the admin panel.</p>
          </div>
        )}

        {/* product items */}
        {!loading && items.map(product => (
          <article key={product._id} className="bg-white rounded-xl shadow-card p-4 flex flex-col">
            {/* Image area */}
            <div className="relative pb-[72%] overflow-hidden rounded-md">
              <img
                src={product.images?.[0] || '/placeholder.png'}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* content */}
            <div className="mt-4 flex-1 flex flex-col">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-gray-900">₹{Number(product.price).toFixed(2)}</div>
                  <div className="text-xs text-muted">Stock: {product.stock ?? 0}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/products/${product._id}`} className="text-sm text-brand-600 hover:underline">View</Link>
                  {/* prefer using your Button primitive if available */}
                  {Button ? (
                    <Button variant="outline" onClick={() => {/* TODO: add to cart */}}>Add</Button>
                  ) : (
                    <button className="px-3 py-1 border rounded text-sm" onClick={() => { /* TODO */ }}>Add</button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
