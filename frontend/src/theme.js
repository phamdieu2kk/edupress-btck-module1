// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,      // Mobile
      sm: 576,    // Tablet
      md: 768,    // Laptop
      lg: 992,    // PC lớn
      xl: 1200,   // Desktop lớn
      xxl: 1400,  // Siêu lớn (tự thêm)
    },
  },
  palette: {
    primary: {
      main: "#f15d08",
      dark: "#d14c05",
    },
  },
});

export default theme;
