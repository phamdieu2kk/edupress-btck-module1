import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import bannerImg from "../assets/banner.jpg";
import SchoolIcon from "@mui/icons-material/School";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "70vh", md: "90vh" },
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "left center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      />

      {/* Nội dung */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          sx={{
            maxWidth: "600px",
            textAlign: { xs: "center", md: "left" },
            mx: { xs: "auto", md: 0 },
            px: { xs: 2, sm: 3, md: 0 },
            color: "black",
          }}
        >
          {/* Tiêu đề */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "3rem", // luôn giữ to
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Build Skills with <br /> Online Course
          </Typography>

          {/* Mô tả */}
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 400,
              maxWidth: "520px",
              mx: { xs: "auto", md: 0 },
              mb: { xs: 3, md: 0 },
            }}
          >
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </Typography>

          {/* CTA */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              component={Link}
              to="/courses"
              variant="contained"
              startIcon={<SchoolIcon />}
              sx={{
                borderRadius: 10,
                textTransform: "none",
                fontWeight: 500,
                px: 4,
                py: 1.5,
                backgroundColor: "#f15d08ff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#ee8345ff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                },
              }}
            >
              Posts Comment
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
