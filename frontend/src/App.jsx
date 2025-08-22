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
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        
        {/* Courses */}
        <Route path="/courses" element={<CourseList />} /> {/* Hiển thị tất cả khóa học */}
        <Route path="/courses/:id" element={<CourseDetail />} /> {/* Chi tiết khóa học */}

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="*" element={<Error />} /> {/* 404 */}
     
      <Route path="/profile" element={<Profile />} />
     
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
