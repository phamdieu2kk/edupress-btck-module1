import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
const ForgotPasswordOtp = () => {
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = enter OTP + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút countdown

  const navigate = useNavigate();

  // Countdown OTP
  useEffect(() => {
    let timer;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft <= 0 && step === 2) {
      setError("OTP đã hết hạn. Vui lòng gửi lại OTP.");
      setStep(1);
      setTimeLeft(300);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axiosClient.post("/auth/send-otp", { email });
      setMessage(res.message);
      setStep(2);
      setTimeLeft(300);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Có lỗi khi gửi OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axiosClient.post("/auth/reset-password-otp", {
        email,
        otp,
        newPassword,
      });
      setMessage(res.message);
      setStep(1);
      setOtp("");
      setNewPassword("");
      setTimeLeft(300);

      setTimeout(() => navigate("/auth"), 1500);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Có lỗi khi đổi mật khẩu";
      setError(msg);

      if (msg.includes("OTP đã hết hạn")) {
        setStep(1);
        setTimeLeft(300);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "#f36602" }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          {step === 1
            ? "Enter your email to receive an OTP to reset your password."
            : "Enter the OTP and your new password."}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {step === 1 && (
          <Box component="form" onSubmit={handleSendOtp} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{
              py: 1.3, backgroundColor: "#f36602", textTransform: "none", fontWeight: "bold",
              "&:hover": { backgroundColor: "#e05c00" }
            }}>
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box component="form" onSubmit={handleResetPassword} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="OTP Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{
              py: 1.3, backgroundColor: "#f36602", textTransform: "none", fontWeight: "bold",
              "&:hover": { backgroundColor: "#e05c00" }
            }}>
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
            <Typography mt={1} variant="caption" color="text.secondary">
              OTP expires in <strong>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}{timeLeft % 60} minutes</strong>
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPasswordOtp;
