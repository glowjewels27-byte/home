import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setImage(data.images?.[0]);

        const { data: similar } = await api.get("/products", { params: { category: data.category, sort: "newest" } });
        setRelated((similar || []).filter((p) => p._id !== data._id).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!product) return null;

  const discountPct = product.discount || 0;
  const price = Math.round(product.price * (1 - discountPct / 100));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl bg-white shadow-glass">
            <img src={image} alt={product.name} className="h-[480px] w-full object-cover hover:scale-110 transition" />
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.images?.map((img) => (
              <button key={img} onClick={() => setImage(img)} className="h-20 w-20 rounded-xl overflow-hidden border">
                <img src={img} alt={product.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">{product.category}</p>
          <h1 className="font-serif text-4xl">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-medium">₹{price}</span>
            {discountPct > 0 && <span className="text-sm text-charcoal/50 line-through">₹{product.price}</span>}
          </div>
          <p className="text-charcoal/70">{product.description}</p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                addItem(product, 1);
                showToast("Added to cart");
              }}
              className="px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]"
            >
              Add to Cart
            </button>
            <Link to="/checkout" className="px-6 py-3 rounded-full border border-charcoal/20 text-sm uppercase tracking-[0.2em]">
              Buy Now
            </Link>
            <button
              onClick={async () => {
                await toggleWishlist(product);
                showToast(isWishlisted(product._id) ? "Removed from wishlist" : "Added to wishlist");
              }}
              className="px-6 py-3 rounded-full border border-charcoal/20 text-sm uppercase tracking-[0.2em]"
            >
              {isWishlisted(product._id) ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="glass rounded-xl p-4">
              <p className="text-charcoal/60">Occasion</p>
              <p className="font-medium">{product.type}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-charcoal/60">Stock</p>
              <p className="font-medium">{product.stock} available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="bg-white rounded-xl p-4 border border-black/5">Free delivery above ₹1000</div>
            <div className="bg-white rounded-xl p-4 border border-black/5">Secure checkout with UPI and cards via Razorpay</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl">You May Also Like</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-8">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
