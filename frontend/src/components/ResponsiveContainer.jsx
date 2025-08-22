// src/components/ResponsiveContainer.jsx
import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const ResponsiveContainer = ({ children, maxWidth = "1200px" }) => {
  const theme = useTheme();

  // detect screen sizes
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >900px

  let paddingX = 3; // default
  let maxW = maxWidth;

  if (isMobile) {
    paddingX = 1.5; // nhỏ lại cho mobile
    maxW = "100%";
  } else if (isTablet) {
    paddingX = 2; // vừa cho tablet
    maxW = "95%";
  }

  return (
    <Box
      sx={{
        maxWidth: maxW,
        mx: "auto",
        px: paddingX,
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;
