export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">{label}</p>
      <h2 className="font-serif text-3xl md:text-4xl mt-2">{title}</h2>
      {subtitle && <p className="text-charcoal/70 mt-3 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
