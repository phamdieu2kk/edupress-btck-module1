import React from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const CourseHeroSection = ({ course }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        backgroundColor: "#1E293B",
        color: "#fff",
        borderRadius: 3,
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* LEFT: Title, Category, Meta, Description */}
      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} mb={1} alignItems="center">
          <Chip
            label={course.category || "Studio"}
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
              {course.author || "Author Name"}
            </Typography>
          </Typography>
        </Stack>

        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          sx={{ mt: 1, lineHeight: 1.3 }}
        >
          {course.title || "Creative Studio Spaces"}
        </Typography>

        <Typography variant="subtitle1" color="#cbd5e1" sx={{ mb: 2 }}>
          {course.description}
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 2, sm: 3 }}
          flexWrap="wrap"
          useFlexGap
        >
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

      {/* RIGHT: Image + Price + CTA */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            maxWidth: 300,
            width: "100%",
            bgcolor: "#fff",
            borderRadius: 2,
            p: 2,
            color: "#1e293b",
          }}
        >
          <Box
            component="img"
            src={
              course.image ||
              "https://via.placeholder.com/260x160/1c1c1c/FFFFFF?text=Course+Image"
            }
            alt={course.title}
            sx={{
              width: "100%",
              height: 160,
              borderRadius: 1,
              objectFit: "cover",
              mb: 2,
            }}
          />

          <Stack alignItems="center" width="100%">
  <Stack direction="row" spacing={2} alignItems="center">
    <Stack direction="row" spacing={1} alignItems="baseline">
      {course.oldPrice && (
        <Typography
          variant="body2"
          sx={{
            color: "#888",
            textDecoration: "line-through",
          }}
        >
          ${parseFloat(course.oldPrice).toFixed(2)}
        </Typography>
      )}
      <Typography variant="h6" color="#FF6B00" fontWeight={700}>
        {course.price === 0
          ? "Free"
          : `$${parseFloat(course.price).toFixed(2)}`}
      </Typography>
    </Stack>

    <Button
      variant="contained"
      sx={{
        backgroundColor: "#FF6B00",
        "&:hover": { backgroundColor: "#e55d00" },
        py: 1,
        px: 2.5,
        fontWeight: 600,
        fontSize: "0.9rem",
        whiteSpace: "nowrap",
        borderRadius: "8px",
      }}
    >
      START NOW
    </Button>
  </Stack>
</Stack>

        </Box>
      </Box>
    </Box>
  );
};

export default CourseHeroSection;
