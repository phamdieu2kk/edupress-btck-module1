
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // --- State cart ---
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const timeoutRefs = useRef({});

  // --- Đồng bộ localStorage ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // --- Fetch cart từ backend ---
  const fetchCart = async () => {
    if (!token) {
      setCart([]);
      return;
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = (res.data.items || []).map((i) => ({ ...i, checked: true }));
      setCart(items);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCart([]);
    }
  };

  // --- Fetch cart khi mount ---
  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  // --- Add item ---
  const addToCart = async (course, quantity = 1) => {
    if (!token) return;
    const tempId = Date.now().toString(); // _id tạm thời cho frontend
    setCart((prev) => [...prev, { _id: tempId, course, quantity, checked: true }]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { courseId: course._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // --- Update quantity ngay backend ---
  const updateCartItem = async (itemId, quantity) => {
    if (!token) return;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart`,
        { itemId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Update cart error:", err);
      fetchCart();
    }
  };

  // --- Update local + debounce backend ---
  const updateCartItemLocalDebounced = (itemId, quantity) => {
    // update local ngay
    setCart((prev) =>
      prev.map((item) => (item._id === itemId ? { ...item, quantity } : item))
    );

    // debounce backend
    if (timeoutRefs.current[itemId]) clearTimeout(timeoutRefs.current[itemId]);
    timeoutRefs.current[itemId] = setTimeout(() => {
      updateCartItem(itemId, quantity);
    }, 300); // giảm debounce để nhanh
  };

  // --- Remove item ---
  const removeFromCart = async (itemId) => {
    setCart((prev) => prev.filter((item) => item._id !== itemId));
    if (!token) return;
    if (timeoutRefs.current[itemId]) clearTimeout(timeoutRefs.current[itemId]);

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Remove cart item error:", err);
      fetchCart();
    }
  };

  // --- Clear cart local ---
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        updateCartItem,
        updateCartItemLocalDebounced,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// --- Hook tiện dụng ---
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
