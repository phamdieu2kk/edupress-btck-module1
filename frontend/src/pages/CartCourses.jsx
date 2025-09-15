












// // src/components/CartCourses.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
//   Stack,
// } from "@mui/material";
// import { useCart } from "../context/CartContext";
// import CartItems from "../components/CartItem";
// import CartSummary from "../components/CartSummary";
// import Footer from "./Footer";
// import { formatCurrencyDisplay } from "../utils/helpers";

// const CartCourses = () => {
//   const { cart, setCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [selectAll, setSelectAll] = useState(true);

//   const token = localStorage.getItem("token");

//   // Fetch Cart
//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setCart(
//         (res.data.items || []).map((item) => ({
//           ...item,
//           checked: true,
//         }))
//       );
//     } catch (err) {
//       console.error("Fetch cart error:", err);
//       setCart([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Toggle select
//   const toggleSelectAll = (checked) => {
//     setSelectAll(checked);
//     setCart((prev) => prev.map((item) => ({ ...item, checked })));
//   };

//   const toggleChecked = (itemId) => {
//     setCart((prev) =>
//       prev.map((c) =>
//         c._id === itemId ? { ...c, checked: !c.checked } : c
//       )
//     );
//   };

//   useEffect(() => {
//     setSelectAll(cart.length > 0 && cart.every((item) => item.checked));
//   }, [cart]);

//   // Price helpers (an toàn với course null)
//   const totalSelectedItems = cart.filter((i) => i.checked).length;
//   const totalPrice = cart
//     .filter((i) => i.checked)
//     .reduce((sum, i) => sum + ((i.course?.price || 0) * i.quantity), 0);
//   const isAnyItemSelected = cart.some((item) => item.checked);

//   // Loading & Empty state
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (cart.length === 0) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           mt: 8,
//         }}
//       >
//         <img
//           src="https://elearning.iigvietnam.com/images/cart-empty.png"
//           alt="empty"
//           style={{ width: 200, marginBottom: 16 }}
//         />
//         <Typography variant="h5" fontWeight={700} mb={2}>
//           Your cart is empty
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={() => (window.location.href = "/")}
//           sx={{ bgcolor: "#3498db", "&:hover": { bgcolor: "#2980b9" } }}
//         >
//           Go to home page
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, px: 2, minHeight: "60vh" }}>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
//           {/* Left column */}
//           <Box flex={{ xs: "1 1 100%", md: "2 1 0%" }}>
//             <CartItems
//               cart={cart}
//               setCart={setCart}
//               selectAll={selectAll}
//               toggleSelectAll={toggleSelectAll}
//               toggleChecked={toggleChecked}
//               deleteCartItem={async (id) => {
//                 try {
//                   setCart((prev) => prev.filter((i) => i._id !== id));
//                   await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                   });
//                 } catch (err) {
//                   console.error("Delete error:", err);
//                 }
//               }}
//               handleQuantityChange={(id, qty) => {
//                 if (qty < 1) return;
//                 setCart((prev) =>
//                   prev.map((i) => (i._id === id ? { ...i, quantity: qty } : i))
//                 );
//                 // TODO: debounce update API
//               }}
//               totalPrice={totalPrice}
//               formatCurrency={formatCurrencyDisplay}
//             />
//           </Box>

//           {/* Right column */}
//           <Box flex={{ xs: "1 1 100%", md: "1 1 0%" }}>
//             <CartSummary
//               totalSelectedItems={totalSelectedItems}
//               totalPrice={totalPrice}
//               formatCurrency={formatCurrencyDisplay}
//               isAnyItemSelected={isAnyItemSelected}
//             />
//           </Box>
//         </Stack>
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default CartCourses;


// src/components/CartCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import CartItems from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import Footer from "./Footer";
import { formatCurrencyDisplay } from "../utils/helpers";

const CartCourses = () => {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(true);

  // Safe token access
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch cart
  const fetchCart = async () => {
    if (!token) {
      setLoading(false);
      setCart([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = (res.data.items || []).map((item) => ({
        ...item,
        checked: true,
      }));

      setCart(items);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
    else {
      setLoading(false);
      setCart([]);
    }
  }, [token]);

  // Toggle select all
  const toggleSelectAll = (checked) => {
    setSelectAll(checked);
    setCart((prev) => prev.map((item) => ({ ...item, checked })));
  };

  // Toggle individual item
  const toggleChecked = (itemId) => {
    setCart((prev) =>
      prev.map((c) =>
        c._id === itemId ? { ...c, checked: !c.checked } : c
      )
    );
  };

  useEffect(() => {
    setSelectAll(cart.length > 0 && cart.every((item) => item.checked));
  }, [cart]);

  // Price helpers
  const totalSelectedItems = cart.filter((i) => i.checked).length;
  const totalPrice = cart
    .filter((i) => i.checked)
    .reduce((sum, i) => sum + ((i.course?.price || 0) * i.quantity), 0);
  const isAnyItemSelected = cart.some((item) => item.checked);

  // Loading & empty state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (cart.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <img
          src="https://elearning.iigvietnam.com/images/cart-empty.png"
          alt="empty"
          style={{ width: 200, marginBottom: 16 }}
        />
        <Typography variant="h5" fontWeight={700} mb={2}>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/")}
          sx={{ bgcolor: "#3498db", "&:hover": { bgcolor: "#2980b9" } }}
        >
          Go to home page
        </Button>
      </Box>
    );
  }

  // Delete item
  const deleteCartItem = async (id) => {
    try {
      setCart((prev) => prev.filter((i) => i._id !== id));
      if (!token) return;
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Delete error:", err);
      fetchCart(); // fallback
    }
  };

  // Update quantity with debounce
  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: qty } : i))
    );
    // Optionally debounce update API
    if (token) {
      clearTimeout(window[`cartTimeout_${id}`]);
      window[`cartTimeout_${id}`] = setTimeout(async () => {
        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/cart`,
            { itemId: id, quantity: qty },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.error("Update quantity error:", err);
          fetchCart();
        }
      }, 300);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, px: 2, minHeight: "60vh" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* Left column */}
          <Box flex={{ xs: "1 1 100%", md: "2 1 0%" }}>
            <CartItems
              cart={cart}
              setCart={setCart}
              selectAll={selectAll}
              toggleSelectAll={toggleSelectAll}
              toggleChecked={toggleChecked}
              deleteCartItem={deleteCartItem}
              handleQuantityChange={handleQuantityChange}
              totalPrice={totalPrice}
              formatCurrency={formatCurrencyDisplay}
            />
          </Box>

          {/* Right column */}
          <Box flex={{ xs: "1 1 100%", md: "1 1 0%" }}>
            <CartSummary
              totalSelectedItems={totalSelectedItems}
              totalPrice={totalPrice}
              formatCurrency={formatCurrencyDisplay}
              isAnyItemSelected={isAnyItemSelected}
            />
          </Box>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default CartCourses;






