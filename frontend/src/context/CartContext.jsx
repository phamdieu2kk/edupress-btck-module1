// // src/context/CartContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const [cart, setCart] = useState([]);

//   // Fetch cart từ server
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

//   const updateCartItem = async (courseId, quantity) => {
//     if (!token) return;
//     try {
//       await axios.put(
//         "http://localhost:5000/api/cart",
//         { courseId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCart((prev) =>
//         prev.map((item) =>
//           item.course._id === courseId ? { ...item, quantity } : item
//         )
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const removeFromCart = async (courseId) => {
//     if (!token) return;
//     // Xóa UI trước
//     setCart((prev) => prev.filter((item) => item.course._id !== courseId));
//     try {
//       await axios.delete(`http://localhost:5000/api/cart/${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (err) {
//       console.error(err);
//       fetchCart(); // Đồng bộ lại nếu lỗi
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, setCart, addToCart, updateCartItem, removeFromCart }}
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



// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);

  // Fetch cart từ server
  const fetchCart = async () => {
    if (!token) return setCart([]);
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = async (course, quantity = 1) => {
    if (!token) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { courseId: course._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateCartItem = async (courseId, quantity) => {
    if (!token) return;
    try {
      await axios.put(
        "http://localhost:5000/api/cart",
        { courseId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart((prev) =>
        prev.map((item) =>
          item.course._id === courseId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (courseId) => {
    if (!token) return;
    // Xóa UI trước
    setCart((prev) => prev.filter((item) => item.course._id !== courseId));
    try {
      await axios.delete(`http://localhost:5000/api/cart/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error(err);
      fetchCart(); // Đồng bộ lại nếu lỗi
    }
  };

  // --- Mới: update cart state local ngay lập tức, không gọi API ---
  const updateCartItemLocal = (courseId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.course._id === courseId ? { ...item, quantity } : item
      )
    );
  };

// CartContext.js
const timeoutRefs = {}; // lưu timer cho mỗi item

const updateCartItemLocalDebounced = (courseId, quantity) => {
  setCart((prev) =>
    prev.map((item) =>
      item.course._id === courseId ? { ...item, quantity } : item
    )
  );

  // debounce 1s mới gọi API
  if (timeoutRefs[courseId]) clearTimeout(timeoutRefs[courseId]);
  timeoutRefs[courseId] = setTimeout(() => {
    updateCartItem(courseId, quantity); // gọi API bất đồng bộ
  }, 1000);
};



  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        updateCartItemLocal, // <-- thêm vào value
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

