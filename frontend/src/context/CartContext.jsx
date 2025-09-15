// // src/context/CartContext.jsx
// import React, { createContext, useContext, useState, useEffect, useRef } from "react";
// import axios from "axios";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const [cart, setCart] = useState([]);
//   const [orderId, setOrderId] = useState(null);
//   const timeoutRefs = useRef({});

//   // --- Fetch cart ---
//   const fetchCart = async () => {
//     if (!token) return setCart([]);
//     try {
//       const res = await axios.get("http://localhost:5000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data.items || []);
//     } catch (err) {
//       console.error(err);
//       setCart([]);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [token]);

//   // --- Add to cart ---
//   const addToCart = async (course, quantity = 1) => {
//     if (!token) return;
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/cart",
//         { courseId: course._id, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCart(res.data.items || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // --- Update quantity (API ngay) ---
//   const updateCartItem = async (itemId, quantity) => {
//     if (!token) return;
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/cart",
//         { itemId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCart(res.data.items || []);
//     } catch (err) {
//       console.error(err);
//       fetchCart();
//     }
//   };

//   // --- Update local + debounce API ---
//   const updateCartItemLocalDebounced = (itemId, quantity) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === itemId ? { ...item, quantity } : item
//       )
//     );

//     if (timeoutRefs.current[itemId]) clearTimeout(timeoutRefs.current[itemId]);
//     timeoutRefs.current[itemId] = setTimeout(() => {
//       updateCartItem(itemId, quantity);
//     }, 800);
//   };

//   // --- Remove item ---
//   const removeFromCart = async (itemId) => {
//     if (!token) return;
//     setCart((prev) => prev.filter((item) => item._id !== itemId));
//     try {
//       const res = await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data.items || []);
//     } catch (err) {
//       console.error(err);
//       fetchCart();
//     }
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         setCart,
//         orderId,
//         setOrderId,
//         addToCart,
//         updateCartItem,
//         updateCartItemLocalDebounced,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };



import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [cart, setCart] = useState(() => {
    // Lấy cart từ localStorage lần đầu render
    const saved = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    return saved ? JSON.parse(saved) : [];
  });
  const timeoutRefs = useRef({});

  // --- Đồng bộ localStorage ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // --- Fetch cart từ backend 1 lần ---
  const fetchCart = async () => {
    if (!token) return;
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

  useEffect(() => {
    if (!cart.length) fetchCart();
  }, [token]);

  // --- Add item ---
  const addToCart = async (course, quantity = 1) => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { courseId: course._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
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
      console.error(err);
      fetchCart();
    }
  };

  // --- Debounce update quantity local + backend ---
  const updateCartItemLocalDebounced = (itemId, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item._id === itemId ? { ...item, quantity } : item))
    );

    if (timeoutRefs.current[itemId]) clearTimeout(timeoutRefs.current[itemId]);
    timeoutRefs.current[itemId] = setTimeout(() => {
      updateCartItem(itemId, quantity);
    }, 800);
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
      console.error(err);
      fetchCart();
    }
  };

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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
