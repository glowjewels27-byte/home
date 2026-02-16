import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../utils/api.js";
import { Link } from "react-router-dom";

export default function Account() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data } = await api.get("/orders/mine");
      setOrders(data);
    };
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-3xl">Login to view your account</h1>
        <Link to="/login" className="mt-6 inline-block px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="glass rounded-2xl p-6">
        <h1 className="font-serif text-3xl">Hi, {user.name}</h1>
        <p className="text-charcoal/70">{user.email}</p>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-2xl">Order History</h2>
        <div className="mt-4 space-y-4">
          {orders.length === 0 && <p className="text-charcoal/70">No orders yet.</p>}
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl p-4 shadow-glass">
              <div className="flex justify-between text-sm">
                <span>Order #{order._id.slice(-6)}</span>
                <span>{order.status}</span>
              </div>
              <p className="text-charcoal/70 mt-2">Total: ₹{order.totalAmount}</p>
              <p className="text-charcoal/60 text-sm">Payment: {order.paymentMethod}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
