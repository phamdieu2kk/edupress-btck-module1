// src/pages/Courses/Lesson.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LessonVideo from "../../components/LessonVideo";

const mockLessons = [
  { id: 1, title: "Bài 1: Giới thiệu", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, title: "Bài 2: Cơ bản React", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
];

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const lessons = mockLessons; // replace with API fetch
  return (
    <Container maxWidth="md">
      <Typography variant="h4" my={2}>Khóa học #{courseId} - Bài học</Typography>
      {lessons.map(lesson => (
        <LessonVideo key={lesson.id} title={lesson.title} videoUrl={lesson.videoUrl} />
      ))}
    </Container>
  );
};

export default Lesson;
