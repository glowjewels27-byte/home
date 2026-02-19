import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl">Your Wishlist</h1>
      <p className="text-charcoal/70 mt-2">Save your favorite pieces and come back anytime.</p>

      {items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-charcoal/70">No wishlist items yet.</p>
          <Link to="/shop" className="mt-5 inline-block px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
