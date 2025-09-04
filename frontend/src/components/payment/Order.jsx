import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Button,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

const Order = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [orderId, setOrderId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const currentStep = location.pathname.includes("/payment") ? 2 : 1;

  const isMobile = window.innerWidth < 900;
  const isAnyItemSelected = cart.length > 0;

  // Phí vận chuyển và Thuế
  const shippingFee = isAnyItemSelected ? 0 : null;
  const tax = isAnyItemSelected ? 0 : null;

  const formatPrice = (price, originalPrice) => {
    if (price === 0) return <Typography fontWeight={700} color="success.main">Free</Typography>;
    if (originalPrice && originalPrice > price)
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
            ${originalPrice.toLocaleString()}
          </Typography>
          <Typography fontWeight={700} color="error">${price.toLocaleString()}</Typography>
        </Stack>
      );
    return <Typography fontWeight={700} color="error">${price.toLocaleString()}</Typography>;
  };

  useEffect(() => {
    let storedOrderId = localStorage.getItem("orderId");
    if (location.state?.orderId) storedOrderId = location.state.orderId;
    if (cart.length === 0) {
      localStorage.removeItem("orderId");
      setOrderId("");
    } else {
      if (!storedOrderId) {
        storedOrderId = `EDP${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        localStorage.setItem("orderId", storedOrderId);
      }
      setOrderId(storedOrderId);
    }
  }, [cart, location.state]);

  useEffect(() => {
    const newTotalPrice = cart.reduce((sum, i) => sum + i.course.price * i.quantity, 0);
    const newTotalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
    setTotalPrice(newTotalPrice);
    setTotalQuantity(newTotalQuantity);
  }, [cart]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: { xs: 2, md: 3 } }}>
      {/* Tab Header */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0, mb: 2, width: "100%" }}>
        {/* Step 1 */}
        <Box sx={{ position: "relative", cursor: "pointer", width: 368 }}>
          <svg width="100%" height="40" viewBox="0 0 386 40">
            <path
              d="M0 0H361.362L386 20.7947L361.362 40H0V0Z"
              fill={currentStep === 1 ? "#0B4D8D" : "#DCDCDC"}
            />
          </svg>
          <Typography
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: { xs: "0.875rem", md: "1.125rem" },
              color: currentStep === 1 ? "#fff" : "#000",
            }}
          >
            1. Xác nhận mua hàng
          </Typography>
        </Box>

        {/* Step 2 */}
        <Box
          sx={{ position: "relative", cursor: "pointer", width: 368, ml: "-15px" }}
          onClick={() => navigate("/payment", { state: { orderId, totalPrice, cart } })}
        >
          <svg width="386" height="40" viewBox="0 0 386 40">
            <path
              d="M362.426 0H362.427V0.0015L385.998 20.7947L362.427 39.9986V40H362.426H0L24.711 20.7947L0 0H362.426Z"
              fill={currentStep === 2 ? "#0B4D8D" : "#DCDCDC"}
            />
          </svg>
          <Typography
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: { xs: "0.875rem", md: "1.125rem" },
              color: currentStep === 2 ? "#fff" : "#000",
            }}
          >
            2. Thanh toán
          </Typography>
        </Box>
      </Box>

      {/* Nội dung Order */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Left column 8/12 */}
        <Box flex={{ xs: "1 1 100%", md: 8 }}>
          <Box sx={{ p: 3, borderRadius: 2, bgcolor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Typography fontWeight={600} mb={2}>Thông tin đơn hàng</Typography>
            <Divider sx={{ my: 2 }} />
            {!isMobile ? (
              <TableContainer component={Paper} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell align="center">Đơn giá</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                      <TableCell align="center">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item._id} component={motion.tr} initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
                        <TableCell>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <CardMedia component="img" image={item.course.image} alt={item.course.title} sx={{ width: 60, height: 45, borderRadius: 1 }} />
                            <Typography sx={{ maxWidth: 250, wordBreak: "break-word", fontWeight: 500 }}>{item.course.title}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{formatPrice(item.course.price, item.course.originalPrice)}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">
                          <Typography fontWeight={700} color="error">${(item.course.price * item.quantity).toLocaleString()}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Stack spacing={2}>
                {cart.map((item) => (
                  <Card key={item._id}>
                    <Box sx={{ p: 1 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CardMedia component="img" image={item.course.image} sx={{ width: 80, height: 60, borderRadius: 1 }} />
                        <Box flex={1}>
                          <Typography noWrap fontWeight={600}>{item.course.title}</Typography>
                          {formatPrice(item.course.price, item.course.originalPrice)} x {item.quantity}
                        </Box>
                      </Stack>
                    </Box>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        </Box>

        {/* Right column 4/12 */}
        <Box flex={{ xs: "1 1 100%", md: 4 }}>
          <Box sx={{ p: 3, borderRadius: 2, bgcolor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", position: { md: "sticky" }, top: { md: 20 }, alignSelf: { md: "flex-start" } }}>
<Typography fontWeight={600} mb={2}>Đơn hàng: {orderId || "---"}</Typography>
            <Box sx={{ borderBottom: "1px solid #e0e0e0", mb: 2 }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography>Thành tiền ({totalQuantity} sản phẩm)</Typography>
              <Typography fontWeight={500}>${totalPrice.toLocaleString()}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography>Phí vận chuyển</Typography>
              <Typography>{shippingFee !== null ? `$${shippingFee.toLocaleString()}` : "-"}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography>Thuế</Typography>
              <Typography>{tax !== null ? `$${tax.toLocaleString()}` : "-"}</Typography>
            </Stack>

            <Box my={2} sx={{ borderBottom: "1px solid #e0e0e0" }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={700}>Tổng</Typography>
              <Typography variant="h5" fontWeight={700} color="#e67e22">
                ${((totalPrice || 0) + (shippingFee || 0) + (tax || 0)).toLocaleString()}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              onClick={() => navigate("/payment", { state: { orderId, totalPrice, cart } })}
              disabled={!isAnyItemSelected}
              sx={{
                width: "100%",
                padding: "6px 8px",
                backgroundColor: isAnyItemSelected ? "#e67e22" : "#e0e0e0",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": { backgroundColor: isAnyItemSelected ? "#d35400" : "#e0e0e0" },
              }}
            >
              Đặt hàng
            </Button>

          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Order;
