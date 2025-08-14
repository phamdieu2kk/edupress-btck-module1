import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../assets/logo-new.svg"; 
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#eed7d7ff", 
        color: "#000000",          
        pt: 8,
        pb: 4,
      }}
    >
      <Grid container spacing={4} justifyContent="center" px={{ xs: 2, md: 6 }}>
      
        <Grid item xs={12} sm={6} md={3}>
          <Box mb={2}>
            <img src={logo} alt="EduPress" style={{ width: 150 }} />
          </Box>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              maxWidth: 500,
              wordBreak: "break-word",
              lineHeight: 1.6,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>

       
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ color: "red", fontWeight: 600 }} gutterBottom>
            GET HELP
          </Typography>
          <Box component="nav">
            {["Contact Us", "Latest Articles", "FAQs"].map(
              (text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  color="text.primary"
                  display="block"
                  sx={{ mb: 1, "&:hover": { color: "red" } }}
                >
                  {text}
                </Link>
              )
            )}
          </Box>
        </Grid>

      
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ color: "red", fontWeight: 600 }} gutterBottom>
            PROGRAMS
          </Typography>
          <Box component="nav">
            {[
              "Art & Design",
              "Business",
              "IT & Software",
              "Languages",
              "Programming",
            ].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                color="text.primary"
                display="block"
                sx={{ mb: 1, "&:hover": { color: "red" } }}
              >
                {text}
              </Link>
            ))}
          </Box>
        </Grid>

       
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ color: "red", fontWeight: 600 }} gutterBottom>
            CONTACT US
          </Typography>
          <Typography variant="body2" color="text.primary" mb={2}>
            23 New Design Str, Lorem Ipsum10 Hudson Yards, USA
          </Typography>
          <Typography variant="body2" color="text.primary" mb={2}>
            Tel: + (123) 2500-567-8988
          </Typography>
          <Typography variant="body2" color="text.primary" mb={2}>
            Email: support@lms.com
          </Typography>
          
          
          <Box display="flex" gap={1} mb={2}>
            <TextField
              variant="filled"
              size="small"
              placeholder="Your email"
              fullWidth
              InputProps={{
                sx: {
                  backgroundColor: "#f0f0f0",
                  color: "black",
                  borderRadius: "8px",
                  input: { color: "black" },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "#fff",
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#cc0000",
                },
              }}
            >
              Send
            </Button>
          </Box>
          <Box display="flex" gap={1}>
            <IconButton sx={{ color: "black" }}>
              <FacebookOutlinedIcon />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              <PinterestIcon />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Box mt={6} textAlign="center" color="text.secondary">
        <Typography variant="body2">
          © {new Date().getFullYear()} Copyright © 2025 LearnPress LMS | Powered by LearnPress LMS
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
