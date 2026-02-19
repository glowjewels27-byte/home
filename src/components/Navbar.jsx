import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const navLinkClass = ({ isActive }) =>
  `text-sm uppercase tracking-[0.2em] ${isActive ? "text-charcoal" : "text-charcoal/70"} hover:text-charcoal transition`;

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          Glow <span className="text-gradient">Jewels</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link to="/wishlist">Wishlist ({wishlistItems.length})</Link>
          <Link to="/cart">Cart ({items.length})</Link>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/account">{user.name.split(" ")[0]}</Link>
              <button onClick={logout} className="text-xs uppercase tracking-[0.3em]">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden text-sm uppercase tracking-[0.2em]">
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-black/5 px-6 py-4 bg-ivory/95 space-y-3">
          {links.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block text-sm uppercase tracking-[0.2em]">
              {item.label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block text-sm uppercase tracking-[0.2em]">
            Wishlist ({wishlistItems.length})
          </Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="block text-sm uppercase tracking-[0.2em]">
            Cart ({items.length})
          </Link>
          {user ? (
            <>
              <Link to="/account" onClick={() => setMobileOpen(false)} className="block text-sm uppercase tracking-[0.2em]">
                Account
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="block text-sm uppercase tracking-[0.2em]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm uppercase tracking-[0.2em]">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
