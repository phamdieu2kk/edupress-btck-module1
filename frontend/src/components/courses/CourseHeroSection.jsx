import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import useCourseLessons from "../../hook/useCourseLessons";

const CourseHeroSection = ({ course }) => {
  // Dùng hook để lấy lesson/subLesson
  const { sections, loading } = useCourseLessons(course._id);

  // Tính tổng lessons từ hook
  const totalLessons = sections.reduce(
    (total, s) => total + (s.subLessons?.length || 0),
    0
  );

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#1E293B",
        py: { xs: 6, md: 8 },
        boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          color: "#fff",
        }}
      >
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

        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeIcon fontSize="small" sx={{ color: "#FF6B00" }} />
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {course.duration ? `${course.duration} Weeks` : "2 Weeks"}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <PeopleIcon sx={{ color: "#FF6B00" }} />
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Student: <span style={{ fontWeight: 600 }}>{course.students || "0"}</span>
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <SignalCellularAltIcon fontSize="small" sx={{ color: "#FF6B00" }} />
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {course.level || "Intermediate"}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <MenuBookIcon sx={{ color: "#FF6B00" }} />
            <Typography variant="body1" sx={{ color: "#fff" }}>
              <span style={{ fontWeight: 600 }}>
                {loading ? "..." : totalLessons}
              </span>{" "}
              Lesson{totalLessons !== 1 ? "s" : ""}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default CourseHeroSection;
