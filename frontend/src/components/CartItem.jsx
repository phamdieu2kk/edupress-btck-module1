// // src/components/CartItem.jsx
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Stack,
//   CardMedia,
//   IconButton,
//   Checkbox,
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
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../context/CartContext";

// const CartItem = ({
//   cart,
//   isMobile,
//   formatPrice,
//   deleteCartItem,
//   toggleChecked,
//   selectAll,
//   toggleSelectAll,
// }) => {
//   const { updateCartItemLocalDebounced } = useCart(); // <-- debounce update
//   const [localQuantities, setLocalQuantities] = useState({});
//   const intervalRefs = useRef({});

//   // Sync local quantities với cart
//   useEffect(() => {
//     const quantities = {};
//     cart.forEach((item) => {
//       quantities[item._id] = item.quantity;
//     });
//     setLocalQuantities(quantities);
//   }, [cart]);

//   const quantityAnimation = {
//     initial: { scale: 0.8, opacity: 0 },
//     animate: { scale: 1, opacity: 1 },
//     exit: { scale: 0.8, opacity: 0 },
//     transition: { type: "spring", stiffness: 300, damping: 20 },
//   };

//   // --- Handlers ---
//   const handleQuantityChange = (id, delta) => {
//     const newQty = Math.max(1, (localQuantities[id] || 1) + delta);
//     setLocalQuantities((prev) => ({ ...prev, [id]: newQty }));
//     updateCartItemLocalDebounced(id, newQty); // gọi API debounce 1s
//   };

//   const startContinuousChange = (id, delta) => {
//     handleQuantityChange(id, delta); // update lần đầu
//     intervalRefs.current[id] = setInterval(() => handleQuantityChange(id, delta), 200);
//   };

//   const stopContinuousChange = (id) => {
//     if (intervalRefs.current[id]) {
//       clearInterval(intervalRefs.current[id]);
//       intervalRefs.current[id] = null;
//     }
//   };

//   // --- Render ---
//   if (!cart || cart.length === 0) return null;

//   return (
//     <>
//       {!isMobile ? (
//         <TableContainer
//           component={Paper}
//           elevation={0}
//           sx={{
//             border: "1px solid #e0e0e0",
//             borderRadius: 2,
//             overflowX: "auto",
//           }}
//         >
//           <Table
//             sx={{
//               minWidth: 600,
//               "& th": { fontWeight: 600, color: "#333", fontSize: 14, backgroundColor: "#f9f9f9" },
//               "& td": { fontSize: 13, color: "#444", paddingY: 0.5, paddingX: 1.5 },
//             }}
//             size="small"
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell padding="checkbox">
//                   <Checkbox checked={selectAll} onChange={(e) => toggleSelectAll(e.target.checked)} size="small" />
//                 </TableCell>
//                 <TableCell>Product</TableCell>
//                 <TableCell align="center">Price</TableCell>
//                 <TableCell align="center">Quantity</TableCell>
//                 <TableCell align="right"></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cart.map((item) => (
//                 <TableRow key={item._id} hover>
//                   <TableCell padding="checkbox">
//                     <Checkbox checked={item.checked} onChange={() => toggleChecked(item._id)} size="small" />
//                   </TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <CardMedia
//                         component="img"
//                         image={item.course.image}
//                         alt={item.course.title}
//                         sx={{ width: 60, height: 45, borderRadius: 1, objectFit: "cover" }}
//                       />
//                       <Typography noWrap sx={{ maxWidth: 220, cursor: "pointer" }}>
//                         {item.course.title}
//                       </Typography>
//                     </Stack>
//                   </TableCell>
//                   <TableCell align="center">{formatPrice(item.course.price, item.course.originalPrice)}</TableCell>
//                   <TableCell align="center">
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       sx={{ border: "1px solid #ddd", borderRadius: 1, display: "inline-flex", px: 0.5 }}
//                     >
//                       <IconButton
//                         size="small"
//                         onMouseDown={() => startContinuousChange(item._id, -1)}
//                         onMouseUp={() => stopContinuousChange(item._id)}
//                         onMouseLeave={() => stopContinuousChange(item._id)}
//                       >
//                         <RemoveIcon fontSize="small" />
//                       </IconButton>

//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={localQuantities[item._id]}
//                           initial="initial"
//                           animate="animate"
//                           exit="exit"
//                           variants={quantityAnimation}
//                         >
//                           <Typography px={1}>{localQuantities[item._id]}</Typography>
//                         </motion.div>
//                       </AnimatePresence>

//                       <IconButton
//                         size="small"
//                         onMouseDown={() => startContinuousChange(item._id, 1)}
//                         onMouseUp={() => stopContinuousChange(item._id)}
//                         onMouseLeave={() => stopContinuousChange(item._id)}
//                       >
//                         <AddIcon fontSize="small" />
//                       </IconButton>
//                     </Stack>
//                   </TableCell>
//                   <TableCell align="right" sx={{ width: 50 }}>
//                     <IconButton onClick={() => deleteCartItem(item._id)}>
//                       <svg
//                         width="22"
//                         height="22"
//                         viewBox="0 0 16 16"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="hover:opacity-70 mx-2"
//                       >
//                         <path
//                           d="M13.25 2H10.5V1.5C10.5 0.672906 9.82709 0 9 0H7C6.17291 0 5.5 0.672906 5.5 1.5V2H2.75C2.06075 2 1.5 2.56075 1.5 3.25V5C1.5 5.27612 1.72387 5.5 2 5.5H2.27325L2.70522 14.5713C2.74338 15.3725 3.4015 16 4.2035 16H11.7965C12.5985 16 13.2567 15.3725 13.2948 14.5713L13.7268 5.5H14C14.2761 5.5 14.5 5.27612 14.5 5V3.25C14.5 2.56075 13.9392 2 13.25 2ZM6.5 1.5C6.5 1.22431 6.72431 1 7 1H9C9.27569 1 9.5 1.22431 9.5 1.5V2H6.5V1.5ZM2.5 3.25C2.5 3.11216 2.61216 3 2.75 3H13.25C13.3878 3 13.5 3.11216 13.5 3.25V4.5C13.3459 4.5 3.13853 4.5 2.5 4.5V3.25ZM12.2959 14.5238C12.2832 14.7908 12.0638 15 11.7965 15H4.2035C3.93616 15 3.71678 14.7908 3.70409 14.5238L3.27437 5.5H12.7256L12.2959 14.5238Z"
//                           fill="#333333"
//                         />
//                         <path d="M8 14C8.27613 14 8.5 13.7761 8.5 13.5V7C8.5 6.72387 8.27613 6.5 8 6.5C7.72387 6.5 7.5 6.72387 7.5 7V13.5C7.5 13.7761 7.72384 14 8 14Z" fill="#333333" />
//                         <path d="M10.5 14C10.7761 14 11 13.7761 11 13.5V7C11 6.72387 10.7761 6.5 10.5 6.5C10.2239 6.5 10 6.72387 10 7V13.5C10 13.7761 10.2238 14 10.5 14Z" fill="#333333" />
//                         <path d="M5.5 14C5.77613 14 6 13.7761 6 13.5V7C6 6.72387 5.77613 6.5 5.5 6.5C5.22387 6.5 5 6.72387 5 7V13.5C5 13.7761 5.22384 14 5.5 14Z" fill="#333333" />
//                       </svg>
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Stack spacing={2}>
//           {cart.map((item) => (
//             <Card key={item._id} sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: 2 }}>
//               <CardContent>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Checkbox checked={item.checked} onChange={() => toggleChecked(item._id)} />
//                   <CardMedia component="img" image={item.course.image} sx={{ width: 80, height: 60, borderRadius: 1 }} />
//                   <Box flex={1}>
//                     <Typography noWrap fontWeight={600}>{item.course.title}</Typography>
//                     {formatPrice(item.course.price, item.course.originalPrice)}
//                   </Box>
//                   <Stack direction="row" alignItems="center">
//                     <IconButton
//                       size="small"
//                       onMouseDown={() => startContinuousChange(item._id, -1)}
//                       onMouseUp={() => stopContinuousChange(item._id)}
//                       onMouseLeave={() => stopContinuousChange(item._id)}
//                     >
//                       <RemoveIcon fontSize="small" />
//                     </IconButton>
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={localQuantities[item._id]}
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={quantityAnimation}
//                       >
//                         <Typography px={1}>{localQuantities[item._id]}</Typography>
//                       </motion.div>
//                     </AnimatePresence>
//                     <IconButton
//                       size="small"
//                       onMouseDown={() => startContinuousChange(item._id, 1)}
//                       onMouseUp={() => stopContinuousChange(item._id)}
//                       onMouseLeave={() => stopContinuousChange(item._id)}
//                     >
//                       <AddIcon fontSize="small" />
//                     </IconButton>
//                   </Stack>
//                 </Stack>
//               </CardContent>
//             </Card>
//           ))}
//         </Stack>
//       )}
//     </>
//   );
// };

// export default CartItem;


import React from "react";
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
  IconButton,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

const CartItems = ({
  cart,
  selectAll,
  toggleSelectAll,
  toggleChecked,
  handleQuantityChange,
  deleteCartItem,
  formatCurrency,
  totalPrice,
  isMobile,
}) => {
  // ✅ Hàm hiển thị giá ngay trong file
  const formatPrice = (price, originalPrice) => {
    if (price === 0) {
      return (
        <Typography color="success.main" fontWeight={600}>
          Free
        </Typography>
      );
    }
    if (originalPrice && originalPrice > price) {
      return (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            ${originalPrice.toLocaleString()}
          </Typography>
          <Typography fontWeight={700} color="error">
            ${price.toLocaleString()}
          </Typography>
        </Stack>
      );
    }
    return (
      <Typography fontWeight={700} color="error">
        ${price.toLocaleString()}
      </Typography>
    );
  };

  return (
    <Box
      flex={2}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={2}>
        Your cart
      </Typography>

      {!isMobile ? (
        // --- Desktop ---
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectAll}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow
                    key={item._id}
                    hover
                    component={motion.tr}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={item.checked}
                        onChange={() => toggleChecked(item._id)}
                        size="small"
                      />
                    </TableCell>
                   <TableCell
  sx={{
    minWidth: 300, // 👈 giữ khung cố định, tránh đẩy cột Quantity khi title ngắn
    maxWidth: 400,
  }}
>
  <Stack direction="row" spacing={2} alignItems="center">
    <CardMedia
      component="img"
      image={item.course.image}
      alt={item.course.title}
      sx={{
        width: 60,
        height: 45,
        borderRadius: 1,
        objectFit: "cover",
      }}
    />
    <Typography
      sx={{
        maxWidth: 250,
        whiteSpace: "normal",
        wordBreak: "break-word",
        fontWeight: 500,
      }}
    >
      {item.course.title}
    </Typography>
  </Stack>
</TableCell>
                    <TableCell align="center">
                      {formatPrice(item.course.price, item.course.originalPrice)}
                    </TableCell>
                   <TableCell
  // Căn chỉnh nội dung sang phải
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }}
>
  <Stack
    direction="row"
    alignItems="center"
    sx={{
      border: "1px solid #ddd",
      borderRadius: 1,
      px: 0.5,
    }}
  >
    <IconButton
      size="small"
      onClick={() =>
        handleQuantityChange(item._id, item.quantity - 1)
      }
    >
      <RemoveIcon fontSize="small" />
    </IconButton>
    <motion.span
      key={item.quantity}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {item.quantity}
    </motion.span>
    <IconButton
      size="small"
      onClick={() =>
        handleQuantityChange(item._id, item.quantity + 1)
      }
    >
      <AddIcon fontSize="small" />
    </IconButton>
  </Stack>
</TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => deleteCartItem(item._id)}>
                        <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:opacity-70 mx-2">
                        <path d="M13.25 2H10.5V1.5C10.5 0.672906 9.82709 0 9 0H7C6.17291 0 5.5 0.672906 5.5 1.5V2H2.75C2.06075 2 1.5 2.56075 1.5 3.25V5C1.5 5.27612 1.72387 5.5 2 5.5H2.27325L2.70522 14.5713C2.74338 15.3725 3.4015 16 4.2035 16H11.7965C12.5985 16 13.2567 15.3725 13.2948 14.5713L13.7268 5.5H14C14.2761 5.5 14.5 5.27612 14.5 5V3.25C14.5 2.56075 13.9392 2 13.25 2ZM6.5 1.5C6.5 1.22431 6.72431 1 7 1H9C9.27569 1 9.5 1.22431 9.5 1.5V2H6.5V1.5ZM2.5 3.25C2.5 3.11216 2.61216 3 2.75 3H13.25C13.3878 3 13.5 3.11216 13.5 3.25V4.5C13.3459 4.5 3.13853 4.5 2.5 4.5V3.25ZM12.2959 14.5238C12.2832 14.7908 12.0638 15 11.7965 15H4.2035C3.93616 15 3.71678 14.7908 3.70409 14.5238L3.27437 5.5H12.7256L12.2959 14.5238Z" fill="#333333"></path>
                        <path d="M8 14C8.27613 14 8.5 13.7761 8.5 13.5V7C8.5 6.72387 8.27613 6.5 8 6.5C7.72387 6.5 7.5 6.72387 7.5 7V13.5C7.5 13.7761 7.72384 14 8 14Z" fill="#333333"></path>
                        <path d="M10.5 14C10.7761 14 11 13.7761 11 13.5V7C11 6.72387 10.7761 6.5 10.5 6.5C10.2239 6.5 10 6.72387 10 7V13.5C10 13.7761 10.2238 14 10.5 14Z" fill="#333333"></path>
                        <path d="M5.5 14C5.77613 14 6 13.7761 6 13.5V7C6 6.72387 5.77613 6.5 5.5 6.5C5.22387 6.5 5 6.72387 5 7V13.5C5 13.7761 5.22384 14 5.5 14Z" fill="#333333"></path>
                      </svg>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Total (desktop bottom) */}
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            mt={3}
          >
            <Typography variant="h6" fontWeight={700}>
              Total Price
            </Typography>
            <Typography variant="h6" fontWeight={700} color="#e67e22">
              {formatCurrency(totalPrice)}
            </Typography>
          </Stack>
        </>
      ) : (
        // --- Mobile ---
        <Stack spacing={2}>
          {cart.map((item) => (
            <Card
              key={item._id}
              component={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Checkbox
                    checked={item.checked}
                    onChange={() => toggleChecked(item._id)}
                  />
                  <CardMedia
                    component="img"
                    image={item.course.image}
                    sx={{ width: 80, height: 60, borderRadius: 1 }}
                  />
                  <Box flex={1}>
                    <Typography noWrap fontWeight={600}>
                      {item.course.title}
                    </Typography>
                    {formatPrice(item.course.price, item.course.originalPrice)}
                  </Box>
                  <Stack direction="row" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.quantity}
                    </motion.span>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <IconButton onClick={() => deleteCartItem(item._id)}>
                    🗑️
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Typography variant="h6" fontWeight={700}>
              Total Price
            </Typography>
            <Typography variant="h6" fontWeight={700} color="#e67e22">
              {formatCurrency(totalPrice)}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default CartItems;

