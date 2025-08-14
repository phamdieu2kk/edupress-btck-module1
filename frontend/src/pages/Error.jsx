import React from "react";
import {
  Container,
  Box,
} from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "./Footer";
const Error = () => {
  const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Error", href: "/error" },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Breadcrumbs paths={breadcrumbPaths} />
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh", // để ảnh luôn cân giữa chiều cao màn hình
        }}
      >
        <Box
          component="img"
          src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/forgot.png"
          alt="Error Image"
          sx={{
            width: "100%",
            maxWidth: "600px", // không quá lớn trên màn hình to
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Container>
       <Footer />
    </>
  );
};

export default Error;
