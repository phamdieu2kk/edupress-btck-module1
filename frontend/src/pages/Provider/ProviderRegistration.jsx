// src/pages/Provider/ProviderRegistration.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography, Alert } from "@mui/material";

const ProviderRegistration = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    console.log({ name, contact, description });
    setSuccess(true);
    setName(""); setContact(""); setDescription("");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" mb={2}>Đăng ký nhà cung cấp khóa học</Typography>
        <TextField label="Tên" fullWidth required value={name} onChange={(e)=>setName(e.target.value)} sx={{mb:2}} />
        <TextField label="Liên hệ" fullWidth required value={contact} onChange={(e)=>setContact(e.target.value)} sx={{mb:2}} />
        <TextField label="Mô tả khóa học" fullWidth multiline rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} sx={{mb:2}} />
        <Button variant="contained" fullWidth onClick={handleSubmit}>Đăng ký</Button>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Đăng ký thành công!</Alert>}
      </Box>
    </Container>
  );
};

export default ProviderRegistration;
