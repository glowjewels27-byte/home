import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const discountPct = product.discount || 0;
  const price = Math.round(product.price * (1 - discountPct / 100));
  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="relative overflow-hidden rounded-xl shadow-glass bg-white">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-64 w-full object-cover group-hover:scale-105 transition"
        />
        {discountPct > 0 && (
          <span className="absolute top-4 left-4 bg-blush text-xs px-3 py-1 rounded-full">
            {discountPct}% off
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-sm uppercase tracking-[0.2em] text-charcoal/60">{product.category}</p>
        <h3 className="font-serif text-lg">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">₹{price}</span>
          {discountPct > 0 && (
            <span className="text-xs text-charcoal/50 line-through">₹{product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
