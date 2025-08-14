import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Drawer,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import blogPosts from "@/data/blogPosts";
import BlogCard from "@/components/blog/BlogCard";
import FilterSidebar from "@/components/blog/FilterSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "./Footer";

const Blog = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleViewChange = (event, newView) => {
    if (newView) setViewMode(newView);
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedTag(null); // reset tag when category is selected
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setSelectedCategory(null); // reset category when tag is selected
  };

  // Lọc bài viết theo search, category và tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      !selectedCategory || post.categories.includes(selectedCategory);

    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <>
      <Breadcrumbs
        paths={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <Box sx={{ bgcolor: "#fafafa", py: 6 }}>
        <Container>
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
            {/* MAIN CONTENT */}
            <Box flex={3}>
              <Box
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
              >
                <Typography variant="h4" fontWeight="bold">
                 Blog
                </Typography>

                <Box display="flex" alignItems="center" gap={1.5}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search articles..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <ToggleButtonGroup
                    size="small"
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view mode"
                    sx={{
                      backgroundColor: "#f7f7f7",
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      "& .MuiToggleButtonGroup-grouped": {
                        border: "none",
                        borderRadius: "6px !important",
                        margin: "0 2px",
                      },
                    }}
                  >
                    <ToggleButton value="grid" aria-label="grid view">
                      <GridViewIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                      <FormatListBulletedIcon fontSize="small" />
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <IconButton
                    onClick={toggleDrawer}
                    sx={{ display: { md: "none" }, ml: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* BÀI VIẾT */}
              {filteredPosts.length === 0 ? (
                <Typography variant="body1">No articles found.</Typography>
              ) : viewMode === "grid" ? (
                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                  gap={3}
                >
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} view="grid" />
                  ))}
                </Box>
              ) : (
                <Stack spacing={3}>
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} view="list" />
                  ))}
                </Stack>
              )}

              {/* PHÂN TRANG (giả lập) */}
              <Box mt={5} display="flex" justifyContent="center">
                <Pagination count={3} color="primary" />
              </Box>
            </Box>

            {/* SIDEBAR CHO DESKTOP */}
            <Box flex={1} minWidth={240} display={{ xs: "none", md: "block" }}>
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                selectedTag={selectedTag}
                onTagChange={handleTagChange}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* DRAWER CHO MOBILE */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box width={280} p={2}>
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              handleCategoryChange(cat);
              toggleDrawer();
            }}
            selectedTag={selectedTag}
            onTagChange={(tag) => {
              handleTagChange(tag);
              toggleDrawer();
            }}
          />
        </Box>
      </Drawer>

      <Footer />
    </>
  );
};

export default Blog;
