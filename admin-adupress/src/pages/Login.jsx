import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "../components/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123456") {
      const fakeUser = { id: 1, name: "Admin User", role: "admin" };
      const fakeToken = "fake-jwt-token-123";

      login(fakeUser, fakeToken);
      navigate("/admin/dashboard");
    } else {
      setError("Sai username hoặc password!");
    }
  };

  return (
    <>
      {/* Header dùng chung */}
      <Header />

      {/* Form login */}
      <Box
        sx={{
          height: "90vh",
          backgroundColor: "#FFF3E0", // nền nhạt cam
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xs">
          <Card
            sx={{
              boxShadow: 6,
              borderRadius: 3,
               // viền cam
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ m: 1, bgcolor: "#FB8C00" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" fontWeight={600} color="#FB8C00">
                  Admin Login
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Đăng nhập để truy cập trang quản trị
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    py: 1.2,
                    bgcolor: "#FB8C00",
                    "&:hover": { bgcolor: "#ef6c00" }, // cam đậm hơn khi hover
                  }}
                >
                  Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
