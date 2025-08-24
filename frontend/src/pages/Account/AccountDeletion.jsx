// src/pages/Account/AccountDeletion.jsx
import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Alert } from "@mui/material";

const AccountDeletion = () => {
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    console.log("Account deletion reason:", reason);
    setSuccess(true);
    setReason("");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" mb={2}>Yêu cầu xóa tài khoản</Typography>
        <TextField
          label="Lý do yêu cầu"
          fullWidth
          multiline
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleSubmit}>Gửi yêu cầu</Button>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Yêu cầu xóa tài khoản đã được gửi!</Alert>}
      </Box>
    </Container>
  );
};

export default AccountDeletion;
