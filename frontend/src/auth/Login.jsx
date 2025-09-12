import React, { useState, useContext } from "react";
import {
  Box, Button, TextField, FormControlLabel, Checkbox,
  IconButton, InputAdornment, CircularProgress, Paper,
  Typography, Snackbar, Alert, Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const inputSx = {
  "& .MuiOutlinedInput-root": { borderRadius: 10, height: 52, backgroundColor: "#fff", "& fieldset": { borderRadius: 10 }},
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

  // const handleLogin = async () => {
  //   setLoading(true);
  //   setErrorMessage("");
  //   try {
  //     const res = await axiosClient.post("/auth/login", { email, password });

  //     login(res.user, res.token);

  //     if (rememberMe) localStorage.setItem("rememberedUser", email);
  //     else localStorage.removeItem("rememberedUser");

  //     setSuccessSnackbar(true);

  //     setTimeout(() => navigate("/"), 1500);
  //   } catch (err) {
  //     setErrorMessage(err.response?.data?.message || "Login failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleLogin = async () => {
  setLoading(true);
  setErrorMessage("");
  try {
    const res = await axiosClient.post("/auth/login", { email, password });

    // 🔥 Lấy đúng user và token từ response
    const { user, token } = res.data;
    login(user, token); // cập nhật AuthContext

    if (rememberMe) localStorage.setItem("rememberedUser", email);
    else localStorage.removeItem("rememberedUser");

    setSuccessSnackbar(true);

    setTimeout(() => navigate("/"), 1500);
  } catch (err) {
    setErrorMessage(err.response?.data?.message || "Login failed.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Paper elevation={5} sx={{ flex: 1, p: 4, borderRadius: 3, display: "flex", flexDirection: "column", backgroundColor: "white" }}>
        <Typography variant="h4" mb={2} sx={{ fontWeight: "bold" }}>Login</Typography>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextField fullWidth label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={!!errorMessage} helperText={errorMessage} sx={inputSx} />
          <TextField
            fullWidth label="Password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
            error={!!errorMessage} helperText={errorMessage} sx={inputSx}
            InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />} label="Remember me" />
            <Link href="/forgot-password" variant="body2">Forgot password?</Link>
          </Box>
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2, py: 1.1, borderRadius: 8, backgroundColor: "#f36602ff" }} disabled={loading}>
            {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>

      <Snackbar open={successSnackbar} autoHideDuration={1500} onClose={() => setSuccessSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>🎉 Đăng nhập thành công!</Alert>
      </Snackbar>
    </>
  );
};

export default Login;
