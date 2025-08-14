import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  ButtonBase,
} from "@mui/material";
import { Link } from "react-router-dom";
import blogPosts from "@/data/blogPosts";

const FilterSidebar = ({
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
}) => {
  // Lấy tất cả category & tag từ blogPosts
  const categories = [...new Set(blogPosts.flatMap((post) => post.categories))];
  const tags = [...new Set(blogPosts.flatMap((post) => post.tags))];

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack spacing={4}>
        {/* Category */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Category
          </Typography>
          <Stack spacing={1}>
            {categories.map((cat) => (
              <ButtonBase
                key={cat}
                onClick={() => onCategoryChange(cat)}
                sx={{
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  color:
                    selectedCategory === cat ? "primary.main" : "text.primary",
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Typography variant="body2">{cat}</Typography>
              </ButtonBase>
            ))}
          </Stack>
        </Box>

        {/* Recent Posts */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Posts
          </Typography>
          <Stack spacing={2}>
            {recentPosts.map((post) => (
              <Box key={post.id} display="flex" gap={1.5}>
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Link to={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="text.primary"
                      sx={{
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {post.title}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Tags */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant={selectedTag === tag ? "filled" : "outlined"}
                clickable
                color={selectedTag === tag ? "primary" : "default"}
                onClick={() =>
                  onTagChange(selectedTag === tag ? null : tag)
                }
                sx={{
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                }}
              />
            ))}
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default FilterSidebar;
