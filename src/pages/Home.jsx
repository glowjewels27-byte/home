import { useEffect, useState } from "react";
import api from "../utils/api.js";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { banners, instaGrid, testimonials } from "../data/homeData.js";
import { Link } from "react-router-dom";

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
            src="https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=1200&q=80"
            alt="Glow Jewels hero"
            className="rounded-2xl h-[420px] w-full object-cover"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <SectionHeader
          label="Featured"
          title="New Season Icons"
          subtitle="Curated for the Glow Jewels girl: delicate, confident, and modern."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
            : featured.map((product) => <ProductCard key={product._id} product={product} />)}
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

      <section className="max-w-6xl mx-auto px-6 py-12">
        <SectionHeader label="Instagram" title="Glow in Every Frame" subtitle="Tag @glowjewels to get featured." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instaGrid.map((src, idx) => (
            <img key={idx} src={src} alt="Glow Jewels" className="rounded-2xl object-cover h-48 w-full" />
          ))}
        </div>
      </section>
    </div>
  );
}
