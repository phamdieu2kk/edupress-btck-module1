// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
// import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail";
import Lessons from "./pages/Lessons";
import LessonCreateEdit from "./pages/lessons/LessonCreateEdit";
import RevenueReport from "./pages/reports/RevenueReport";
import RevenueDetail from "./pages/reports/RevenueDetail";
import ReviewManagement from "./pages/reviews/ReviewManagement";
import CourseCreate from "./pages/courses/CourseCreate";
import Courses from "./pages/courses/Courses";
// Blog Pages
import Blogs from "./pages/Blogs";
import BlogCreateEdit from "./pages/BlogCreateEdit";

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
        <Route path="courses/:id" element={<CourseDetail />} />

        {/* Lessons */}
        <Route path="lessons" element={<Lessons />} />
        {/* Danh sách lesson theo course */}
        <Route path="lessons/:courseId" element={<Lessons />} />
        {/* Tạo mới lesson trong course */}
        <Route path="lessons/create/:courseId" element={<LessonCreateEdit />} />
        {/* Chỉnh sửa lesson */}
        <Route path="lessons/edit/:id/:courseId" element={<LessonCreateEdit />} />

        {/* Reports */}
        <Route path="reports" element={<RevenueReport />} />
        <Route path="reports/:id" element={<RevenueDetail />} />

        {/* Blog */}
        <Route path="blog" element={<Blogs />} />
        <Route path="blogs/create" element={<BlogCreateEdit />} />
        <Route path="blogs/edit/:id" element={<BlogCreateEdit />} />

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