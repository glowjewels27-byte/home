import { useEffect, useState } from "react";
import api from "../utils/api.js";
import ProductCard from "../components/ProductCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";

const categories = ["Necklaces", "Earrings", "Rings", "Bracelets", "Anklets", "Combos"];
const occasions = ["Party", "Festive", "Daily"];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", type: "", sort: "newest", minPrice: "", maxPrice: "" });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", { params: filters });
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em]">Shop</p>
          <h1 className="font-serif text-4xl mt-2">All Jewellery</h1>
          <p className="text-charcoal/70 mt-3">Filters that fit your vibe — from daily shine to festive glam.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            className="border border-black/10 rounded-full px-4 py-2 text-sm"
            value={filters.sort}
            onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8 mt-10">
        <div className="space-y-6">
          <div className="glass p-5 rounded-2xl">
            <h3 className="font-serif text-lg">Category</h3>
            <div className="mt-4 space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat}
                    onChange={() => setFilters((prev) => ({ ...prev, category: cat }))}
                  />
                  {cat}
                </label>
              ))}
              <button onClick={() => setFilters((prev) => ({ ...prev, category: "" }))} className="text-xs uppercase tracking-[0.2em] mt-3">
                Clear
              </button>
            </div>
          </div>

          <div className="glass p-5 rounded-2xl">
            <h3 className="font-serif text-lg">Occasion</h3>
            <div className="mt-4 space-y-2">
              {occasions.map((occ) => (
                <label key={occ} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="type"
                    checked={filters.type === occ}
                    onChange={() => setFilters((prev) => ({ ...prev, type: occ }))}
                  />
                  {occ}
                </label>
              ))}
              <button onClick={() => setFilters((prev) => ({ ...prev, type: "" }))} className="text-xs uppercase tracking-[0.2em] mt-3">
                Clear
              </button>
            </div>
          </div>

          <div className="glass p-5 rounded-2xl">
            <h3 className="font-serif text-lg">Price</h3>
            <div className="mt-4 space-y-3">
              <input
                type="number"
                placeholder="Min"
                className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
              />
              <button
                onClick={() => setFilters((prev) => ({ ...prev, minPrice: "", maxPrice: "" }))}
                className="text-xs uppercase tracking-[0.2em]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
            : products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
    </div>
  );
}
