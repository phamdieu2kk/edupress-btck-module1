import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./auth/Auth";
import Register from "./auth/Register";
import CourseList from "./components/courses/CourseList";
import CourseDetail from "./components/courses/CourseDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./components/blog/BlogDetail";
import ContactUs from "./pages/ContactUs";
import Faqs from "./pages/Faqs";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Footer from "./pages/Footer"; // ✅ nếu bạn muốn có Footer chung

function App() {
  return (
    <BrowserRouter>
      {/* Navbar luôn hiển thị */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />

        {/* Courses */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Pages */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/profile" element={<Profile />} />

        {/* 404 */}
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Footer luôn hiển thị */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
