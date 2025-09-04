// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart, updateCartItemLocal } = useCart();

  const [step, setStep] = useState(1); // 1: Xác nhận mua hàng, 2: Thanh toán
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.course.price * item.quantity,
    0
  );

  const formatCurrency = (price) => `${price.toLocaleString()}₫`;

  const handlePayment = () => {
    if (!agreed) {
      setError("Vui lòng đồng ý điều khoản trước khi thanh toán.");
      return;
    }
    console.log("Thanh toán:", { cart, totalAmount, paymentMethod });
    clearCart();
    navigate("/payment-success", { state: { totalAmount, paymentMethod } });
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    updateCartItemLocal(id, newQty);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 5, px: 2, pb: 5 }}>
      {/* Stepper */}
      <Stack direction="row" spacing={1} mb={4}>
        <Button
          variant={step === 1 ? "contained" : "outlined"}
          color="primary"
          onClick={() => setStep(1)}
        >
          1. Xác nhận mua hàng
        </Button>
        <Button
          variant={step === 2 ? "contained" : "outlined"}
          color="primary"
          onClick={() => setStep(2)}
        >
          2. Thanh toán
        </Button>
      </Stack>

      {step === 1 && (
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* Bảng sản phẩm */}
          <Paper sx={{ flex: 2, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Thông tin đơn hàng
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 4px" }}>Sản phẩm</th>
                    <th style={{ textAlign: "right", padding: "8px 4px" }}>Đơn giá</th>
                    <th style={{ textAlign: "center", padding: "8px 4px" }}>Số lượng</th>
                    <th style={{ textAlign: "right", padding: "8px 4px" }}>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "8px 4px" }}>{item.course.title}</td>
                      <td style={{ padding: "8px 4px", textAlign: "right" }}>
                        {item.course.oldPrice && (
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#999",
                              marginRight: 6,
                            }}
                          >
                            {formatCurrency(item.course.oldPrice)}
                          </span>
                        )}
                        <span>{formatCurrency(item.course.price)}</span>
                      </td>
                      <td style={{ padding: "8px 4px", textAlign: "center" }}>
                        {item.quantity}
                      </td>
                      <td style={{ padding: "8px 4px", textAlign: "right" }}>
                        {formatCurrency(item.course.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>

          {/* Bảng đơn hàng bên phải */}
          <Paper sx={{ flex: 1, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Đơn hàng: {Math.floor(Math.random() * 100000000)}
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Thành tiền</Typography>
                <Typography>{formatCurrency(totalAmount)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Phí vận chuyển</Typography>
                <Typography>-</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Thuế</Typography>
                <Typography>-</Typography>
              </Stack>

              <Box mt={1}>
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                />
                <Button variant="outlined" size="small" fullWidth disabled>
                  Áp dụng
                </Button>
              </Box>

              <Stack direction="row" justifyContent="space-between" mt={1} mb={1}>
                <Typography>Giảm</Typography>
                <Typography>-</Typography>
              </Stack>

              <Divider />

              <Stack direction="row" justifyContent="space-between" mt={1} mb={2}>
                <Typography variant="h6">Tổng</Typography>
                <Typography variant="h6" color="#ff6600">
                  {formatCurrency(totalAmount)}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setStep(2)}
              >
                Đặt hàng
              </Button>
            </Stack>
          </Paper>
        </Stack>
      )}

      {step === 2 && (
        // Bước 2: Thanh toán
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Paper sx={{ flex: 2, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Đơn hàng của bạn
            </Typography>
            <Divider />
            <Stack spacing={2} mt={2}>
              {cart.length === 0 && <Typography>Chưa có sản phẩm nào.</Typography>}
              {cart.map((item) => (
                <Stack
                  key={item._id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>
                    {item.course.title} x {item.quantity}
                  </Typography>
                  <Typography>
                    {formatCurrency(item.course.price * item.quantity)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Tổng tiền:</Typography>
              <Typography variant="h6">{formatCurrency(totalAmount)}</Typography>
            </Stack>
          </Paper>

          <Paper sx={{ flex: 1, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Phương thức thanh toán
            </Typography>
            <FormControl>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng (COD)"
                />
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Chuyển khoản ngân hàng"
                />
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label="Ví MoMo / ZaloPay"
                />
              </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
              }
              label="Tôi đồng ý với các điều khoản thanh toán"
            />

            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handlePayment}
            >
              Thanh toán {formatCurrency(totalAmount)}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => setStep(1)}
            >
              Quay lại xác nhận đơn hàng
            </Button>
          </Paper>
        </Stack>
      )}
    </Box>
  );
};

export default PaymentPage;
