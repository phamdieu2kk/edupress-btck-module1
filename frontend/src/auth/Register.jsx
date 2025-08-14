import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    height: 52,
    backgroundColor: "#fff",
    "& fieldset": { borderRadius: 10 },
  },
  "& .MuiOutlinedInput-input": { padding: "12px 14px", fontSize: "15px" },
};

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert(res.data.message || "Registration successful!");
      navigate("/auth/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        flex: 1,
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" mb={2} sx={{ fontWeight: "bold" }}>
        Register
      </Typography>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          fullWidth
          label="Email*"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={!!errors.email}
          helperText={errors.email}
          sx={inputSx}
        />
        <TextField
          fullWidth
          label="Username*"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          error={!!errors.username}
          helperText={errors.username}
          sx={inputSx}
        />
        <TextField
          fullWidth
          label="Password*"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={!!errors.password}
          helperText={errors.password}
          sx={inputSx}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password*"
          type={showConfirm ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={inputSx}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            py: 1.1,
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 8,
            backgroundColor: "#f36602ff",
            color: "black",
            "&:hover": { backgroundColor: "#ea7a2bff" },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Register"}
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
