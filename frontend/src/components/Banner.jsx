import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import bannerImg from "../assets/banner.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import SchoolIcon from "@mui/icons-material/School";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "70vh", md: "80vh" },
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "left center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Overlay mờ giúp dễ đọc chữ hơn */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          zIndex: 1,
        }}
      />

      {/* Nội dung chính */}
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
            color: "#fff",
            textAlign: "left",
            ml: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "black",
              fontWeight: "bold",
              mb: 2,
              fontSize: {
                xs: "1.6rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
              },
              textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            Build Skills with Online Cours
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#eee",
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
              },
              textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </Typography>

          {/* Nút CTA */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              gap: 2,
              mt: 3, // cách xa đoạn mô tả
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
                "&:hover": {
                  backgroundColor: "#ee8345ff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                },
              }}
            >
              Khám phá khóa học
            </Button>

            <Button
              component={Link}
              to="/download"
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{
                borderRadius: 10,
                textTransform: "none",
                fontWeight: 500,
                px: 4,
                py: 1.5,
                backgroundColor: "#43a047",
                "&:hover": {
                  backgroundColor: "#2e7d32",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                },
              }}
            >
              Tải ứng dụng
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
