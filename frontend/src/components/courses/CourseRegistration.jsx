// src/pages/Courses/CourseRegistration.jsx
import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";

const CourseRegistration = () => {
  const { courseId } = useParams();

  const handleRegister = () => {
    console.log("Registered course:", courseId);
    alert("Đăng ký khóa học thành công!");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" mb={2}>Chi tiết khóa học #{courseId}</Typography>
        <Typography mb={2}>Mô tả khóa học, thông tin giáo viên, mục tiêu học tập...</Typography>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Đăng ký khóa học
        </Button>
      </Box>
    </Container>
  );
};

export default CourseRegistration;
