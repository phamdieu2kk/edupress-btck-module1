import React from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ totalSelectedItems, totalPrice, formatCurrency, isAnyItemSelected }) => {
  const navigate = useNavigate();

  return (
    <Box
      flex={1}
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
      <Typography variant="h6" fontWeight={700} mb={2} color="#3470a1">
        Summary (Selected {totalSelectedItems} Items)
      </Typography>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Typography>Subtotal</Typography>
        <Typography fontWeight={500}>{formatCurrency(totalPrice)}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Shipping Fee</Typography>
        <Typography>{isAnyItemSelected ? "0" : "-"}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Tax</Typography>
        <Typography>{isAnyItemSelected ? "0" : "-"}</Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={700}>
          Total
        </Typography>
        <Typography variant="h5" fontWeight={700} color="#e67e22">
          {formatCurrency(totalPrice)}
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        disabled={!isAnyItemSelected}
        onClick={() => navigate("/order")}   // 👉 Điều hướng qua /payment
        sx={{
          bgcolor: isAnyItemSelected ? "#e67e22" : "#e0e0e0",
          "&:hover": {
            bgcolor: isAnyItemSelected ? "#d35400" : "#e0e0e0",
          },
        }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default CartSummary;
