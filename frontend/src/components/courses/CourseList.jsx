import React from "react";
import CourseCard from "./CourseCard";
import courseList from "../../data/mock-data"; // ✅ đúng đường dẫn
import { Stack } from "@mui/material";

const CourseList = () => {
  return (
    <Stack spacing={3}>
      {courseList.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Stack>
  );
};

export default CourseList;
