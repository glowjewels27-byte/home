import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
const SHIPPING_CHARGE = 50;
const FREE_SHIPPING_THRESHOLD = 1500;
const MIN_ORDER_AMOUNT = 500;

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("gj_cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("gj_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) => (p._id === product._id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) => prev.map((p) => (p._id === id ? { ...p, qty: Math.max(1, Number(qty) || 1) } : p)));
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p._id !== id));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discount = items.reduce((acc, item) => {
      const pct = item.discount || 0;
      return acc + Math.round(item.price * (pct / 100)) * item.qty;
    }, 0);
    const total = subtotal - discount;
    const shipping = total >= FREE_SHIPPING_THRESHOLD || total === 0 ? 0 : SHIPPING_CHARGE;
    const grandTotal = total + shipping;
    const isMinOrderMet = grandTotal >= MIN_ORDER_AMOUNT;
    return { subtotal, discount, total, shipping, grandTotal, isMinOrderMet };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, totals }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
