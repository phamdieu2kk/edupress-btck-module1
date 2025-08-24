// src/components/admin/RecentCourses.jsx
import React from "react";
import { Card, Typography, Box } from "@mui/material";

const courses = [
  { name: "Web Development", status: "Published", date: "July 10, 2021" },
  { name: "UI/UX Design", status: "Published", date: "July 10, 2021" },
];

const RecentCourses = () => (
  <Card elevation={0} sx={{ borderRadius: 3, p: 3, bgcolor: "white" }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
      Recent Courses
    </Typography>
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, fontWeight: "bold", color: "text.secondary" }}>
        <Typography variant="body2" sx={{ flex: 1 }}>Course</Typography>
        <Typography variant="body2" sx={{ flex: 1 }}>Status</Typography>
        <Typography variant="body2" sx={{ flex: 1 }}>Date</Typography>
      </Box>
      {courses.map((course, index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #eee" }}>
          <Typography variant="body2" sx={{ flex: 1 }}>{course.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4CAF50", mr: 1 }} />
            <Typography variant="body2">{course.status}</Typography>
          </Box>
          <Typography variant="body2" sx={{ flex: 1 }}>{course.date}</Typography>
        </Box>
      ))}
    </Box>
  </Card>
);

export default RecentCourses;
