import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Box,
  Rating,
  Tooltip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

const CourseCard = ({ course, variant = "grid" }) => {
  const isList = variant === "list";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isList ? { xs: "column", sm: "row" } : "column",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        borderRadius: 2,
        mb: isList ? 2 : 0,
        overflow: "hidden",
        width: "100%",
        height: isList ? { xs: "auto", sm: 200 } : "auto",
        minHeight: isList ? { xs: 300, sm: 200 } : 360,
      }}
    >
      <CardMedia
        component="img"
        image={course.image}
        alt={course.title}
        sx={{
          width: isList ? { xs: "100%", sm: 280 } : "100%",
          height: isList ? { xs: 180, sm: "100%" } : 200,
          objectFit: "cover",
          flexShrink: 0,
          aspectRatio: isList ? "auto" : "16/9",
          borderRight: isList ? { xs: "none", sm: "1px solid #eee" } : "none",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            By {course.instructor}
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

          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center" mb={0.5}>
            {isList && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon fontSize="small" sx={{ color: "#FF9800" }} />
                <Typography variant="caption" color="text.secondary">
                  {course.duration}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" spacing={0.5} alignItems="center">
              <PeopleIcon fontSize="small" sx={{ color: "#FF9800" }} />
              <Typography variant="caption" color="text.secondary">
                {course.students} Students
              </Typography>
            </Stack>

            {isList && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <SignalCellularAltIcon fontSize="small" sx={{ color: "#FF9800" }} />
                <Typography variant="caption" color="text.secondary">
                  {course.level}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" spacing={0.5} alignItems="center">
              <MenuBookIcon fontSize="small" sx={{ color: "#FF9800" }} />
              <Typography variant="caption" color="text.secondary">
                {course.lessons} Lessons
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box>
          {course.price === 0 ? (
            <Stack direction="row" spacing={1} mt={1} alignItems="baseline">
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#4CAF50", fontSize: 18 }}>
                Free
              </Typography>
              {course.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "text.secondary" }}
                >
                  ${course.originalPrice.toLocaleString()}
                </Typography>
              )}
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} mt={1} alignItems="baseline">
              {course.originalPrice && course.originalPrice > course.price && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "text.secondary" }}
                >
                  ${course.originalPrice.toLocaleString()}
                </Typography>
              )}
              <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", fontSize: 18 }}>
                ${course.price.toLocaleString()}
              </Typography>
            </Stack>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={isList ? 1 : 2}>
            <Box display="flex" alignItems="center">
              <Rating name="read-only" value={course.rating || 0} readOnly precision={0.5} size="small" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {course.rating?.toFixed(1) || "0.0"}
              </Typography>
            </Box>

            <Button
  component={Link}
  to={`/courses/${course.id}`} 
  size="small"
  variant="outlined"
  sx={{
    textTransform: "none",
    borderColor: "primary.main",
    color: "primary.main",
    "&:hover": {
      backgroundColor: "primary.light",
      borderColor: "primary.main",
    },
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