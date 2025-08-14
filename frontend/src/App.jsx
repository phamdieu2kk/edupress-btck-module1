import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./auth/Auth";
import Register from "./auth/Register";
import CoursesPage from "./pages/Courses";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import Faqs from "./pages/Faqs";
import CourseDetail from "./components/courses/CourseDetail";
import BlogDetail from "./components/blog/BlogDetail";
import Error from "./pages/Error";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetail />} /> {/* ✅ Route chi tiết */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/error" element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
