import React from "react";
import { Box, Typography, Container } from "@mui/material";
import CountUp from "react-countup";

const statsData = [
  { value: 25, suffix: "k+", label: "Active Students" },
  { value: 899, suffix: "", label: "Total Courses" },
  { value: 158, suffix: "", label: "Instructor" },
  { value: 100, suffix: "%+", label: "Satisfaction Rate" }
];

export default function StatsSection() {
  return (
    <Box sx={{ backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fit, minmax(220px, 1fr))", // cột rộng hơn, auto-fit
            },
            gap: { xs: 3, md: 4 },
            textAlign: "center",
          }}
        >
          {statsData.map((stat, index) => (
            <Box
              key={index}
              sx={{
                p: { xs: 4, md: 5 }, // rộng hơn
                backgroundColor: "#e6e7e7ff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                borderRadius: 4,
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#FF7F43",
                  mb: 1,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  lineHeight: 1.2,
                }}
              >
                <CountUp end={stat.value} duration={2} separator="," />
                {stat.suffix}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: "#333",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
