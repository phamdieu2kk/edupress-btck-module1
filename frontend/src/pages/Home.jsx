// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer.jsx";

<<<<<<< HEAD
=======
// ⚠️ THÊM các dòng import còn thiếu dưới đây:
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
import Banner from "../components/Banner";
import PopularCategories from "../components/PopularCategories";
import FeaturedCourses from "../components/FeaturedCourses";
import BannerWithTextAndImage from "../components/BannerWithTextAndImage";
import StatsSection from "../components/StatsSection";
import SkillSection from "../components/SkillSection";
import FeatureBanner from "../components/FeatureBanner";
import StudentFeedbacks from "../components/StudentFeedbacks";
import LatestArticles from "../components/LatestArticles";
import CallToAction from "../components/CallToAction";
import BlogCard from "../components/blog/BlogCard.jsx";

<<<<<<< HEAD
import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f9f9f9" }}>
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Banner */}
      <Box component="section" sx={{ width: "100%" }}>
        <Banner />
      </Box>

      {/* Popular Categories */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PopularCategories />
      </Container>

      {/* Featured Courses */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <FeaturedCourses courses={courses} />
      </Container>

      {/* Banner with Text and Image */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <BannerWithTextAndImage />
      </Container>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <StatsSection />
      </Container>

      {/* Skill Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <SkillSection />
      </Container>

      {/* Feature Banner */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <FeatureBanner />
      </Container>

      {/* Student Feedbacks */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <StudentFeedbacks />
      </Container>

      {/* Call To Action */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <CallToAction />
      </Container>

      {/* Latest Articles */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <LatestArticles />
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ width: "100%", mt: 6 }}>
        <Footer />
      </Box>
    </Box>
  );
}
=======
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b

const courses = [
  {
    title: "Khóa học ReactJS",
    description: "Học ReactJS từ cơ bản đến nâng cao.",
    image: "https://source.unsplash.com/400x300/?coding,react",
  },
  {
    title: "Thiết kế UI/UX",
    description: "Thiết kế trải nghiệm người dùng chuyên nghiệp.",
    image: "https://source.unsplash.com/400x300/?design,ui",
  },
];
<<<<<<< HEAD
=======

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Banner />
      <PopularCategories />
      <FeaturedCourses />
      <BannerWithTextAndImage />
      <StatsSection />
      <SkillSection />
      <FeatureBanner />
      <StudentFeedbacks />
      <CallToAction />
      <LatestArticles />

      {/* Footer nên nằm trong cùng 1 div */}
      <Footer />
    </div>
  );
}
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
