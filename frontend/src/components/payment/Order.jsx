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
import { formatCurrencyDisplay } from "../../utils/helpers"; // ✅ Import helper function

const Order = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [orderId, setOrderId] = useState("");

  const currentStep = location.pathname.includes("/payment") ? 2 : 1;
  const isMobile = window.innerWidth < 900;

  // --- Lọc các sản phẩm đã check ---
  const checkedCartItems = cart.filter((item) => item.checked);
  const isAnyItemSelected = checkedCartItems.length > 0;

  const shippingFee = isAnyItemSelected ? 0 : null;
  const tax = isAnyItemSelected ? 0 : null;

  const formatPrice = (price, originalPrice) => {
    if (price === 0)
      return (
        <Typography fontWeight={700} color="success.main">
          Free
        </Typography>
      );
    if (originalPrice && originalPrice > price)
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
    return (
      <Typography fontWeight={700} color="error">
        {formatCurrencyDisplay(price)}
      </Typography>
    );
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Quản lý orderId và cartForPayment (chỉ các sản phẩm đã check)
    const storedOrderId = localStorage.getItem("orderId");
    if (checkedCartItems.length > 0) {
      if (!storedOrderId) {
        const newOrderId = `EDP${Math.floor(
          1000000000 + Math.random() * 9000000000
        )}`;
        localStorage.setItem("orderId", newOrderId);
        setOrderId(newOrderId);
      } else {
        setOrderId(storedOrderId);
      }
      localStorage.setItem("cartForPayment", JSON.stringify(checkedCartItems));
    } else {
      localStorage.removeItem("orderId");
      localStorage.removeItem("cartForPayment");
      setOrderId("");
    }
  }, [checkedCartItems]);

  useEffect(() => {
    const newTotalPriceUSD = checkedCartItems.reduce(
      (sum, i) => sum + i.course.price * i.quantity,
      0
    );
    const newTotalQuantity = checkedCartItems.reduce(
      (sum, i) => sum + i.quantity,
      0
    );
    setTotalPrice(newTotalPriceUSD);
    setTotalQuantity(newTotalQuantity);
  }, [checkedCartItems]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: { xs: 2, md: 3 } }}>
      {/* Step Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          mb: 2,
          width: "100%",
        }}
      >
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
          sx={{
            position: "relative",
            cursor: "pointer",
            width: 368,
            ml: "-15px",
          }}
          onClick={() => navigate("/payment", { state: { orderId, cart: checkedCartItems } })}
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

      {/* Main Content */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Left Column */}
        <Box flex={{ xs: "1 1 100%", md: 8 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Thông tin đơn hàng
            </Typography>
            <Divider sx={{ my: 2 }} />

            {!isMobile ? (
              <TableContainer
                component={Paper}
                sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}
              >
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
                    {checkedCartItems.map((item) => (
                      <TableRow
                        key={item._id}
                        component={motion.tr}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <TableCell>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <CardMedia
                              component="img"
                              image={item.course.image}
                              alt={item.course.title}
                              sx={{ width: 60, height: 45, borderRadius: 1 }}
                            />
                            <Typography
                              sx={{
                                maxWidth: 250,
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
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">
                          <Typography fontWeight={700} color="error">
                            {formatCurrencyDisplay(item.course.price * item.quantity)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Stack spacing={2}>
                {checkedCartItems.map((item) => (
                  <Card key={item._id}>
                    <Box sx={{ p: 1 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CardMedia
                          component="img"
                          image={item.course.image}
                          sx={{ width: 80, height: 60, borderRadius: 1 }}
                        />
                        <Box flex={1}>
                          <Typography noWrap fontWeight={600}>
                            {item.course.title}
                          </Typography>
                          {formatPrice(item.course.price, item.course.originalPrice)}{" "}
                          x {item.quantity}
                        </Box>
                      </Stack>
                    </Box>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        </Box>

        {/* Right Column */}
        <Box flex={{ xs: "1 1 100%", md: 4 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              position: { md: "sticky" },
              top: { md: 20 },
              alignSelf: { md: "flex-start" },
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Đơn hàng: {orderId || "---"}
            </Typography>
            <Box sx={{ borderBottom: "1px solid #e0e0e0", mb: 2 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography>Thành tiền ({totalQuantity} sản phẩm)</Typography>
              <Typography fontWeight={500}>
                {formatCurrencyDisplay(totalPrice)}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Phí vận chuyển</Typography>
              <Typography>
                {shippingFee !== null ? formatCurrencyDisplay(shippingFee) : "-"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Thuế</Typography>
              <Typography>{tax !== null ? formatCurrencyDisplay(tax) : "-"}</Typography>
            </Stack>

            <Box my={2} sx={{ borderBottom: "1px solid #e0e0e0" }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight={700}>
                Tổng
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#e67e22">
                {formatCurrencyDisplay(
                  (totalPrice || 0) + (shippingFee || 0) + (tax || 0)
                )}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              onClick={() => navigate("/payment", { state: { orderId, cart: checkedCartItems } })}
              disabled={!isAnyItemSelected}
              sx={{
                width: "100%",
                padding: "6px 8px",
                backgroundColor: isAnyItemSelected ? "#e67e22" : "#e0e0e0",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: isAnyItemSelected ? "#d35400" : "#e0e0e0",
                },
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
