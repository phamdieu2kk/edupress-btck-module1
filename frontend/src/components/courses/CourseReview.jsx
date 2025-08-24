// src/pages/Courses/CourseReview.jsx
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Rating, Container, Alert } from "@mui/material";

const CourseReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    console.log({ rating, comment });
    setSuccess(true);
    setRating(0);
    setComment("");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" mb={2}>Đánh giá khóa học</Typography>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
        />
        <TextField
          label="Nhận xét"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Gửi đánh giá</Button>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Cảm ơn bạn đã đánh giá!</Alert>}
      </Box>
    </Container>
  );
};

export default CourseReview;
