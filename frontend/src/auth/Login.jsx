<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
import {
  Box,
  Button,
  TextField,
<<<<<<< HEAD
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
=======
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Footer from "../pages/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import { orange } from "@mui/material/colors";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
<<<<<<< HEAD
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorEmail(false);
    setErrorPassword(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (rememberMe) localStorage.setItem("rememberedUser", email);
      else localStorage.removeItem("rememberedUser");

      navigate("/");
    } catch (error) {
      setErrorEmail(true);
      setErrorPassword(true);
      alert(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
=======

  const [user, setUser] = useState({
    data: null,
    isLoading: false,
  });

  useEffect(() => {
    (async () => {
      setUser((prev) => ({ ...prev, isLoading: true }));
      try {
        const { data } = await axios.get("http://localhost:3000/user");
        setUser({ data, isLoading: false });
      } catch (error) {
        console.error("Fetch user error:", error);
        setUser({ data: [], isLoading: false });
      }
    })();
  }, []);

  const handleLogin = () => {
    const matchedUser = user.data?.find(
      (item) => item.email === email && item.password === password
    );

    if (matchedUser) {
      setLoggedIn(true);
      sessionStorage.setItem("userSession", JSON.stringify(matchedUser));

      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(matchedUser));
      }

      window.location.href = "/";
    } else {
      setLoggedIn(false);
      setErrorEmail(true);
      setErrorPassword(true);
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
    }
  };

  return (
<<<<<<< HEAD
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
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorEmail(false);
          }}
          error={errorEmail}
          helperText={errorEmail ? "Email hoặc mật khẩu không đúng" : ""}
          sx={inputSx}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorPassword(false);
          }}
          error={errorPassword}
          helperText={errorPassword ? "Email hoặc mật khẩu không đúng" : ""}
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
=======
    <>
      <Breadcrumbs
        paths={[
          { name: "Home", href: "/" },
          { name: "Login" },
        ]}
      />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          p: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          sx={{
            width: 400,
            p: 4,
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 3,
            boxShadow: 5,
          }}
        >
          <Typography variant="h5" mb={3} textAlign="center">
            Login
          </Typography>

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorEmail(false);
            }}
            error={errorEmail}
            helperText={errorEmail ? "Email không đúng" : ""}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorPassword(false);
            }}
            error={errorPassword}
            helperText={errorPassword ? "Mật khẩu không đúng" : ""}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            }}
          />

          {/* Remember Me */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
            sx={{ mt: 1 }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 6,
              backgroundColor: "#ef9133ff",
              color: "#fff",
              textTransform: "uppercase",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#ea7a2bff",
              },
            }}
          >
            Login
          </Button>

          {/* Forgot Password */}
          <Box mt={2} textAlign="left">
            <Link
              href="/forgot-password"
              underline="hover"
              sx={{
                color: "black",
                "&:hover": {
                  color: "#000000ff",
                },
              }}
            >
              Lost your password?
            </Link>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
  );
};

export default Login;
