import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const CheckoutSteps = ({ activeStep }) => {
  return (
    <Stack direction="row" justifyContent="center" spacing={4} mb={3}>
      <Box
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          bgcolor: activeStep === 1 ? "primary.main" : "grey.300",
          color: activeStep === 1 ? "#fff" : "#333",
          fontWeight: 600,
        }}
      >
        1. Xác nhận mua hàng
      </Box>
      <Box
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          bgcolor: activeStep === 2 ? "primary.main" : "grey.300",
          color: activeStep === 2 ? "#fff" : "#333",
          fontWeight: 600,
        }}
      >
        2. Thanh toán
      </Box>
    </Stack>
  );
};

export default CheckoutSteps;
