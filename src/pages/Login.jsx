import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      showToast("Welcome back");
      navigate("/account");
    } catch (err) {
      showToast("Login failed", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="glass rounded-2xl p-8">
        <h1 className="font-serif text-3xl">Welcome back</h1>
        <p className="text-charcoal/70 mt-2">Log in to continue your glow journey.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-black/10 rounded-lg px-3 py-2"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-black/10 rounded-lg px-3 py-2"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <button className="w-full px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">Login</button>
        </form>
        <p className="text-sm mt-4">
          New here? <Link to="/register" className="underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}
