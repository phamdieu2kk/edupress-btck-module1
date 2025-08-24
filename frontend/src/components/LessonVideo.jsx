// src/components/LessonVideo.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const LessonVideo = ({ title, videoUrl }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" mb={1}>{title}</Typography>
      <video controls width="100%" src={videoUrl}></video>
    </Box>
  );
};

export default LessonVideo;
