import { useEffect, useState } from "react";
import api from "../utils/api.js";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { banners, productTypes, testimonials } from "../data/homeData.js";
import { Link } from "react-router-dom";

const homeCategories = ["Necklaces", "Earrings", "Rings", "Bracelets", "Anklets", "Purse"];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/products", { params: { sort: "newest" } });
        setFeatured(data.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-hero-gradient">
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade">
          <p className="text-xs uppercase tracking-[0.4em]">Shine Every Day</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight">
            Shine Every Day with <span className="text-gradient">Glow Jewels ✨</span>
          </h1>
          <p className="text-charcoal/70 text-lg">
            Premium artificial jewellery crafted for your daily glow, festive nights, and Instagram-ready moments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">
              Shop Now
            </Link>
            <Link to="/about" className="px-6 py-3 rounded-full border border-charcoal/20 text-sm uppercase tracking-[0.2em]">
              Our Story
            </Link>
          </div>
        </div>
        <div className="glass rounded-2xl p-6 shadow-glow">
          <img
            src="/hero-gemini.png"
            alt="Glow Jewels hero"
            className="rounded-2xl h-[420px] w-full object-cover"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-2 md:hidden">
        <p className="text-xs uppercase tracking-[0.35em] text-charcoal/60 mb-3">Shop by Category</p>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {homeCategories.map((cat) => (
            <Link
              key={cat}
              to={`/shop?category=${encodeURIComponent(cat)}`}
              className="shrink-0 px-4 py-2 rounded-full bg-white border border-black/10 text-sm"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <SectionHeader
          label="Shop by Type"
          title="Signature Jewellery Categories"
          subtitle="Browse the Glow Jewels universe by silhouette, from everyday stacks to statement shine."
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {productTypes.slice(0, 6).map((item) => (
            <Link
              key={item.title}
              to={item.href || `/shop?category=${encodeURIComponent(item.title)}`}
              className="group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-glass transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(39,31,31,0.12)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-18 transition duration-300 group-hover:opacity-12`} />
              <div className="relative aspect-[4/4.6] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full scale-[1.03] object-cover blur-[2px] brightness-[0.92] saturate-[1.02] transition duration-500 group-hover:scale-[1.06] group-hover:blur-[0.5px]"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal/28 via-charcoal/6 to-white/3 transition duration-300 group-hover:from-charcoal/34" />
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
                  <div>
                    <span className="inline-flex rounded-full border border-white/45 bg-white/18 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur-md">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-serif text-4xl text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                      {item.title}
                    </h3>
                    <span className="translate-y-3 rounded-full border border-white/45 bg-white/16 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Explore
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.title} className={`rounded-2xl p-6 ${banner.tone} shadow-glass`}>
            <p className="text-xs uppercase tracking-[0.3em]">Glow Edit</p>
            <h3 className="font-serif text-2xl mt-3">{banner.title}</h3>
            <p className="text-charcoal/70 mt-2">{banner.subtitle}</p>
            <button className="mt-5 text-sm uppercase tracking-[0.2em]">{banner.cta}</button>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <SectionHeader label="Trending" title="Glow Bestsellers" />
        <div className="grid md:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
            : featured.slice(0, 3).map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <SectionHeader label="Loved by" title="Glow Girls Speak" />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.name} className="glass rounded-2xl p-6 shadow-glass">
              <p className="text-charcoal/70">“{item.quote}”</p>
              <p className="mt-4 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
