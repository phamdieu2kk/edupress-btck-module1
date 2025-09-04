// src/components/blog/BlogDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";

import Breadcrumbs from "@/components/Breadcrumbs";
import FilterSidebar from "@/components/blog/FilterSidebar";
import LeaveComment from "../courses/CourseDetailTabs/LeaveComment";
import CommentSection from "./CommentSection";
import Footer from "../../pages/Footer";

const BASE_URL = "http://localhost:5000/api/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [blogPosts, setBlogPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const resAll = await axios.get(BASE_URL);
        const allPosts = resAll.data.blogs || resAll.data;
        setBlogPosts(allPosts);

        const resPost = await axios.get(`${BASE_URL}/${id}`);
        setPost(resPost.data);
      } catch (err) {
        console.error("❌ Lỗi fetch bài viết:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 10 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h5" color="error">
          Bài viết không tồn tại.
        </Typography>
      </Container>
    );
  }

  // Prev / Next
  const postIndex = blogPosts.findIndex((p) => p._id === post._id);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const handlePrev = () => prevPost && navigate(`/blog/${prevPost._id}`);
  const handleNext = () => nextPost && navigate(`/blog/${nextPost._id}`);

  // Format date giống BlogCard
  const formatDate = (d) => {
    const dateObj = d ? new Date(d) : new Date();
    if (isNaN(dateObj)) return "Không có ngày";
    return dateObj.toLocaleDateString("vi-VN");
  };

  return (
    <>
      <Breadcrumbs
        paths={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title || "Chi tiết bài viết" },
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
            {/* Main content */}
            <Box flex={1}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {post.title}
              </Typography>

              {/* Meta */}
              <Stack direction="row" spacing={3} alignItems="center" color="text.secondary" sx={{ mb: 2 }}>
                {post.author && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon fontSize="small" />
                    <Typography variant="body2">{post.author}</Typography>
                  </Stack>
                )}
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarTodayIcon fontSize="small" />
                  <Typography variant="body2">{formatDate(post.date)}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CommentIcon fontSize="small" />
                  <Typography variant="body2">{post.comments?.length || 0} Comments</Typography>
                </Stack>
              </Stack>

              {/* Image */}
              {post.image && (
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={{ width: "100%", height: "auto", borderRadius: 2, mb: 3 }}
                />
              )}

              {/* Description */}
              {post.description && (
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: "text.secondary", lineHeight: 1.8 }}
                >
                  {post.description}
                </Typography>
              )}

              {/* Content */}
              <Stack spacing={3}>
                {(post.content || "").split("\n").map((para, idx) => (
                  <Typography key={idx} variant="body1" sx={{ lineHeight: 1.8 }}>
                    {para}
                  </Typography>
                ))}
              </Stack>

              {/* Prev / Next */}
              <Stack direction="row" justifyContent="space-between" mt={6} spacing={2}>
                <Box textAlign="left" width="50%">
                  {prevPost && (
                    <Button
                      onClick={handlePrev}
                      startIcon={<ArrowBackIcon />}
                      fullWidth
                      sx={{
                        textTransform: "none",
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        padding: "10px 16px",
                        bgcolor: "#fff",
                        "&:hover": { bgcolor: "#f5f5f5", borderColor: "#999" },
                      }}
                    >
                      {prevPost.title}
                    </Button>
                  )}
                </Box>
                <Box textAlign="right" width="50%">
                  {nextPost && (
                    <Button
                      onClick={handleNext}
                      endIcon={<ArrowForwardIcon />}
                      fullWidth
                      sx={{
                        textTransform: "none",
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        padding: "10px 16px",
                        bgcolor: "#fff",
                        "&:hover": { bgcolor: "#f5f5f5", borderColor: "#999" },
                      }}
                    >
                      {nextPost.title}
                    </Button>
                  )}
                </Box>
              </Stack>

              {/* Comments */}
              <Box sx={{ mt: 6 }}>
                <CommentSection postId={post._id} />
                <LeaveComment postId={post._id} />
              </Box>
            </Box>

            {/* Sidebar */}
            {isDesktop && (
              <Box sx={{ width: 300, flexShrink: 0 }}>
                <FilterSidebar />
              </Box>
            )}
          </Stack>
        </Container>

        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} ModalProps={{ keepMounted: true }}>
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
