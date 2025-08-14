import React from "react";
import { Box, Container, Divider } from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../pages/Footer";
import Login from "./Login";
import Register from "./Register";
const Auth = () => {
  return (
    <>
      <Breadcrumbs paths={[{ name: "Home", href: "/" }, { name: "Login / Register" }]} />
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#f9f9f9" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 3, md: 5 } }}>
            <Login />
            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
            <Register />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Auth;
