import { useEffect, useRef } from "react";
import "../styles/rsJewellersOpening.css";

const PHONE = "9814420941";
const PHONE_LINK = `tel:+91${PHONE}`;
const WHATSAPP_LINK = `https://wa.me/91${PHONE}?text=${encodeURIComponent("Hello, I'd like to enquire about RS Jewellers grand opening.")}`;
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=RS+Jewellers+Main+Hambran+Road+Ludhiana+Opposite+Ram+Sharnam";

const SEO = {
  title: "RS Jewellers Grand Opening | 11 October 2026 | Ludhiana",
  description:
    "RS Jewellers invites you to the grand opening of our new retail store on Main Hambran Road, Ludhiana on 11 October 2026. 18K & 22K gold jewellery, diamond, silver & custom jewellery.",
  keywords:
    "RS Jewellers Ludhiana, jewellery store Ludhiana, gold jewellery, diamond jewellery, 18K gold, 22K gold, Hambran Road Ludhiana, grand opening",
};

const COLLECTIONS = [
  {
    title: "Gold Jewellery",
    description:
      "Explore beautifully crafted 18K and 22K gold jewellery featuring timeless designs and contemporary styles.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <circle cx="12" cy="14" r="6" />
        <path d="M12 8V5M9 5h6" />
      </svg>
    ),
  },
  {
    title: "Diamond Jewellery",
    description:
      "Discover elegant diamond pieces designed for special occasions and everyday luxury.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <path d="M12 2L22 9L12 22L2 9L12 2Z" />
        <path d="M2 9H22M12 2L7 9M12 2L17 9M7 9L12 22M17 9L12 22" />
      </svg>
    ),
  },
  {
    title: "Silver Jewellery",
    description: "A refined collection of stylish silver jewellery for every occasion.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <ellipse cx="12" cy="14" rx="7" ry="5" />
        <path d="M5 14c0-4 3.5-7 7-7s7 3 7 7" />
      </svg>
    ),
  },
  {
    title: "Custom Jewellery",
    description: "Bring your ideas to life with customised jewellery crafted to your requirements.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

const HIGHLIGHTS = [
  "18K & 22K Gold Jewellery",
  "Diamond Jewellery",
  "Silver Jewellery",
  "Customised Jewellery",
  "Hallmarked Jewellery",
  "Manufacturer & Supplier",
];

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const elements = root.querySelectorAll(".rs-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rs-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

function usePageMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = SEO.title;

    const tags = [
      { name: "description", content: SEO.description },
      { name: "keywords", content: SEO.keywords },
      { property: "og:title", content: SEO.title },
      { property: "og:description", content: SEO.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO.title },
      { name: "twitter:description", content: SEO.description },
    ];

    const created = tags.map(({ name, property, content }) => {
      const el = document.createElement("meta");
      if (name) el.setAttribute("name", name);
      if (property) el.setAttribute("property", property);
      el.setAttribute("content", content);
      el.setAttribute("data-rs-meta", "true");
      document.head.appendChild(el);
      return el;
    });

    return () => {
      document.title = prevTitle;
      created.forEach((el) => el.remove());
    };
  }, []);
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function RsJewellersOpening() {
  const pageRef = useScrollReveal();
  usePageMeta();

  return (
    <div ref={pageRef} className="rs-page min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="rs-hero-bg absolute inset-0" />
        <div className="rs-hero-image absolute inset-0" />
        <div className="rs-particles absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="rs-particle" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="rs-hero-animate rs-hero-animate-delay-1 mb-6 text-[0.65rem] font-medium uppercase tracking-[0.45em] text-[#c9a962]/80">
            Ludhiana&apos;s Finest
          </p>

          <h1 className="rs-serif rs-hero-animate rs-hero-animate-delay-2 text-5xl font-light leading-[1.05] tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
            RS <span className="rs-gold-text">JEWELLERS</span>
          </h1>

          <div className="rs-gold-line rs-hero-animate rs-hero-animate-delay-3 mx-auto my-8 w-24" />

          <p className="rs-serif rs-hero-animate rs-hero-animate-delay-3 text-2xl font-light tracking-[0.15em] text-[#f5f0e8] sm:text-3xl md:text-4xl">
            Grand Opening
          </p>

          <p className="rs-serif rs-hero-animate rs-hero-animate-delay-4 mt-4 text-3xl font-medium tracking-[0.12em] text-[#dfc88a] sm:text-4xl md:text-5xl">
            11 OCTOBER 2026
          </p>

          <p className="rs-hero-animate rs-hero-animate-delay-4 mx-auto mt-8 max-w-md text-sm font-light leading-relaxed tracking-wide text-[#f5f0e8]/60 sm:text-base">
            A New Chapter in Fine Jewellery Begins.
          </p>

          <div className="rs-hero-animate rs-hero-animate-delay-5 mt-10">
            <button type="button" onClick={() => scrollToSection("invitation")} className="rs-btn rs-btn-filled">
              Explore the Store
            </button>
          </div>

          <p className="rs-hero-animate rs-hero-animate-delay-5 mt-8 text-[0.65rem] uppercase tracking-[0.3em] text-[#f5f0e8]/40">
            Hambran Road, Ludhiana
          </p>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("invitation")}
          className="rs-scroll-indicator absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[#c9a962]/50"
          aria-label="Scroll down"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </section>

      {/* Invitation */}
      <section id="invitation" className="rs-section relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rs-reveal rs-date-badge mb-8">Grand Opening — 11 October 2026</div>

          <h2 className="rs-serif rs-reveal rs-reveal-delay-1 mb-6 text-4xl font-light tracking-wide sm:text-5xl md:text-6xl">
            You&apos;re Invited
          </h2>

          <div className="rs-gold-line rs-reveal rs-reveal-delay-1 mx-auto mb-10 w-16" />

          <p className="rs-reveal rs-reveal-delay-2 text-base font-light leading-relaxed text-[#f5f0e8]/70 sm:text-lg">
            RS Jewellers is delighted to welcome you to the grand opening of our new retail store in Ludhiana.
          </p>

          <p className="rs-reveal rs-reveal-delay-3 mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-[#f5f0e8]/50 sm:text-base">
            A trusted wholesaler, manufacturer and supplier of 18K and 22K gold jewellery — now bringing our
            exquisite collection directly to you through our new retail store.
          </p>

          <p className="rs-serif rs-reveal rs-reveal-delay-4 mt-10 text-xl tracking-[0.1em] text-[#dfc88a] sm:text-2xl">
            11 October 2026
          </p>
        </div>
      </section>

      {/* What Awaits */}
      <section className="rs-section bg-[#0d0d0d]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="rs-serif rs-reveal text-3xl font-light tracking-wide sm:text-4xl md:text-5xl">
              What Awaits You
            </h2>
            <div className="rs-gold-line rs-reveal rs-reveal-delay-1 mx-auto mt-6 w-16" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COLLECTIONS.map((item, i) => (
              <article
                key={item.title}
                className={`rs-card rs-reveal rs-reveal-delay-${Math.min(i + 1, 4)} rounded-sm p-8`}
              >
                <div className="rs-card-icon mb-6">{item.icon}</div>
                <h3 className="rs-serif mb-3 text-xl font-medium tracking-wide text-[#f5f0e8]">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-[#f5f0e8]/50">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Highlight */}
      <section className="rs-section">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rs-reveal relative aspect-[4/5] overflow-hidden rounded-sm">
            <div className="rs-editorial-img absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#c9a962]/70">Since Trust Began</p>
            </div>
          </div>

          <div>
            <h2 className="rs-serif rs-reveal mb-6 text-3xl font-light leading-snug tracking-wide sm:text-4xl md:text-5xl">
              Crafted With Trust.
              <br />
              <span className="text-[#dfc88a]">Designed For You.</span>
            </h2>

            <div className="rs-gold-line rs-reveal rs-reveal-delay-1 mb-8 w-16" />

            <p className="rs-reveal rs-reveal-delay-1 mb-8 text-sm font-light leading-relaxed text-[#f5f0e8]/55 sm:text-base">
              From our workshop to your hands — every piece reflects decades of craftsmanship, hallmarked quality
              and a commitment to excellence that Ludhiana has trusted for years.
            </p>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((item, i) => (
                <li
                  key={item}
                  className={`rs-reveal rs-reveal-delay-${Math.min(i + 1, 4)} flex items-center gap-3 text-sm font-light text-[#f5f0e8]/65`}
                >
                  <span className="h-px w-4 shrink-0 bg-[#c9a962]/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="rs-section bg-[#0d0d0d]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="rs-serif rs-reveal mb-6 text-3xl font-light tracking-wide sm:text-4xl md:text-5xl">
            Visit Our New Store
          </h2>
          <div className="rs-gold-line rs-reveal rs-reveal-delay-1 mx-auto mb-10 w-16" />

          <div className="rs-reveal rs-reveal-delay-2 space-y-3">
            <p className="rs-serif text-2xl font-medium tracking-wide text-[#f5f0e8] sm:text-3xl">RS Jewellers</p>
            <p className="text-base font-light text-[#f5f0e8]/65 sm:text-lg">Main Hambran Road, Ludhiana</p>
            <p className="text-sm font-light text-[#c9a962]/70">Opposite Ram Sharnam</p>
          </div>

          <div className="rs-reveal rs-reveal-delay-3 mt-10">
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="rs-btn rs-btn-filled">
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="rs-section">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="rs-serif rs-reveal mb-6 text-3xl font-light tracking-wide sm:text-4xl">
            For Enquiries &amp; Invitations
          </h2>
          <div className="rs-gold-line rs-reveal rs-reveal-delay-1 mx-auto mb-10 w-16" />

          <p className="rs-reveal rs-reveal-delay-2 rs-serif text-xl font-medium tracking-wide text-[#f5f0e8] sm:text-2xl">
            Harsidak Singh
          </p>

          <a
            href={PHONE_LINK}
            className="rs-reveal rs-reveal-delay-3 mt-4 inline-block text-2xl font-light tracking-[0.08em] text-[#dfc88a] transition-colors hover:text-[#c9a962] sm:text-3xl"
          >
            {PHONE}
          </a>

          <div className="rs-reveal rs-reveal-delay-4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={PHONE_LINK} className="rs-btn">
              Call Us
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="rs-btn rs-btn-filled">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="rs-section relative overflow-hidden bg-[#0d0d0d]">
        <div className="rs-particles absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="rs-particle" />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="rs-serif rs-reveal text-2xl font-light tracking-wide text-[#f5f0e8]/80 sm:text-3xl">
            The Wait Is Almost Over.
          </p>

          <p className="rs-serif rs-reveal rs-reveal-delay-1 mt-6 text-4xl font-medium tracking-[0.1em] text-[#dfc88a] sm:text-5xl md:text-6xl">
            11 October 2026
          </p>

          <div className="rs-gold-line rs-reveal rs-reveal-delay-2 mx-auto my-10 w-24" />

          <h2 className="rs-serif rs-reveal rs-reveal-delay-2 text-4xl font-light tracking-wide sm:text-5xl md:text-6xl">
            RS <span className="rs-gold-text">JEWELLERS</span>
          </h2>

          <p className="rs-reveal rs-reveal-delay-3 mx-auto mt-6 max-w-md text-sm font-light italic text-[#f5f0e8]/45 sm:text-base">
            &ldquo;A new destination for fine jewellery in Ludhiana.&rdquo;
          </p>

          <div className="rs-reveal rs-reveal-delay-4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={PHONE_LINK} className="rs-btn rs-btn-filled">
              Call Us
            </a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="rs-btn">
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#c9a962]/10 bg-[#0a0a0a] px-6 py-12 text-center">
        <p className="rs-serif text-lg tracking-[0.2em] text-[#f5f0e8]">RS JEWELLERS</p>
        <p className="mt-3 text-[0.65rem] font-light uppercase tracking-[0.2em] text-[#f5f0e8]/40">
          18K &amp; 22K Gold &bull; Diamond &bull; Silver &bull; Custom Jewellery
        </p>
        <p className="mt-4 text-xs font-light text-[#f5f0e8]/35">
          Hambran Road, Ludhiana | Opp. Ram Sharnam
        </p>
        <p className="mt-6 text-[0.6rem] font-light tracking-wide text-[#f5f0e8]/25">
          &copy; 2026 RS Jewellers. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
