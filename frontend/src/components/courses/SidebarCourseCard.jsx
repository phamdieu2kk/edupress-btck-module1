import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Chip,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import useCourseLessons from "../../hook/useCourseLessons";

const SidebarCourseCard = ({ course }) => {
  const cardLink = `/courses/${course._id}`;

  // Dùng hook để lấy sections và tính tổng lessons
  const { sections, loading } = useCourseLessons(course._id);
  const totalLessons = sections.reduce(
    (total, s) => total + (s.subLessons?.length || 0),
    0
  );

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        mb: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={
            course.image ||
            "https://edupress.thimpress.com/wp-content/uploads/2024/01/create-an-lms-website-with-learnpress-5-1-800x488.jpg"
          }
          alt={course.title}
          sx={{ height: 180, objectFit: "cover" }}
        />
        {course.category && (
          <Box sx={{ position: "absolute", top: 8, left: 8 }}>
            <Chip
              label={course.category}
              size="small"
              sx={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1.5} mb={3}>
          {/* Students */}
          <Stack direction="row" spacing={1} alignItems="center">
            <PeopleIcon sx={{ color: "#FF6B00" }} />
            <Typography variant="body1" color="text.primary">
              Student:{" "}
              <span style={{ fontWeight: 600 }}>
                {course.students || "0"} Students
              </span>
            </Typography>
          </Stack>

          {/* Lessons */}
          <Stack direction="row" spacing={1} alignItems="center">
            <MenuBookIcon sx={{ color: "#FF6B00" }} />
            <Typography variant="body1" color="text.primary">
              Lessons:{" "}
              <span style={{ fontWeight: 600 }}>
                {loading ? "..." : totalLessons} Lessons
              </span>
            </Typography>
          </Stack>

          {/* Duration */}
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon sx={{ color: "#FF6B00" }} />
            <Typography variant="body1" color="text.primary">
              Duration:{" "}
              <span style={{ fontWeight: 600 }}>
                {course.duration ? `${course.duration} Weeks` : "2 Weeks"}
              </span>
            </Typography>
          </Stack>

          {/* Level */}
          <Stack direction="row" spacing={1} alignItems="center">
            <SignalCellularAltIcon sx={{ color: "#FF6B00" }} />
            <Typography variant="body1" color="text.primary">
              Level: <span style={{ fontWeight: 600 }}>{course.level || "All levels"}</span>
            </Typography>
          </Stack>
        </Stack>

        <Box display="flex" alignItems="center" justifyContent="center" gap={3} mb={2}>
          {/* Price */}
          <Stack direction="row" spacing={1} alignItems="baseline">
            {course.originalPrice && course.originalPrice > course.price ? (
              course.price === 0 ? (
                <Typography variant="body1" sx={{ fontWeight: 700, color: "#4CAF50" }}>
                  Free
                </Typography>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "line-through", color: "#999" }}
                  >
                    ${course.originalPrice.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "#E53935" }}
                  >
                    ${course.price.toLocaleString()}
                  </Typography>
                </>
              )
            ) : course.price === 0 ? (
              <Typography variant="body1" sx={{ fontWeight: 600, color: "#4CAF50" }}>
                Free
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 600, color: "#E53935" }}>
                ${course.price.toLocaleString()}
              </Typography>
            )}
          </Stack>

          {/* Start Now Button */}
          <Button
            component={Link}
            to={cardLink}
            variant="contained"
            sx={{
              bgcolor: "#FF6B00",
              "&:hover": { bgcolor: "#e55d00" },
              fontWeight: 600,
              textTransform: "none",
              py: 1.2,
              px: 3,
              borderRadius: "50px",
              minWidth: "auto",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            Start Now
          </Button>
        </Box>

        {/* Share */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            startIcon={<ShareIcon />}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
              minWidth: "auto",
              p: 0.5,
            }}
          >
            Share
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SidebarCourseCard;