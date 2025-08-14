// src/components/common/Breadcrumbs.jsx

import React from "react";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
  Container,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumbs = ({ paths }) => {
  return (
    <Box sx={{ py: 2, bgcolor: "#f5f5f5", borderBottom: "1px solid #eee" }}>
      <Container maxWidth="lg">
        <MuiBreadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            return isLast ? (
              <Typography
                key={path.name}
                color="text.primary"
                variant="body2"
              >
                {path.name}
              </Typography>
            ) : (
              <Link
                key={path.name}
                underline="hover"
                color="inherit"
                href={path.href}
                variant="body2"
              >
                {path.name}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      </Container>
    </Box>
  );
};

export default Breadcrumbs;
