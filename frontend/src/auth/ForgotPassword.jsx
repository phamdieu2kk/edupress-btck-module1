import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      setSnackbarMessage(response.data.message); // Show the success message from the backend
      setOpenSnackbar(true);
      setEmail(""); // Reset email input
    } catch (err) {
      setSnackbarMessage(err.response?.data?.message || "An error occurred");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Breadcrumbs paths={[{ name: "Home", href: "/" }, { name: "Forgot Password" }]} />
      
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#f9f9f9" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Paper
              elevation={5}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 400,
              }}
            >
              <Typography variant="h4" mb={2} sx={{ fontWeight: "bold" }}>
                Forgot Password
              </Typography>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    style: { color: "#f36602" },
                  }}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.2,
                    backgroundColor: "#f36602",
                    "&:hover": {
                      backgroundColor: "#f26e0f",
                    },
                    textTransform: "none",
                  }}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Instructions"}
                </Button>
              </form>

              <Box sx={{ mt: 3, width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body2">
                  <Link
                    onClick={() => navigate("/auth")}
                    sx={{
                      textTransform: "none",
                      fontSize: "0.9rem",
                      color: "#f36602",
                      cursor: "pointer",
                    }}
                  >
                    Back to Login
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Snackbar for success or error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ top: { xs: "100px", md: "100px" }, right: { xs: "100px", md: "100px" } }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("error") ? "error" : "success"} sx={{ bgcolor: "#3eea05", color: "#ffffff" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default ForgotPassword;
