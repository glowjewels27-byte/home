import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../utils/api.js";
import { useAuth } from "./AuthContext.jsx";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadLocal = () => {
      const raw = localStorage.getItem("gj_wishlist");
      if (!raw) return setItems([]);
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    };

    const loadRemote = async () => {
      try {
        const { data } = await api.get("/wishlist");
        setItems(data || []);
      } catch {
        setItems([]);
      }
    };

    if (user) loadRemote();
    else loadLocal();
  }, [user]);

  useEffect(() => {
    if (!user) localStorage.setItem("gj_wishlist", JSON.stringify(items));
  }, [items, user]);

  const isWishlisted = (productId) => items.some((item) => item._id === productId);

  const toggleWishlist = async (product) => {
    if (!product?._id) return;

    if (user) {
      if (isWishlisted(product._id)) {
        const { data } = await api.delete(`/wishlist/${product._id}`);
        setItems(data || []);
      } else {
        const { data } = await api.post(`/wishlist/${product._id}`);
        setItems(data || []);
      }
      return;
    }

    setItems((prev) => {
      if (prev.some((item) => item._id === product._id)) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const clearWishlist = async () => {
    if (user) {
      const removals = items.map((item) => api.delete(`/wishlist/${item._id}`));
      await Promise.all(removals);
    }
    setItems([]);
  };

  const value = useMemo(
    () => ({ items, isWishlisted, toggleWishlist, clearWishlist }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
