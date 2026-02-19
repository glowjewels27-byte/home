import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, updateQty, removeItem, totals } = useCart();

  if (!items.length) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-block px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-[2fr_1fr] gap-8">
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item._id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-glass">
            <img src={item.images?.[0]} alt={item.name} className="h-24 w-24 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="font-serif text-xl">{item.name}</h3>
              <p className="text-charcoal/60 text-sm">
                ₹{Math.round(item.price * (1 - (item.discount || 0) / 100))}
                {item.discount > 0 && <span className="ml-2 line-through text-xs">₹{item.price}</span>}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item._id, Number(e.target.value))}
                  className="w-20 border border-black/10 rounded-lg px-2 py-1"
                />
                <button onClick={() => removeItem(item._id)} className="text-xs uppercase tracking-[0.2em]">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-6 h-fit">
        <h2 className="font-serif text-2xl">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totals.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-₹{totals.discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span>
          </div>
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>₹{totals.grandTotal}</span>
          </div>
        </div>

        {totals.total < 500 && <p className="mt-4 text-xs text-red-500">Minimum order amount is ₹500 (before shipping).</p>}
        {totals.total < 1500 && <p className="mt-2 text-xs text-charcoal/70">Add ₹{1500 - totals.total} more for free delivery.</p>}

        <Link
          to={totals.isMinOrderMet ? "/checkout" : "#"}
          onClick={(e) => {
            if (!totals.isMinOrderMet) e.preventDefault();
          }}
          className={`mt-6 block text-center px-6 py-3 rounded-full text-sm uppercase tracking-[0.2em] ${
            totals.isMinOrderMet ? "bg-charcoal text-ivory" : "bg-charcoal/40 text-ivory/70 pointer-events-none"
          }`}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
