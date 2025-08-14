import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogPosts from "@/data/blogPosts";
import {
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Breadcrumbs from "@/components/Breadcrumbs";
import FilterSidebar from "@/components/blog/FilterSidebar";
import LeaveComment from "../courses/CourseDetailTabs/LeaveComment";
import CommentSection from "./CommentSection";
import Footer from "../../pages/Footer";
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const postIndex = blogPosts.findIndex((p) => p.id.toString() === id);
  const post = blogPosts[postIndex];

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!post) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h5" color="error">
          Bài viết không tồn tại.
        </Typography>
      </Container>
    );
  }

  const handlePrev = () => {
    if (prevPost) navigate(`/blog/${prevPost.id}`);
  };

  const handleNext = () => {
    if (nextPost) navigate(`/blog/${nextPost.id}`);
  };

  return (
    <>
      <Breadcrumbs
        paths={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post?.title || "Chi tiết bài viết" },
        ]}
      />

      <Box sx={{ bgcolor: "#fafafa", py: 6 }}>
        <Container maxWidth="lg">
          {!isDesktop && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ mb: 2 }}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
            <Box flex={1}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {post.title}
              </Typography>

              {/* Meta */}
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="body2">{post.author}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarTodayIcon fontSize="small" />
                  <Typography variant="body2">{post.date}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CommentIcon fontSize="small" />
                  <Typography variant="body2">
                    {post.comments?.length || 0} Comments
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                variant="body1"
                sx={{ mb: 3, color: "text.secondary", lineHeight: 1.8 }}
              >
                {post.description || "Không có mô tả."}
              </Typography>

              <Box
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  mb: 3,
                }}
              />

              <Stack spacing={3}>
                {(post.content || "").split("\n").map((para, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {para}
                  </Typography>
                ))}
              </Stack>

              {/* Prev / Next Article Buttons */}
              <Stack direction="row" justifyContent="space-between" mt={6} spacing={2}>
                {/* Prev Article */}
                <Box textAlign="left" width="50%">
                  {prevPost && (
                    <Stack spacing={1}>
                      <Typography variant="caption" color="text.secondary">
                        Prev Article
                      </Typography>
                      <Button
                        onClick={handlePrev}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                          justifyContent: "flex-start",
                          textTransform: "none",
                          border: "1px solid #ccc",
                          borderRadius: 2,
                          padding: "10px 16px",
                          bgcolor: "#fff",
                          "&:hover": {
                            bgcolor: "#f5f5f5",
                            borderColor: "#999",
                          },
                        }}
                        fullWidth
                      >
                        <Typography variant="body1" fontWeight="medium" noWrap>
                          {prevPost.title}
                        </Typography>
                      </Button>
                    </Stack>
                  )}
                </Box>

                {/* Next Article */}
                <Box textAlign="right" width="50%">
                  {nextPost && (
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="caption" color="text.secondary">
                         Next Article
                      </Typography>
                      <Button
                        onClick={handleNext}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          justifyContent: "flex-end",
                          textTransform: "none",
                          border: "1px solid #ccc",
                          borderRadius: 2,
                          padding: "10px 16px",
                          bgcolor: "#fff",
                          "&:hover": {
                            bgcolor: "#f5f5f5",
                            borderColor: "#999",
                          },
                        }}
                        fullWidth
                      >
                        <Typography variant="body1" fontWeight="medium" noWrap>
                          {nextPost.title}
                        </Typography>
                      </Button>
                    </Stack>
                  )}
                </Box>
              </Stack>

              <Box sx={{ mt: 6 }}>
                <CommentSection />
                <LeaveComment />
              </Box>
            </Box>

            {isDesktop && (
              <Box sx={{ width: 300, flexShrink: 0 }}>
                <FilterSidebar />
              </Box>
            )}
          </Stack>
        </Container>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ width: 280, p: 2 }}>
            <FilterSidebar />
          </Box>
        </Drawer>
      </Box>
       <Footer />
    </>
  );
};

export default BlogDetail;
