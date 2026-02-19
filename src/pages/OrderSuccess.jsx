import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api.js";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch {
        setOrder(null);
      }
    };
    load();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <div className="glass rounded-2xl p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Order Confirmed</p>
        <h1 className="font-serif text-4xl mt-2">Thank you for shopping with Glow Jewels</h1>
        <p className="text-charcoal/70 mt-3">Your order has been placed successfully.</p>

        {order ? (
          <div className="mt-8 grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-xl p-4">
              <p className="text-charcoal/60">Order ID</p>
              <p className="font-medium">#{order._id.slice(-8)}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-charcoal/60">Payment</p>
              <p className="font-medium">{order.paymentMethod} • {order.paymentStatus}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-charcoal/60">Shipping</p>
              <p className="font-medium">₹{order.shippingAmount || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-charcoal/60">Total</p>
              <p className="font-medium">₹{order.totalAmount}</p>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-charcoal/70">Order details are being updated. Check your account history.</p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/account" className="px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">
            View Orders
          </Link>
          <Link to="/shop" className="px-6 py-3 rounded-full border border-charcoal/20 text-sm uppercase tracking-[0.2em]">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
