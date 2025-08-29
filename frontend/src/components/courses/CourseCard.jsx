// src/components/courses/CourseCard.jsx
import React from "react";
import {
  Card,
  Divider,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Chip,
  Button,
  Tooltip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

const CourseCard = ({ course, variant = "grid" }) => {
  const isList = variant === "list";
  const cardLink = `/courses/${course._id}`;

  const renderListInfoIcons = () => (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={1}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <AccessTimeIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" } }}
        >
          {course.duration || "2 Weeks"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <PeopleIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" } }}
        >
          {course.students || 0} Students
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <SignalCellularAltIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" } }}
        >
          {course.level || "All levels"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <MenuBookIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" } }}
        >
          {course.lessons || 0} Lessons
        </Typography>
      </Stack>
    </Stack>
  );

  const renderGridInfoIcons = () => (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={1} mt={1}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <AccessTimeIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" } }}
        >
          {course.duration || "2 Weeks"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <PeopleIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" } }}
        >
          {course.students || 0} Students
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isList ? { xs: "column", sm: "row" } : "column",
        height: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
          transition: "0.2s",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: isList ? { xs: "100%", sm: 320 } : "100%",
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          image={
            course.image ||
            "https://edupress.thimpress.com/wp-content/uploads/2024/01/create-an-lms-website-with-learnpress-5-1-800x488.jpg"
          }
          alt={course.title}
          sx={{
            height: isList ? 200 : 200,
            width: "100%",
            objectFit: "cover",
            borderRight: isList ? { xs: "none", sm: "1px solid #eee" } : "none",
          }}
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

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            By {course.instructor || "Unknown"}
          </Typography>
          <Tooltip title={course.title}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: isList ? 2 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 1,
              }}
            >
              {course.title}
            </Typography>
          </Tooltip>

          {isList ? renderListInfoIcons() : renderGridInfoIcons()}
        </Box>

        <Box mt={2}>
          <Divider sx={{ mb: 1 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {/* Giá */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: { xs: "space-between", sm: "flex-start" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Stack direction="row" spacing={1} alignItems="baseline">
                {course.originalPrice && course.originalPrice > course.price ? (
                  course.price === 0 ? (
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "success.light" }}
                    >
                      Free
                    </Typography>
                  ) : (
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          mr: 1,
                        }}
                      >
                        ${course.originalPrice.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "error.main" }}
                      >
                        ${course.price.toLocaleString()}
                      </Typography>
                    </>
                  )
                ) : course.price === 0 ? (
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "success.light" }}
                  >
                    Free
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "text.secondary" }}
                  >
                    ${course.price.toLocaleString()}
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* View More Button */}
            <Button
              component={Link}
              to={cardLink}
              size="small"
              variant="text"
              sx={{
                textTransform: "none",
                color: "black",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
                mt: { xs: 1, sm: 0 },
              }}
            >
              View More
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
