// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
//   Divider,
//   Stack,
//   CardMedia,
//   IconButton,
//   Checkbox,
//   useMediaQuery,
//   useTheme,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Card,
//   CardContent,
// } from "@mui/material";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import { useCart } from "../context/CartContext";
// import Footer from "./Footer";

// const CartCourses = () => {
//   const { cart, setCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [selectAll, setSelectAll] = useState(true);

//   const token = localStorage.getItem("token");
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
//   const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

//   // --- Fetch Cart ---
//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart((res.data.items || []).map((item) => ({ ...item, checked: true })));
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

//   // --- Update Cart Item ---
//   const updateCartItem = async (itemId, quantity) => {
//     if (quantity < 1) return;
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/cart",
//         { itemId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const updatedCart = res.data.items.map((newItem) => {
//         const oldItem = cart.find((c) => c._id === newItem._id);
//         return { ...newItem, checked: oldItem ? oldItem.checked : true };
//       });
//       setCart(updatedCart);
//     } catch (err) {
//       console.error("Update error:", err);
//     }
//   };

//   // --- Delete Cart Item ---
//   const deleteCartItem = async (itemId) => {
//     try {
//       setCart((prev) => prev.filter((i) => i._id !== itemId));
//       await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   // --- Select ---
//   const toggleSelectAll = (checked) => {
//     setSelectAll(checked);
//     setCart((prev) => prev.map((item) => ({ ...item, checked })));
//   };

//   const toggleChecked = (itemId) => {
//     setCart((prev) =>
//       prev.map((c) => (c._id === itemId ? { ...c, checked: !c.checked } : c))
//     );
//   };

//   useEffect(() => {
//     setSelectAll(cart.length > 0 && cart.every((item) => item.checked));
//   }, [cart]);

//   // --- Format Price ---
//   const formatPrice = (price, originalPrice) => {
//     if (!price || price === 0) {
//       return (
//         <Typography color="success.main" align="center">
//           Free
//         </Typography>
//       );
//     }

//     if (originalPrice && originalPrice > price) {
//       return (
//         <Stack
//           direction="row"
//           spacing={1}
//           justifyContent="center"
//           alignItems="center"
//           sx={{ textAlign: "center" }}
//         >
//           <Typography
//             variant="body2"
//             sx={{ textDecoration: "line-through", color: "text.secondary" }}
//           >
//             ${originalPrice.toLocaleString()}
//           </Typography>
//           <Typography fontWeight={700} color="error">
//             ${price.toLocaleString()}
//           </Typography>
//         </Stack>
//       );
//     }

//     return (
//       <Typography fontWeight={700} color="error" align="center">
//         ${price.toLocaleString()}
//       </Typography>
//     );
//   };

//   // --- New functions and variables for summary section ---
//   const totalSelectedItems = cart.filter((i) => i.checked).length;
//   const totalPrice = cart
//     .filter((i) => i.checked)
//     .reduce((sum, i) => sum + i.course.price * i.quantity, 0);

//   const formatCurrency = (price) => {
//     return `$${price.toLocaleString()}`;
//   };

//   const isAnyItemSelected = cart.some((item) => item.checked);

//   return (
//     <>
//       <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, px: 2, minHeight: "60vh" }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={5}>
//             <CircularProgress />
//           </Box>
//         ) : cart.length === 0 ? (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               mt: 8,
//             }}
//           >
//             <img
//               src="https://elearning.iigvietnam.com/images/cart-empty.png"
//               alt="empty"
//               style={{ width: isMobile ? 160 : 220, marginBottom: 16 }}
//             />
//             <Typography variant="h5" fontWeight={700} mb={2}>
//               Your cart is empty
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => (window.location.href = "/")}
//               sx={{ bgcolor: "#3498db", "&:hover": { bgcolor: "#2980b9" } }}
//             >
//               Go to home page
//             </Button>
//           </Box>
//         ) : (
//           <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
//             {/* LEFT: Cart Items */}
//             <Box
//               flex={2}
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 bgcolor: "#fff",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//               }}
//             >
//               <Typography variant="h5" fontWeight={700} mb={2}>
//                 Your cart
//               </Typography>
//               {!isMobile ? (
//                 <>
//                   <TableContainer
//                     component={Paper}
//                     elevation={0}
//                     sx={{
//                       border: "1px solid #e0e0e0",
//                       borderRadius: 2,
//                       overflowX: "auto",
//                     }}
//                   >
//                     <Table
//                       sx={{
//                         minWidth: 600,
//                         "& th": {
//                           fontWeight: 600,
//                           color: "#333",
//                           fontSize: 14,
//                           backgroundColor: "#f9f9f9",
//                         },
//                         "& td": {
//                           fontSize: 13,
//                           color: "#444",
//                           paddingY: 0.5,
//                           paddingX: 1.5,
//                         },
//                       }}
//                       size="small"
//                     >
//                       <TableHead>
//                         <TableRow>
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               checked={selectAll}
//                               onChange={(e) => toggleSelectAll(e.target.checked)}
//                               size="small"
//                             />
//                           </TableCell>
//                           <TableCell>Product</TableCell>
//                           <TableCell align="center">Price</TableCell>
//                           <TableCell align="center">Quantity</TableCell>
//                           <TableCell align="right"></TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {cart.map((item) => (
//                           <TableRow key={item._id} hover>
//                             <TableCell padding="checkbox">
//                               <Checkbox
//                                 checked={item.checked}
//                                 onChange={() => toggleChecked(item._id)}
//                                 size="small"
//                               />
//                             </TableCell>
                            // <TableCell>
                            //   <Stack direction="row" spacing={2} alignItems="center">
                            //     <CardMedia
                            //       component="img"
                            //       image={item.course.image}
                            //       alt={item.course.title}
                            //       sx={{
                            //         width: 60,
                            //         height: 45,
                            //         borderRadius: 1,
                            //         objectFit: "cover",
                            //       }}
                            //     />
                            //     <Typography
                            //       noWrap
                            //       sx={{
                            //         maxWidth: 220,
                            //         cursor: "pointer",
                            //       }}
                            //     >
                            //       {item.course.title}
                            //     </Typography>
                            //   </Stack>
                            // </TableCell>
                            // <TableCell align="center">
                            //   {formatPrice(item.course.price, item.course.originalPrice)}
                            // </TableCell>
//                             <TableCell align="center">
//                               <Stack
//                                 direction="row"
//                                 alignItems="center"
//                                 sx={{
//                                   border: "1px solid #ddd",
//                                   borderRadius: 1,
//                                   display: "inline-flex",
//                                   px: 0.5,
//                                 }}
//                               >
//                                 <IconButton
//                                   size="small"
//                                   onClick={() =>
//                                     updateCartItem(item._id, item.quantity - 1)
//                                   }
//                                 >
//                                   <RemoveIcon fontSize="small" />
//                                 </IconButton>
//                                 <Typography px={1}>{item.quantity}</Typography>
//                                 <IconButton
//                                   size="small"
//                                   onClick={() =>
//                                     updateCartItem(item._id, item.quantity + 1)
//                                   }
//                                 >
//                                   <AddIcon fontSize="small" />
//                                 </IconButton>
//                               </Stack>
//                             </TableCell>
//                             <TableCell align="right" sx={{ width: 50 }}>
//                               <IconButton onClick={() => deleteCartItem(item._id)}>
//                                 <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:opacity-70 mx-2">
//                                   <path d="M13.25 2H10.5V1.5C10.5 0.672906 9.82709 0 9 0H7C6.17291 0 5.5 0.672906 5.5 1.5V2H2.75C2.06075 2 1.5 2.56075 1.5 3.25V5C1.5 5.27612 1.72387 5.5 2 5.5H2.27325L2.70522 14.5713C2.74338 15.3725 3.4015 16 4.2035 16H11.7965C12.5985 16 13.2567 15.3725 13.2948 14.5713L13.7268 5.5H14C14.2761 5.5 14.5 5.27612 14.5 5V3.25C14.5 2.56075 13.9392 2 13.25 2ZM6.5 1.5C6.5 1.22431 6.72431 1 7 1H9C9.27569 1 9.5 1.22431 9.5 1.5V2H6.5V1.5ZM2.5 3.25C2.5 3.11216 2.61216 3 2.75 3H13.25C13.3878 3 13.5 3.11216 13.5 3.25V4.5C13.3459 4.5 3.13853 4.5 2.5 4.5V3.25ZM12.2959 14.5238C12.2832 14.7908 12.0638 15 11.7965 15H4.2035C3.93616 15 3.71678 14.7908 3.70409 14.5238L3.27437 5.5H12.7256L12.2959 14.5238Z" fill="#333333"></path>
//                                   <path d="M8 14C8.27613 14 8.5 13.7761 8.5 13.5V7C8.5 6.72387 8.27613 6.5 8 6.5C7.72387 6.5 7.5 6.72387 7.5 7V13.5C7.5 13.7761 7.72384 14 8 14Z" fill="#333333"></path>
//                                   <path d="M10.5 14C10.7761 14 11 13.7761 11 13.5V7C11 6.72387 10.7761 6.5 10.5 6.5C10.2239 6.5 10 6.72387 10 7V13.5C10 13.7761 10.2238 14 10.5 14Z" fill="#333333"></path>
//                                   <path d="M5.5 14C5.77613 14 6 13.7761 6 13.5V7C6 6.72387 5.77613 6.5 5.5 6.5C5.22387 6.5 5 6.72387 5 7V13.5C5 13.7761 5.22384 14 5.5 14Z" fill="#333333"></path>
//                                 </svg>
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   {/* Summary section outside the table */}
//                  <Stack
//   direction="row"
//   justifyContent="flex-end" // căn sang phải
//   alignItems="center"
//   spacing={1} // khoảng cách giữa 2 Typography
//   mt={3}
// >
//   <Typography variant="h6" fontWeight={700}>
//     Total Price
//   </Typography>
//   <Typography variant="h6" fontWeight={700} color="#e67e22">
//     {formatCurrency(totalPrice)}
//   </Typography>
// </Stack>



//                 </>
//               ) : (
//                 // Mobile View
//                 <Stack spacing={2}>
//                   {cart.map((item) => (
//                     <Card key={item._id}>
//                       <CardContent>
//                         <Stack direction="row" spacing={2} alignItems="center">
//                           <Checkbox
//                             checked={item.checked}
//                             onChange={() => toggleChecked(item._id)}
//                           />
//                           <CardMedia
//                             component="img"
//                             image={item.course.image}
//                             sx={{ width: 80, height: 60, borderRadius: 1 }}
//                           />
//                           <Box flex={1}>
//                             <Typography noWrap fontWeight={600}>
//                               {item.course.title}
//                             </Typography>
//                             {formatPrice(
//                               item.course.price,
//                               item.course.originalPrice
//                             )}
//                           </Box>
//                           <Stack direction="row" alignItems="center">
//                             <IconButton
//                               size="small"
//                               onClick={() =>
//                                 updateCartItem(item._id, item.quantity - 1)
//                               }
//                             >
//                               <RemoveIcon fontSize="small" />
//                             </IconButton>
//                             <Typography px={1}>{item.quantity}</Typography>
//                             <IconButton
//                               size="small"
//                               onClick={() =>
//                                 updateCartItem(item._id, item.quantity + 1)
//                               }
//                             >
//                               <AddIcon fontSize="small" />
//                             </IconButton>
//                           </Stack>
//                         </Stack>
//                       </CardContent>
//                     </Card>
//                   ))}
//                   <Stack 
//                     direction="row" 
//                     justifyContent="space-between" 
//                     alignItems="center"
//                     mt={2}
//                   >
//                     <Typography variant="h6" fontWeight={700}>
//                       Total Price
//                     </Typography>
//                     <Typography variant="h6" fontWeight={700} color="#e67e22">
//                       {formatCurrency(totalPrice)}
//                     </Typography>
//                   </Stack>
//                 </Stack>
//               )}
//             </Box>

//             {/* RIGHT: Summary */}
//             <Box
//               flex={1}
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 bgcolor: "#fff",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                 maxHeight: { md: "70vh" }, // Custom maxHeight for desktop
//                 overflowY: { md: "auto" }, // Custom overflowY for desktop
//                 position: { md: "sticky" }, // Sticky only on desktop
//                 top: { md: 20 }, // Sticky only on desktop
//                 alignSelf: { md: "flex-start" }, // Align self only on desktop
//               }}
//             >
//               <Typography variant="h6" fontWeight={700} mb={2} color="#3470a1">
//                 Summary (Selected {totalSelectedItems} Items)
//               </Typography>

//               <Stack direction="row" justifyContent="space-between" mt={2}>
//                 <Typography variant="body1">Subtotal</Typography>
//                 <Typography variant="body1" fontWeight={500}>
//                   {formatCurrency(totalPrice)}
//                 </Typography>
//               </Stack>
//               <Stack direction="row" justifyContent="space-between">
//   <Typography variant="body1">Shipping Fee</Typography>
//   <Typography variant="body1">{isAnyItemSelected ? "0" : "-"}</Typography>
// </Stack>
// <Stack direction="row" justifyContent="space-between">
//   <Typography variant="body1">Tax</Typography>
//   <Typography variant="body1">{isAnyItemSelected ? "0" : "-"}</Typography>
// </Stack>


//               <Divider sx={{ my: 2 }} />

//               <Stack direction="row" justifyContent="space-between" mb={2}>
//                 <Typography variant="h5" fontWeight={700}>
//                   Total
//                 </Typography>
//                 <Typography variant="h5" fontWeight={700} color="#e67e22">
//                   {formatCurrency(totalPrice)}
//                 </Typography>
//               </Stack>

//               <Button
//                 fullWidth
//                 variant="contained"
//                 disabled={!isAnyItemSelected}
//                 sx={{
//                   bgcolor: isAnyItemSelected ? "#e67e22" : "#e0e0e0",
//                   "&:hover": { bgcolor: isAnyItemSelected ? "#d35400" : "#e0e0e0" },
//                   borderRadius: "5px",
//                   color: isAnyItemSelected ? "#fff" : "#9e9e9e",
//                 }}
//               >
//                 Checkout
//               </Button>
//             </Box>
//           </Stack>
//         )}
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
// import PaymentPage from "./PaymentPage"; // Không cần import ở đây
import { formatCurrencyDisplay } from "../utils/helpers"; // ✅ Nhập hàm định dạng từ tệp tiện ích

const CartCourses = () => {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch Cart
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(
        (res.data.items || []).map((item) => ({ ...item, checked: true }))
      );
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Toggle
  const toggleSelectAll = (checked) => {
    setSelectAll(checked);
    setCart((prev) => prev.map((item) => ({ ...item, checked })));
  };
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
  // ✅ Xóa hàm formatCurrency cục bộ
  const totalSelectedItems = cart.filter((i) => i.checked).length;
  const totalPrice = cart
    .filter((i) => i.checked)
    .reduce((sum, i) => sum + i.course.price * i.quantity, 0);
  const isAnyItemSelected = cart.some((item) => item.checked);

  // Loading & Empty
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

  return (
    <>
      <Box
        sx={{ maxWidth: 1200, mx: "auto", mt: 5, px: 2, minHeight: "60vh" }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* Left column rộng hơn */}
          <Box flex={{ xs: "1 1 100%", md: "2 1 0%" }}>
            <CartItems
              cart={cart}
              setCart={setCart}
              selectAll={selectAll}
              toggleSelectAll={toggleSelectAll}
              toggleChecked={toggleChecked}
              deleteCartItem={async (id) => {
                try {
                  setCart((prev) => prev.filter((i) => i._id !== id));
                  await axios.delete(`http://localhost:5000/api/cart/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                } catch (err) {
                  console.error("Delete error:", err);
                }
              }}
              handleQuantityChange={(id, qty) => {
                if (qty < 1) return;
                setCart((prev) =>
                  prev.map((i) =>
                    i._id === id ? { ...i, quantity: qty } : i
                  )
                );
                // TODO: debounce update API
              }}
              totalPrice={totalPrice}
              formatCurrency={formatCurrencyDisplay} // ✅ Dùng hàm đã import
            />
          </Box>

          {/* Right column nhỏ hơn */}
          <Box flex={{ xs: "1 1 100%", md: "1 1 0%" }}>
            <CartSummary
              totalSelectedItems={totalSelectedItems}
              totalPrice={totalPrice}
              formatCurrency={formatCurrencyDisplay} // ✅ Dùng hàm đã import
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
















// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
//   Divider,
//   Stack,
//   CardMedia,
//   IconButton,
//   Checkbox,
//   useMediaQuery,
//   useTheme,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Card,
//   CardContent,
// } from "@mui/material";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import { motion } from "framer-motion";
// import { useCart } from "../context/CartContext";
// import Footer from "./Footer";

// // --- debounce function ---
// const debounce = (fn, delay) => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn(...args), delay);
//   };
// };

// const CartCourses = () => {
//   const { cart, setCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [selectAll, setSelectAll] = useState(true);

//   const token = localStorage.getItem("token");
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- Fetch Cart ---
//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart((res.data.items || []).map((item) => ({ ...item, checked: true })));
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

//   // --- Debounced Update ---
//   const debouncedUpdate = useRef(
//     debounce(async (itemId, quantity) => {
//       try {
//         await axios.put(
//           "http://localhost:5000/api/cart",
//           { itemId, quantity },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (err) {
//         console.error("Update error:", err);
//       }
//     }, 500)
//   ).current;

//   // --- Handle quantity change (UI + API debounce) ---
//   const handleQuantityChange = (itemId, newQty) => {
//     if (newQty < 1) return;
//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === itemId ? { ...item, quantity: newQty } : item
//       )
//     );
//     debouncedUpdate(itemId, newQty);
//   };

//   // --- Delete Cart Item ---
//   const deleteCartItem = async (itemId) => {
//     try {
//       setCart((prev) => prev.filter((i) => i._id !== itemId));
//       await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   // --- Select ---
//   const toggleSelectAll = (checked) => {
//     setSelectAll(checked);
//     setCart((prev) => prev.map((item) => ({ ...item, checked })));
//   };

//   const toggleChecked = (itemId) => {
//     setCart((prev) =>
//       prev.map((c) => (c._id === itemId ? { ...c, checked: !c.checked } : c))
//     );
//   };

//   useEffect(() => {
//     setSelectAll(cart.length > 0 && cart.every((item) => item.checked));
//   }, [cart]);

//   // --- Format Price ---
//   const formatPrice = (price, originalPrice) => {
//     if (!price || price === 0) {
//       return (
//         <Typography color="success.main" align="center">
//           Free
//         </Typography>
//       );
//     }
//     if (originalPrice && originalPrice > price) {
//       return (
//         <Stack
//           direction="row"
//           spacing={1}
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Typography
//             variant="body2"
//             sx={{ textDecoration: "line-through", color: "text.secondary" }}
//           >
//             ${originalPrice.toLocaleString()}
//           </Typography>
//           <Typography fontWeight={700} color="error">
//             ${price.toLocaleString()}
//           </Typography>
//         </Stack>
//       );
//     }
//     return (
//       <Typography fontWeight={700} color="error" align="center">
//         ${price.toLocaleString()}
//       </Typography>
//     );
//   };

//   // --- Summary ---
//   const totalSelectedItems = cart.filter((i) => i.checked).length;
//   const totalPrice = cart
//     .filter((i) => i.checked)
//     .reduce((sum, i) => sum + i.course.price * i.quantity, 0);

//   const formatCurrency = (price) => `$${price.toLocaleString()}`;
//   const isAnyItemSelected = cart.some((item) => item.checked);

//   // --- Render ---
//   return (
//     <>
//       <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5, px: 2, minHeight: "60vh" }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={5}>
//             <CircularProgress />
//           </Box>
//         ) : cart.length === 0 ? (
//           <Box
//             sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}
//           >
//             <img
//               src="https://elearning.iigvietnam.com/images/cart-empty.png"
//               alt="empty"
//               style={{ width: isMobile ? 160 : 220, marginBottom: 16 }}
//             />
//             <Typography variant="h5" fontWeight={700} mb={2}>
//               Your cart is empty
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => (window.location.href = "/")}
//               sx={{ bgcolor: "#3498db", "&:hover": { bgcolor: "#2980b9" } }}
//             >
//               Go to home page
//             </Button>
//           </Box>
//         ) : (
//           <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
//             {/* LEFT: Items */}
//             <Box
//               flex={2}
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 bgcolor: "#fff",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//               }}
//             >
//               <Typography variant="h5" fontWeight={700} mb={2}>
//                 Your cart
//               </Typography>

//               {!isMobile ? (
//                 // --- Desktop ---
//                 <>
//                   <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
//                     <Table size="small" sx={{ minWidth: 600 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               checked={selectAll}
//                               onChange={(e) => toggleSelectAll(e.target.checked)}
//                               size="small"
//                             />
//                           </TableCell>
//                           <TableCell>Product</TableCell>
//                           <TableCell align="center">Price</TableCell>
//                           <TableCell align="center">Quantity</TableCell>
//                           <TableCell align="right"></TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {cart.map((item) => (
//                           <TableRow key={item._id} hover component={motion.tr} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//                             <TableCell padding="checkbox">
//                               <Checkbox
//                                 checked={item.checked}
//                                 onChange={() => toggleChecked(item._id)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Stack direction="row" spacing={2} alignItems="center">
//                                 <CardMedia
//                                   component="img"
//                                   image={item.course.image}
//                                   alt={item.course.title}
//                                   sx={{ width: 60, height: 45, borderRadius: 1, objectFit: "cover" }}
//                                 />
//                                 <Typography noWrap sx={{ maxWidth: 220 }}>
//                                   {item.course.title}
//                                 </Typography>
//                               </Stack>
//                             </TableCell>
//                             <TableCell align="center">
//                               {formatPrice(item.course.price, item.course.originalPrice)}
//                             </TableCell>
//                             <TableCell align="center">
//                               <Stack direction="row" alignItems="center" sx={{ border: "1px solid #ddd", borderRadius: 1, px: 0.5 }}>
//                                 <IconButton size="small" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
//                                   <RemoveIcon fontSize="small" />
//                                 </IconButton>
//                                 <motion.span
//                                   key={item.quantity}
//                                   initial={{ scale: 0.8, opacity: 0 }}
//                                   animate={{ scale: 1, opacity: 1 }}
//                                   transition={{ duration: 0.2 }}
//                                 >
//                                   {item.quantity}
//                                 </motion.span>
//                                 <IconButton size="small" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
//                                   <AddIcon fontSize="small" />
//                                 </IconButton>
//                               </Stack>
//                             </TableCell>
//                             <TableCell align="right">
//                               <IconButton onClick={() => deleteCartItem(item._id)}>
//                                <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:opacity-70 mx-2">
//                                   <path d="M13.25 2H10.5V1.5C10.5 0.672906 9.82709 0 9 0H7C6.17291 0 5.5 0.672906 5.5 1.5V2H2.75C2.06075 2 1.5 2.56075 1.5 3.25V5C1.5 5.27612 1.72387 5.5 2 5.5H2.27325L2.70522 14.5713C2.74338 15.3725 3.4015 16 4.2035 16H11.7965C12.5985 16 13.2567 15.3725 13.2948 14.5713L13.7268 5.5H14C14.2761 5.5 14.5 5.27612 14.5 5V3.25C14.5 2.56075 13.9392 2 13.25 2ZM6.5 1.5C6.5 1.22431 6.72431 1 7 1H9C9.27569 1 9.5 1.22431 9.5 1.5V2H6.5V1.5ZM2.5 3.25C2.5 3.11216 2.61216 3 2.75 3H13.25C13.3878 3 13.5 3.11216 13.5 3.25V4.5C13.3459 4.5 3.13853 4.5 2.5 4.5V3.25ZM12.2959 14.5238C12.2832 14.7908 12.0638 15 11.7965 15H4.2035C3.93616 15 3.71678 14.7908 3.70409 14.5238L3.27437 5.5H12.7256L12.2959 14.5238Z" fill="#333333"></path>
//                                   <path d="M8 14C8.27613 14 8.5 13.7761 8.5 13.5V7C8.5 6.72387 8.27613 6.5 8 6.5C7.72387 6.5 7.5 6.72387 7.5 7V13.5C7.5 13.7761 7.72384 14 8 14Z" fill="#333333"></path>
//                                   <path d="M10.5 14C10.7761 14 11 13.7761 11 13.5V7C11 6.72387 10.7761 6.5 10.5 6.5C10.2239 6.5 10 6.72387 10 7V13.5C10 13.7761 10.2238 14 10.5 14Z" fill="#333333"></path>
//                                   <path d="M5.5 14C5.77613 14 6 13.7761 6 13.5V7C6 6.72387 5.77613 6.5 5.5 6.5C5.22387 6.5 5 6.72387 5 7V13.5C5 13.7761 5.22384 14 5.5 14Z" fill="#333333"></path>
//                                 </svg>
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>

//                   {/* Total (desktop bottom) */}
//                   <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
//                     <Typography variant="h6" fontWeight={700}>Total Price</Typography>
//                     <Typography variant="h6" fontWeight={700} color="#e67e22">
//                       {formatCurrency(totalPrice)}
//                     </Typography>
//                   </Stack>
//                 </>
//               ) : (
//                 // --- Mobile ---
//                 <Stack spacing={2}>
//                   {cart.map((item) => (
//                     <Card key={item._id} component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//                       <CardContent>
//                         <Stack direction="row" spacing={2} alignItems="center">
//                           <Checkbox checked={item.checked} onChange={() => toggleChecked(item._id)} />
//                           <CardMedia component="img" image={item.course.image} sx={{ width: 80, height: 60, borderRadius: 1 }} />
//                           <Box flex={1}>
//                             <Typography noWrap fontWeight={600}>{item.course.title}</Typography>
//                             {formatPrice(item.course.price, item.course.originalPrice)}
//                           </Box>
//                           <Stack direction="row" alignItems="center">
//                             <IconButton size="small" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
//                               <RemoveIcon fontSize="small" />
//                             </IconButton>
//                             <motion.span
//                               key={item.quantity}
//                               initial={{ scale: 0.8, opacity: 0 }}
//                               animate={{ scale: 1, opacity: 1 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               {item.quantity}
//                             </motion.span>
//                             <IconButton size="small" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
//                               <AddIcon fontSize="small" />
//                             </IconButton>
//                           </Stack>
//                           <IconButton onClick={() => deleteCartItem(item._id)}>🗑️</IconButton>
//                         </Stack>
//                       </CardContent>
//                     </Card>
//                   ))}
//                   <Stack direction="row" justifyContent="space-between" mt={2}>
//                     <Typography variant="h6" fontWeight={700}>Total Price</Typography>
//                     <Typography variant="h6" fontWeight={700} color="#e67e22">
//                       {formatCurrency(totalPrice)}
//                     </Typography>
//                   </Stack>
//                 </Stack>
//               )}
//             </Box>

//             {/* RIGHT: Summary */}
//             <Box
//               flex={1}
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 bgcolor: "#fff",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                 position: { md: "sticky" },
//                 top: { md: 20 },
//                 alignSelf: { md: "flex-start" },
//               }}
//             >
//               <Typography variant="h6" fontWeight={700} mb={2} color="#3470a1">
//                 Summary (Selected {totalSelectedItems} Items)
//               </Typography>
//               <Stack direction="row" justifyContent="space-between" mt={2}>
//                 <Typography>Subtotal</Typography>
//                 <Typography fontWeight={500}>{formatCurrency(totalPrice)}</Typography>
//               </Stack>
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography>Shipping Fee</Typography>
//                 <Typography>{isAnyItemSelected ? "0" : "-"}</Typography>
//               </Stack>
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography>Tax</Typography>
//                 <Typography>{isAnyItemSelected ? "0" : "-"}</Typography>
//               </Stack>

//               <Divider sx={{ my: 2 }} />

//               <Stack direction="row" justifyContent="space-between" mb={2}>
//                 <Typography variant="h5" fontWeight={700}>Total</Typography>
//                 <Typography variant="h5" fontWeight={700} color="#e67e22">
//                   {formatCurrency(totalPrice)}
//                 </Typography>
//               </Stack>

//               <Button
//                 fullWidth
//                 variant="contained"
//                 disabled={!isAnyItemSelected}
//                 sx={{
//                   bgcolor: isAnyItemSelected ? "#e67e22" : "#e0e0e0",
//                   "&:hover": { bgcolor: isAnyItemSelected ? "#d35400" : "#e0e0e0" },
//                 }}
//               >
//                 Checkout
//               </Button>
//             </Box>
//           </Stack>
//         )}
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default CartCourses;
