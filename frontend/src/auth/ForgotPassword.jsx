// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Alert } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock API call
    console.log("Send reset link to:", email);
    setSuccess(true);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" mb={2}>Quên mật khẩu</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>Gửi hướng dẫn</Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Link đặt lại mật khẩu đã được gửi!</Alert>}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
