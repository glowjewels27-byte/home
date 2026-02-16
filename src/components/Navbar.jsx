import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const navLinkClass = ({ isActive }) =>
  `text-sm uppercase tracking-[0.2em] ${isActive ? "text-charcoal" : "text-charcoal/70"} hover:text-charcoal transition`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          Glow <span className="text-gradient">Jewels</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-sm">
            Cart ({items.length})
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/account" className="text-sm">
                {user.name.split(" ")[0]}
              </Link>
              <button onClick={logout} className="text-xs uppercase tracking-[0.3em]">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
