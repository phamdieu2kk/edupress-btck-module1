// src/components/FeaturedCourses.jsx
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, CircularProgress } from "@mui/material";
import CourseCard from "./courses/CourseCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/courses?limit=6");
        const data = Array.isArray(res.data.courses) ? res.data.courses : [];
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError("Cannot load featured courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ py: 6, textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 6,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Featured Courses
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explore our popular courses curated just for you.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              px: 3,
              py: 1,
              color: "primary.main",
              borderColor: "primary.main",
              "&:hover": { backgroundColor: "primary.main", color: "#fff" },
              mt: { xs: 2, sm: 0 }, // margin top khi trên mobile
            }}
            onClick={() => navigate("/courses")}
          >
            All Courses
          </Button>
        </Box>

        {/* Courses Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {courses.map((course) => (
            <Box key={course._id || course.id} sx={{ width: "100%" }}>
              <CourseCard course={course} variant="grid" />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedCourses;
