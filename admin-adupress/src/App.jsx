// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";

import CourseDetail from "./pages/courses/CourseDetail";
import LessonManagement from "./pages/lessons/LessonManagement";
import LessonCreateEdit from "./pages/lessons/LessonCreateEdit";
import RevenueReport from "./pages/reports/RevenueReport";
import RevenueDetail from "./pages/reports/RevenueDetail";
import ReviewManagement from "./pages/reviews/ReviewManagement";
import CourseCreate from "./pages/courses/CourseCreate";
function App() {
  return (
    <Routes>
      {/* Admin layout */}
      <Route path="/admin" element={<Layout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Courses */}
        <Route path="courses" element={<Courses />} />
        <Route path="courses-create" element={<CourseCreate />} />
        {/* <Route path="courses/:id/edit" element={<CourseCreateEdit />} /> */}
        <Route path="courses/:id" element={<CourseDetail />} />






        {/* Lessons */}
        <Route path="lessons" element={<LessonManagement />} />
        <Route path="lessons/create" element={<LessonCreateEdit />} />
        <Route path="lessons/:id/edit" element={<LessonCreateEdit />} />

        {/* Reports */}
        <Route path="reports" element={<RevenueReport />} />
        <Route path="reports/:id" element={<RevenueDetail />} />

        {/* Reviews */}
        <Route path="reviews" element={<ReviewManagement />} />
      </Route>

      {/* Redirect root → admin/dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
