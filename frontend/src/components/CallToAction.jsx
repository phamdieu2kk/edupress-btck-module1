import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const CallToAction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
       
        backgroundColor: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: "24px",
            background: "linear-gradient(90deg, #eba3f7ff 0%, #9ad5f1ff 100%)",
            boxShadow: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 4, sm: 5, md: 6 },
            gap: { xs: 3, md: 4 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left Content */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: { xs: "center", md: "left" },
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 3 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#fff",
                width: 64,
                height: 64,
                boxShadow: 2,
              }}
            >
              <SchoolIcon sx={{ color: "#FF9800", fontSize: 36 }} />
            </Avatar>

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
                maxWidth: { xs: "100%", sm: 380 },
              }}
            >
              Let’s Start With LearnPress LMS
            </Typography>
          </Box>

          {/* Right Content: Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: { xs: "100%", sm: "auto" },
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#32ea04ff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1d7a00ff",
                },
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 6,
                textTransform: "none",
                width: isMobile ? "100%" : "auto",
              }}
            >
              I’m A Student
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f49609ff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#f05807ff",
                },
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 6,
                textTransform: "none",
                width: isMobile ? "100%" : "auto",
              }}
            >
              Become An Instructor
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToAction;
