import Button from './ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-brand-50 to-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Find the best deals on everyday essentials</h1>
          <p className="text-gray-600 mb-6">Browse curated collections, fast shipping and secure payments.</p>
          <div className="flex gap-3">
            <Button onClick={() => window.location = '/products'}>Shop Products</Button>
            <Button variant="ghost" onClick={() => window.location = '/wishlist'}>Wishlist</Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <img src="/hero-sample.jpg" alt="hero" className="w-full h-64 object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
