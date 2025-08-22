import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

const LearnPressSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        background: "linear-gradient(135deg, #6A5AF9 0%, #FF6B00 100%)",
        color: "#fff",
        borderRadius: 3,
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 6 }}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Text Content */}
        <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, mb: 1, color: "#F0F0F0" }}
          >
            Get more power from
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}
          >
            LearnPress Premium Add-ons
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#E0E0E0", mb: { xs: 3, md: 0 } }}
          >
            The next level of LearnPress - LMS WordPress Plugin. More Powerful,
            Flexible and Magical Inside.
          </Typography>
        </Box>

        {/* Button */}
        <Box>
          <Button
            variant="contained"
            color="warning"
            href="https://thimpress.com/wordpress/plugins/learnpress/?utm_source=Home&utm_medium=Header&utm_campaign=MainMenu"
            target="_blank"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              whiteSpace: "nowrap",
            }}
          >
            View More
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default LearnPressSection;
