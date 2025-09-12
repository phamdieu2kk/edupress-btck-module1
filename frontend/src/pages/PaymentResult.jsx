import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { formatCurrencyDisplay } from "../utils/helpers";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.orderId && location.state.total != null) {
      setOrderData({
        orderId: location.state.orderId,
        total: location.state.total,
      });
    } else {
      // Vào trực tiếp URL -> không có state
      setOrderData({
        orderId: "EDP1874029520",
        total: 0, // Hoặc giá trị mặc định bạn muốn
      });
    }
  }, [location.state]);

  if (!orderData) return null;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 12, textAlign: "center", px: 2 }}>
      <Typography variant="h4" mb={3} color="green">
        Thanh toán thành công!
      </Typography>

      <Typography variant="h6" mb={3}>
        Mã đơn hàng: <strong>{orderData.orderId}</strong>
      </Typography>

      <Typography variant="h5" mb={4} color="error">
        Tổng tiền: {formatCurrencyDisplay(orderData.total)}
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ minWidth: 160, fontWeight: 600 }}
      >
        Quay về trang chủ
      </Button>
    </Box>
  );
};

export default PaymentResult;
