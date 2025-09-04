import React, { useState } from "react";
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
import axios from "axios";

const ForgotPasswordOtp = () => {
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = enter OTP + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", {
        email,
      });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password-otp",
        { email, otp, newPassword }
      );
      setMessage(res.data.message);

      // Reset fields
      setStep(1);
      setOtp("");
      setNewPassword("");

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/auth");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 1, color: "#f36602" }}
        >
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          {step === 1
            ? "Enter your email to receive an OTP to reset your password."
            : "Enter the OTP and your new password."}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {step === 1 && (
          <Box
            component="form"
            onSubmit={handleSendOtp}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.3,
                backgroundColor: "#f36602",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e05c00" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box
            component="form"
            onSubmit={handleResetPassword}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.3,
                backgroundColor: "#f36602",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e05c00" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </Box>
        )}

        <Typography mt={3} variant="caption" color="text.secondary">
          OTP will expire after <strong>5 minutes</strong>. Please check your
          email.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordOtp;
