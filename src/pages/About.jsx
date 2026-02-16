export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.4em]">About</p>
        <h1 className="font-serif text-4xl mt-2">The Glow Jewels Story</h1>
        <p className="text-charcoal/70 mt-4">
          Glow Jewels was born in India with one goal: to make premium-looking jewellery accessible, playful, and
          Instagram-ready for every young woman who loves to shine.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-serif text-2xl">Our Mission</h3>
          <p className="text-charcoal/70 mt-3">
            Deliver fashion jewellery that feels luxurious, fits effortlessly into daily looks, and celebrates
            modern Indian femininity.
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-serif text-2xl">Quality Promise</h3>
          <p className="text-charcoal/70 mt-3">
            Every piece is inspected for shine, comfort, and durability. We use premium finishes and skin-friendly
            materials so you can glow with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
