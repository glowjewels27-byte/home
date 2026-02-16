import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import api from "../utils/api.js";
import { Link } from "react-router-dom";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const { user } = useAuth();
  const { items, totals, clearCart } = useCart();
  const { showToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    phone: ""
  });
  const [placing, setPlacing] = useState(false);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-3xl">Login to continue checkout</h1>
        <Link to="/login" className="mt-6 inline-block px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em]">
          Login
        </Link>
      </div>
    );
  }

  const productsPayload = items.map((item) => ({ product: item._id, qty: item.qty }));

  const placeCodOrder = async () => {
    await api.post("/orders", {
      products: productsPayload,
      paymentMethod: "cod",
      shippingAddress: address
    });
  };

  const placeRazorpayOrder = async () => {
    const { data: paymentInit } = await api.post("/payments/create", {
      products: productsPayload,
      shippingAddress: address
    });

    if (paymentInit.provider === "mock") {
      await api.post("/payments/verify", { localOrderId: paymentInit.localOrderId, provider: "mock" });
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) throw new Error("Razorpay SDK failed to load");

    await new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: paymentInit.keyId,
        amount: paymentInit.amount,
        currency: paymentInit.currency,
        name: "Glow Jewels",
        description: "Jewellery Order Payment",
        order_id: paymentInit.orderId,
        prefill: {
          name: user.name,
          email: user.email,
          contact: address.phone
        },
        theme: { color: "#1E1E1E" },
        modal: {
          ondismiss: () => reject(new Error("Payment popup closed"))
        },
        handler: async (response) => {
          try {
            await api.post("/payments/verify", {
              localOrderId: paymentInit.localOrderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            resolve(true);
          } catch (err) {
            reject(err);
          }
        }
      });

      razorpay.on("payment.failed", () => reject(new Error("Payment failed")));
      razorpay.open();
    });
  };

  const placeOrder = async () => {
    if (!items.length) return;

    setPlacing(true);
    try {
      if (paymentMethod === "cod") await placeCodOrder();
      if (paymentMethod === "razorpay") await placeRazorpayOrder();

      clearCart();
      showToast("Order placed successfully");
    } catch (err) {
      showToast(err?.response?.data?.message || err.message || "Checkout failed", "error");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-[2fr_1fr] gap-10">
      <div className="space-y-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-serif text-2xl">Shipping Address</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {[
              ["fullName", "Full Name"],
              ["phone", "Phone"],
              ["line1", "Address Line 1"],
              ["line2", "Address Line 2"],
              ["city", "City"],
              ["state", "State"],
              ["postalCode", "Postal Code"]
            ].map(([key, label]) => (
              <input
                key={key}
                placeholder={label}
                className="border border-black/10 rounded-lg px-3 py-2 text-sm"
                value={address[key]}
                onChange={(e) => setAddress((prev) => ({ ...prev, [key]: e.target.value }))}
              />
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-serif text-2xl">Payment</h2>
          <div className="mt-4 space-y-3 text-sm">
            <label className="flex items-center gap-3">
              <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")} />
              Razorpay (UPI / Cards)
            </label>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 h-fit">
        <h2 className="font-serif text-2xl">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          {items.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>{item.name}</span>
              <span>₹{Math.round(item.price * (1 - (item.discount || 0) / 100)) * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between font-medium text-lg mt-4">
            <span>Total</span>
            <span>₹{totals.total}</span>
          </div>
        </div>
        <button
          onClick={placeOrder}
          disabled={placing}
          className="mt-6 w-full px-6 py-3 rounded-full bg-charcoal text-ivory text-sm uppercase tracking-[0.2em] disabled:opacity-60"
        >
          {placing ? "Placing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
