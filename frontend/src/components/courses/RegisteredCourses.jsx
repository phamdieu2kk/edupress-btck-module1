// src/pages/Courses/RegisteredCourses.jsx
import React from "react";
import { Box, Typography, Container, List, ListItem, ListItemText } from "@mui/material";

const mockCourses = [
  { id: 1, name: "React JS cơ bản" },
  { id: 2, name: "NodeJS nâng cao" },
];

const RegisteredCourses = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" mb={2}>Khóa học đã đăng ký</Typography>
        <List>
          {mockCourses.map(course => (
            <ListItem key={course.id} divider>
              <ListItemText primary={course.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default RegisteredCourses;
