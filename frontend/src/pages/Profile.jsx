// src/pages/Profile.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user, setUser, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        mobile: user.mobile || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error" fontWeight="bold">
          You are not logged in.
        </Typography>
      </Box>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put("/api/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, sm: 4 } }}>
      <Paper
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        {/* Left Section - Only Avatar & Name */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRight: { md: "1px solid #e0e0e0" },
            background: "#f8f9fa",
          }}
        >
          <Avatar
            alt={formData.fullName}
            src={user.avatar || "https://img.pikbest.com/wp/202433/girl-face-illustration-grey-icon-vector_10640005.jpg!w700wp"}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: "4px solid #fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            {formData.fullName || "User"}
          </Typography>
        </Box>

        {/* Right Section - Form */}
        <Box sx={{ flex: 2, p: { xs: 3, sm: 5 } }}>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
           
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            fullWidth
            sx={{ mt: 4 }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Paper>

      {/* Logout Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="error"
          sx={{
            px: 5,
            py: 1.2,
            fontWeight: "bold",
            boxShadow: 2,
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
