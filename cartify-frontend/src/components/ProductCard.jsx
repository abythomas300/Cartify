import Button from './ui/Button';
import Card from './ui/Card';

export default function ProductCard({ product }) {
  return (
    <Card className="flex flex-col">
      <div className="relative pb-72 overflow-hidden rounded-lg">
        <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold text-gray-900">₹{product.price}</div>
          <div className="text-xs text-muted">Stock: {product.stock}</div>
        </div>
        <Button variant="outline">Add</Button>
      </div>
    </Card>
  );
}
