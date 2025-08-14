// src/components/blog/BlogCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const BlogCard = ({ post, view = "grid" }) => {
  const { title, excerpt, image, author, date, id } = post;
  const isList = view === "list";

  return (
   <Card
  component={Link}
  to={`/blog/${id}`} // <--- chuyển hướng đến BlogDetail qua ID
  sx={{
    textDecoration: "none", // không có gạch chân
    color: "inherit",
    display: "flex",
    flexDirection: isList ? { xs: "column", sm: "row" } : "column",
    borderRadius: 2,
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    width: "100%",
    minHeight: isList ? { xs: 300, sm: 220 } : 360,
    height: "100%",
  }}
>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: isList ? { xs: "100%", sm: 280 } : "100%",
          height: isList ? { xs: 180, sm: "100%" } : 200,
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          flex: 1,
        }}
      >
        <Box>
          <Tooltip title={title}>
            <Typography
              variant="h6"
              fontWeight={700}
              lineHeight={1.4}
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 1,
              }}
            >
              {title}
            </Typography>
          </Tooltip>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: isList ? 2 : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 2,
            }}
          >
            {excerpt}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
           

            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarTodayIcon fontSize="small" sx={{ color: "primary.main" }} />
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        
        
      </CardContent>
    </Card>
  );
};

export default BlogCard;
