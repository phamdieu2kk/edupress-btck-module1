// src/components/CartItems.jsx
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
import { formatCurrencyDisplay } from "../utils/helpers";

const CartItems = ({
  cart,
  selectAll,
  toggleSelectAll,
  toggleChecked,
  handleQuantityChange,
  deleteCartItem,
  totalPrice,
  isMobile,
}) => {
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
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            {formatCurrencyDisplay(originalPrice)}
          </Typography>
          <Typography fontWeight={700} color="error">
            {formatCurrencyDisplay(price)}
          </Typography>
        </Stack>
      );
    }
    return (
      <Typography fontWeight={700} color="error">
        {formatCurrencyDisplay(price)}
      </Typography>
    );
  };

  if (!cart || cart.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h6">Your cart is empty.</Typography>
      </Box>
    );
  }

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
        <>
          {/* --- Desktop --- */}
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
                {cart.map((item) => {
                  const course = item.course || {};
                  return (
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
                      <TableCell sx={{ minWidth: 300, maxWidth: 400 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <CardMedia
                            component="img"
                            image={course.image || "https://via.placeholder.com/80"}
                            alt={course.title || "No Title"}
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
                            {course.title || "No Title"}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        {formatPrice(course.price || 0, course.originalPrice)}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            px: 0.5,
                            mx: "auto",
                            width: "fit-content",
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
                          {/* SVG icon */}
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.25 2H10.5V1.5C10.5 0.672906 9.82709 0 9 0H7C6.17291 0 5.5 0.672906 5.5 1.5V2H2.75C2.06075 2 1.5 2.56075 1.5 3.25V5C1.5 5.27612 1.72387 5.5 2 5.5H2.27325L2.70522 14.5713C2.74338 15.3725 3.4015 16 4.2035 16H11.7965C12.5985 16 13.2567 15.3725 13.2948 14.5713L13.7268 5.5H14C14.2761 5.5 14.5 5.27612 14.5 5V3.25C14.5 2.56075 13.9392 2 13.25 2ZM6.5 1.5C6.5 1.22431 6.72431 1 7 1H9C9.27569 1 9.5 1.22431 9.5 1.5V2H6.5V1.5ZM2.5 3.25C2.5 3.11216 2.61216 3 2.75 3H13.25C13.3878 3 13.5 3.11216 13.5 3.25V4.5C13.3459 4.5 3.13853 4.5 2.5 4.5V3.25ZM12.2959 14.5238C12.2832 14.7908 12.0638 15 11.7965 15H4.2035C3.93616 15 3.71678 14.7908 3.70409 14.5238L3.27437 5.5H12.7256L12.2959 14.5238Z"
                              fill="#333333"
                            />
                            <path
                              d="M8 14C8.27613 14 8.5 13.7761 8.5 13.5V7C8.5 6.72387 8.27613 6.5 8 6.5C7.72387 6.5 7.5 6.72387 7.5 7V13.5C7.5 13.7761 7.72384 14 8 14Z"
                              fill="#333333"
                            />
                            <path
                              d="M10.5 14C10.7761 14 11 13.7761 11 13.5V7C11 6.72387 10.7761 6.5 10.5 6.5C10.2239 6.5 10 6.72387 10 7V13.5C10 13.7761 10.2238 14 10.5 14Z"
                              fill="#333333"
                            />
                            <path
                              d="M5.5 14C5.77613 14 6 13.7761 6 13.5V7C6 6.72387 5.77613 6.5 5.5 6.5C5.22387 6.5 5 6.72387 5 7V13.5C5 13.7761 5.22384 14 5.5 14Z"
                              fill="#333333"
                            />
                          </svg>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Total */}
          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
            <Typography variant="h6" fontWeight={700}>
              Total Price
            </Typography>
            <Typography variant="h6" fontWeight={700} color="#e67e22">
              {formatCurrencyDisplay(totalPrice || 0)}
            </Typography>
          </Stack>
        </>
      ) : (
        <>
          {/* --- Mobile --- */}
          <Stack spacing={2}>
            {cart.map((item) => {
              const course = item.course || {};
              return (
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
                        image={course.image || "https://via.placeholder.com/80"}
                        alt={course.title || "No Title"}
                        sx={{ width: 80, height: 60, borderRadius: 1 }}
                      />
                      <Box flex={1}>
                        <Typography noWrap fontWeight={600}>
                          {course.title || "No Title"}
                        </Typography>
                        {formatPrice(course.price || 0, course.originalPrice)}
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
                        {/* SVG same as above */}
                        {/* ... */}
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
            <Stack direction="row" justifyContent="space-between" mt={2}>
              <Typography variant="h6" fontWeight={700}>
                Total Price
              </Typography>
              <Typography variant="h6" fontWeight={700} color="#e67e22">
                {formatCurrencyDisplay(totalPrice || 0)}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CartItems;  