export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-serif text-lg mb-2">Glow Jewels</h3>
          <p className="text-charcoal/70">
            Premium, playful, and ready for every moment. Designed in India for the glow you bring.
          </p>
        </div>
        <div>
          <h4 className="uppercase tracking-[0.2em] text-xs mb-3">Explore</h4>
          <ul className="space-y-2">
            <li>Necklaces</li>
            <li>Earrings</li>
            <li>Rings</li>
            <li>Bracelets</li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase tracking-[0.2em] text-xs mb-3">Get in touch</h4>
          <p className="text-charcoal/70">glowjewels27@gmail.com</p>
          <p className="text-charcoal/70">Instagram: @glowjewels.shop</p>
        </div>
      </div>
    </footer>
  );
}
