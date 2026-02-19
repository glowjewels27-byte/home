import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    showToast("We received your message. We'll reply soon!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.4em]">Contact</p>
          <h1 className="font-serif text-4xl mt-2">Let’s talk glow</h1>
          <p className="text-charcoal/70 mt-4">Have a question or need styling help? We’re here for you.</p>
          <div className="mt-6 space-y-2 text-sm">
            <p>glowjewels27@gmail.com</p>
            <p>Instagram: @glowjewels.shop</p>
          </div>
        </div>
        <form onSubmit={submit} className="glass rounded-2xl p-6 space-y-4">
          <input
            placeholder="Name"
            className="w-full border border-black/10 rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-black/10 rounded-lg px-3 py-2"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <textarea
            rows="4"
            placeholder="Message"
            className="w-full border border-black/10 rounded-lg px-3 py-2"
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          />
          <button className="w-full px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
