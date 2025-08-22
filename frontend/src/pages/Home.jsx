// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer.jsx";

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

import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        overflowX: "hidden",
      }}
    >
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Banner (không margin top) */}
      <Box component="section" sx={{ width: "100%" }}>
        <Banner />
      </Box>

      {/* Sections với mt: 2 (16px) */}
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <PopularCategories />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <FeaturedCourses courses={courses} />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <BannerWithTextAndImage />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <StatsSection />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <SkillSection />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <FeatureBanner />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <StudentFeedbacks />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <CallToAction />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <LatestArticles />
      </Container>

      {/* Footer (mt: 4 để thoáng hơn) */}
      <Box component="footer" sx={{ width: "100%", mt: 4 }}>
        <Footer />
      </Box>
    </Box>
  );
}

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
