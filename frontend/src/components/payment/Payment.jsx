// src/pages/Payment.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Checkbox, FormControlLabel,
  Paper, Divider, Stack, RadioGroup, Radio, Collapse,
  Select, MenuItem
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import axiosClient from "../../api/axiosClient";
import { formatCurrencyDisplay } from "../../utils/helpers";

const banks = [
  { id: "VCB", name: "Vietcombank", logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank.png" },
  { id: "TCB", name: "Techcombank", logo: "https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-TCB-V.png" },
  { id: "MB", name: "MB Bank", logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-MB-Bank-MBB.png" },
  { id: "BIDV", name: "BIDV", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_BIDV.svg/2560px-Logo_BIDV.svg.png" },
  { id: "ICB", name: "VietinBank", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_F-vR447-j1p3-gqK0n_rN0qg8bM8J5k0jQ&s" },
];

const Payment = () => {
  const { cart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [method, setMethod] = useState("vnpay");
  const [selectedBank, setSelectedBank] = useState("");
  const [loading, setLoading] = useState(false);

  const { orderId: stateOrderId, cart: cartFromOrder } = state || {};
  const storedCart = JSON.parse(localStorage.getItem("cartForPayment") || "[]");
  const storedOrderId = localStorage.getItem("orderId") || `EDP${Date.now()}`;
  const activeCart = cartFromOrder?.length ? cartFromOrder : storedCart;
  const currentOrderId = stateOrderId || storedOrderId;

  const selectedItems = activeCart.filter(i => i.checked !== false);

  // Tính tổng VND trực tiếp
  const totalVND = selectedItems.reduce((sum, i) => sum + ((i.course?.price || 0) * i.quantity), 0);

  useEffect(() => {
    if (activeCart?.length) {
      localStorage.setItem("cartForPayment", JSON.stringify(activeCart));
      localStorage.setItem("orderId", currentOrderId);
    }
  }, [activeCart, currentOrderId]);

  const paymentMethods = [
    { id: "vnpay", label: "Thanh toán qua VNPay", logo: "https://sandbox.vnpayment.vn/paymentv2/images/brands/logo.svg" },
    { id: "momo", label: "Thanh toán qua MoMo", logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" },
    { id: "bank", label: "Thanh toán qua Ngân hàng", logo: "https://www.pngfind.com/pngs/m/16-162850_png-file-svg-saving-bank-icon-png-transparent.png" },
  ];

  const handlePayment = async () => {
    if (!agree || selectedItems.length === 0) return;
    setLoading(true);

    try {
      // 1️⃣ Tạo order backend
      const orderRes = await axiosClient.post("/orders/create", {
        orderId: currentOrderId,
        cart: selectedItems,
        total: totalVND, // VND nguyên số
      });

      const backendOrderId = orderRes?.data?.order?.orderId;
      if (!backendOrderId) throw new Error("OrderId backend trả về undefined");

      // 2️⃣ Gọi backend tạo URL thanh toán (VNPay / MoMo / Bank)
      const payRes = await axiosClient.post("/vnpay/create-payment", {
        orderId: backendOrderId,
        amount: totalVND, // VND nguyên
        bankCode: selectedBank || undefined,
      });

      const paymentUrl = payRes?.data?.paymentUrl;
      if (!paymentUrl) throw new Error("Backend trả về undefined paymentUrl");

      // Redirect sang trang thanh toán
      window.location.href = paymentUrl;

    } catch (err) {
      console.error("Payment error:", err);
      alert("Có lỗi khi tạo giao dịch, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: { xs: 2, md: 3 } }}>
      {/* Step bar */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0, mb: 2, width: "100%" }}>
        {["Xác nhận mua hàng", "Thanh toán"].map((label, idx) => {
          const path = idx === 0 ? "/order" : "/payment";
          return (
            <Box
              key={idx}
              sx={{ position: "relative", cursor: "pointer", width: 368 }}
              onClick={() => navigate(path, { state: { orderId: currentOrderId, cart: activeCart } })}
            >
              <svg width="386" height="40" viewBox="0 0 386 40">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={idx === 0
                    ? "M0 0H361.362L386 20.7947L361.362 40H0V0Z"
                    : "M362.426 0H362.427V0.0015L385.998 20.7947L362.427 39.9986V40H362.426H0L24.711 20.7947L0 0H362.426Z"}
                  fill={window.location.pathname === path ? "#0B4D8D" : "#DCDCDC"}
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
                  color: window.location.pathname === path ? "#fff" : "#000",
                }}
              >
                {idx + 1}. {label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        {/* Left: chọn phương thức */}
        <Box flex={{ xs: 1, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", bgcolor: "#fff" }}>
            <Typography fontWeight={600} mb={2}>Chọn phương thức thanh toán</Typography>
            <Divider sx={{ my: 2 }} />
            <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
              {paymentMethods.map(pm => (
                <FormControlLabel
                  key={pm.id}
                  value={pm.id}
                  control={<Radio />}
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <img src={pm.logo} alt={pm.label} style={{ height: pm.id === "bank" ? 40 : 32 }} />
                      <Typography>{pm.label}</Typography>
                    </Stack>
                  }
                  sx={{ mb: 2, border: method === pm.id ? "2px solid #1976d2" : "1px solid #e0e0e0", borderRadius: 1, p: 1.5 }}
                />
              ))}
            </RadioGroup>

            <Collapse in={method === "bank"}>
              <Box mt={2}>
                <Typography fontWeight={600} mb={1}>Chọn ngân hàng</Typography>
                <Select
                  fullWidth
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  displayEmpty
                  renderValue={selectedBank || (() => <Typography color="text.secondary">-- Chọn ngân hàng --</Typography>)}
                  sx={{ borderRadius: 1 }}
                >
                  {banks.map(b => (
                    <MenuItem key={b.id} value={b.id}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <img src={b.logo} alt={b.name} style={{ height: 28 }} />
                        <Typography>{b.name}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Collapse>

            <FormControlLabel
              control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
              label="Tôi đồng ý với các điều khoản thanh toán"
            />
          </Paper>
        </Box>

        {/* Right: đơn hàng */}
        <Box flex={{ xs: 1, md: 4 }}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", bgcolor: "#fff" }}>
            <Typography fontWeight={600} mb={2}>Đơn hàng: {currentOrderId}</Typography>

            {selectedItems.map((item, idx) => (
              <Stack key={idx} direction="row" justifyContent="space-between" mb={1} alignItems="flex-start">
                <Typography sx={{ maxWidth: "70%", wordWrap: "break-word", lineHeight: 1.4 }}>
                  {item.course.title} × {item.quantity}
                </Typography>
                <Typography sx={{ flexShrink: 0 }}>{formatCurrencyDisplay(item.course.price)}</Typography>
              </Stack>
            ))}

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography>Phí:</Typography>
              <Typography>{formatCurrencyDisplay(0)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography>Thuế:</Typography>
              <Typography>{formatCurrencyDisplay(0)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography>Giảm :</Typography>
              <Typography>{formatCurrencyDisplay(0)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mt={2}>
              <Typography fontWeight={700}>Tổng</Typography>
              <Typography fontWeight={700} color="error">{formatCurrencyDisplay(totalVND)}</Typography>
            </Stack>

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                size="small"
                disabled={!agree || !selectedItems.length || loading}
                sx={{
                  bgcolor: agree ? "#e67e22" : "#ccc",
                  "&:hover": { bgcolor: agree ? "#d35400" : "#ccc" },
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  minWidth: 140,
                  height: 40,
                }}
                onClick={handlePayment}
              >
                {loading ? "Đang tạo giao dịch..." : "Thanh toán"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
