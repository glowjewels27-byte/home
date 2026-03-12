import { useEffect, useMemo, useState } from "react";
import api from "../utils/api.js";
import ProductCard from "../components/ProductCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { useSearchParams } from "react-router-dom";

const categories = ["Necklaces", "Earrings", "Rings", "Bracelets", "Anklets", "Combos", "Purse"];
const occasions = ["Party", "Festive", "Daily"];
const PAGE_SIZE = 9;

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({ category: "", type: "", sort: "newest", minPrice: "", maxPrice: "", q: "" });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", { params: filters });
      setProducts(data || []);
      setPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const type = searchParams.get("type") || "";
    const q = searchParams.get("q") || "";
    setFilters((prev) => ({ ...prev, category, type, q }));
    setPage(1);
  }, [searchParams]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const pagedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, page]);

  const activeFilterCount = [filters.category, filters.type, filters.minPrice, filters.maxPrice].filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em]">Shop</p>
          <h1 className="font-serif text-4xl mt-2">All Jewellery</h1>
          <p className="text-charcoal/70 mt-3">Find your style faster with search, filters, and curated sorting.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Search products"
            className="border border-black/10 rounded-full px-4 py-2 text-sm w-full md:w-auto"
            value={filters.q}
            onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
          />
          <select
            className="border border-black/10 rounded-full px-4 py-2 text-sm"
            value={filters.sort}
            onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <button
            onClick={() => setShowMobileFilters((v) => !v)}
            className="md:hidden border border-black/10 rounded-full px-4 py-2 text-sm"
          >
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </div>
      </div>

      {showMobileFilters && (
        <div className="md:hidden mt-6 glass rounded-2xl p-5 space-y-4 animate-fade">
          <div className="grid grid-cols-2 gap-3">
            <select
              className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm bg-white"
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm bg-white"
              value={filters.type}
              onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="">All Occasions</option>
              {occasions.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min price"
              className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Max price"
              className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, category: "", type: "", minPrice: "", maxPrice: "" }))}
              className="text-xs uppercase tracking-[0.2em]"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="px-4 py-2 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-[0.2em]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-[280px_1fr] gap-8 mt-10">
        <div className="space-y-6 hidden md:block">
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

        <div>
          <div className="flex items-center justify-between mb-6 text-sm text-charcoal/70">
            <p>{products.length} products found</p>
            <p>Page {page} of {totalPages}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
              : pagedProducts.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>

          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-full border border-black/10 text-sm disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-full border border-black/10 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
