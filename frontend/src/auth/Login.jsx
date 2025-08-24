import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // Lưu vào Context
      login(res.data.user, res.data.token);

      // Ghi nhớ email nếu cần
      if (rememberMe) localStorage.setItem("rememberedUser", email);
      else localStorage.removeItem("rememberedUser");

      // Hiện thông báo thành công
      setSuccessSnackbar(true);

      // Redirect sau 1.5s
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          Login
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
            sx={inputSx}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
            sx={inputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
                size="small"
              />
            }
            label="Remember me"
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
              "&:hover": { backgroundColor: "#f26e0fff" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>

      {/* Snackbar thông báo */}
      <Snackbar
        open={successSnackbar}
        autoHideDuration={1500}
        onClose={() => setSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          🎉 Đăng nhập thành công!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
