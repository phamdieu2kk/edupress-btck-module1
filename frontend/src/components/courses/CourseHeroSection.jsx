import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const CourseHeroSection = ({ course }) => {
  return (
    // Full width background
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#1E293B",
        py: { xs: 4, md: 6 }, // padding top/bottom
        boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Inner content container: căn theo các tab */}
      <Box
        sx={{
          maxWidth: "lg", // bằng container maxWidth="lg"
          mx: "auto", // căn giữa
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          color: "#fff",
        }}
      >
        {/* Title, Category, Meta */}
        <Stack direction="row" spacing={1} mb={1} alignItems="center">
          <Chip
            label={course.category || " "}
            size="small"
            sx={{
              bgcolor: "#6A5AF9",
              color: "#fff",
              fontSize: "0.75rem",
              px: 1,
              fontWeight: 600,
              height: "24px",
            }}
          />
          <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
            by{" "}
            <Typography
              component="span"
              variant="body2"
              fontWeight={600}
              sx={{ color: "#fff" }}
            >
              {course.instructor || "Author Name"}
            </Typography>
          </Typography>
        </Stack>

        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          sx={{ lineHeight: 1.3 }}
        >
          {course.title || "Creative Studio Spaces"}
        </Typography>

        {/* <Typography variant="subtitle1" color="#cbd5e1" sx={{ mb: 2 }}>
          {course.description}
        </Typography> */}

        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeIcon fontSize="small" sx={{ color: "#FFB300" }} />
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              {course.duration || "1 Week"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PeopleIcon fontSize="small" sx={{ color: "#FFB300" }} />
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              {course.student || "Students"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <SignalCellularAltIcon fontSize="small" sx={{ color: "#FFB300" }} />
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              {course.level || "Intermediate"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <MenuBookIcon fontSize="small" sx={{ color: "#FFB300" }} />
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              {course.lessons || "8"} Lessons
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default CourseHeroSection;
