import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./auth/Auth";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import CourseList from "./components/courses/CourseList";
import CourseDetail from "./components/courses/CourseDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./components/blog/BlogDetail";
import ContactUs from "./pages/ContactUs";
import Faqs from "./pages/Faqs";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import CartCourses from "./pages/CartCourses";
import PaymentPage from "./pages/PaymentPage";
import Order from "./components/payment/Order";
import Payment from "./components/payment/Payment";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home & Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Courses */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Other pages */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart-courses" element={<CartCourses />} />

         <Route path="/paymentpage" element={<PaymentPage />} />
{/* <Route path="/order" element={<PaymentPage />} /> */}


<Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />


        {/* 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
