import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  SignalCellularAlt as SignalCellularAltIcon,
  MenuBook as MenuBookIcon,
} from "@mui/icons-material";
import useCourseLessons from "../../hook/useCourseLessons";

const CourseHeroSection = ({ course }) => {
  const { sections, loading } = useCourseLessons(course._id);
  const totalLessons = sections.reduce(
    (total, s) => total + (s.subLessons?.length || 0),
    0
  );

  // Mảng info để map, tránh lặp code
  const infoList = [
    {
      icon: <AccessTimeIcon fontSize="small" sx={{ color: "#FF6B00" }} />,
      value: course.duration ? `${course.duration} Weeks` : "2 Weeks",
    },
    {
      icon: <PeopleIcon sx={{ color: "#FF6B00" }} />,
      label: "Student",
      value: course.students || "0",
      isBold: true,
    },
    {
      icon: <SignalCellularAltIcon fontSize="small" sx={{ color: "#FF6B00" }} />,
      value: course.level || "Intermediate",
    },
    {
      icon: <MenuBookIcon sx={{ color: "#FF6B00" }} />,
      value: loading ? "..." : totalLessons,
      suffix: `Lesson${totalLessons !== 1 ? "s" : ""}`,
      isBold: true,
    },
  ];

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
          {infoList.map((item, idx) => (
            <Stack key={idx} direction="row" spacing={0.5} alignItems="center">
              {item.icon}
              <Typography variant="body2" sx={{ color: "#fff" }}>
                {item.label ? `${item.label}: ` : ""}
                {item.isBold ? <span style={{ fontWeight: 600 }}>{item.value}</span> : item.value}{" "}
                {item.suffix || ""}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default CourseHeroSection;
