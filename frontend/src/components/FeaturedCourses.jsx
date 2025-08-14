import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Container,
  Divider,
} from "@mui/material";

import course01 from "../assets/course01.jpg";
import course02 from "../assets/course02.jpg";
import course03 from "../assets/course03.jpg";
import course04 from "../assets/course04.jpg";
import course05 from "../assets/course05.jpg";
import course06 from "../assets/course06.jpg";

const courses = [
  {
    id: 1,
    category: "Photography",
    title: "Create An LMS Website With LearnPress",
    author: "DeterminedPoitras",
    duration: "2 Weeks",
    students: 156,
    priceOld: "$29.0",
    priceNew: "Free",
    image: course01,
  },
  {
    id: 2,
    category: "Photography",
    title: "Create An LMS Website With LearnPress",
    author: "DeterminedPoitras",
    duration: "2 Weeks",
    students: 156,
    priceOld: "$59.0",
    priceNew: "$49.0",
    image: course02,
  },
  {
    id: 3,
    category: "Photography",
    title: "Create An LMS Website With LearnPress",
    author: "DeterminedPoitras",
    duration: "2 Weeks",
    students: 156,
    priceOld: "$29.0",
    priceNew: "Free",
    image: course03,
  },
  {
    id: 4,
    category: "Photography",
    title: "Create An LMS Website With LearnPress",
    author: "DeterminedPoitras",
    duration: "2 Weeks",
    students: 156,
    priceOld: "$29.0",
    priceNew: "Free",
    image: course04,
  },
  {
    id: 5,
    category: "Photography",
    title: "Create An LMS Website With LearnPress",
    author: "DeterminedPoitras",
    duration: "2 Weeks",
    students: 156,
    priceOld: "$29.0",
    priceNew: "Free",
    image: course05,
  },
  {
    id: 6,
    category: "Photography",
    title: "Create An LMS Website With LearnPress",
    author: "DeterminedPoitras",
    duration: "2 Weeks",
    students: 156,
    priceOld: "$29.0",
    priceNew: "Free",
    image: course06,
  },
];

const FeaturedCourses = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
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
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#fff",
              },
            }}
          >
            All Courses
          </Button>
        </Box>

        {/* Course Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "space-around", md: "space-between" },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {courses.map((course) => (
            <Box
              key={course.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 20px)",
                },
              }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: 2,
                  transition: "0.25s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 3 },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={course.image}
                    alt={course.title}
                  />
                  <Chip
                    label={course.category}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      backgroundColor: "#000",
                      color: "#fff",
                      fontSize: "0.7rem",
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    by {course.author}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {course.title}
                  </Typography>
                  <Stack direction="row" spacing={2} my={1} flexWrap="wrap">
                    <Typography variant="caption" color="text.secondary">
                      ⏱ {course.duration}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      👨‍🎓 {course.students} Students
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 1.5, borderColor: "#eee" }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      <s style={{ color: "#aaa", marginRight: 8 }}>
                        {course.priceOld}
                      </s>
                      {course.priceNew === "Free" ? (
                        <span style={{ color: "#2ecc71" }}>{course.priceNew}</span>
                      ) : (
                        <span style={{ color: "#e74c3c" }}>{course.priceNew}</span>
                      )}
                    </Typography>

                    <Button size="small" sx={{ textTransform: "none" }}>
                      View More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedCourses;
