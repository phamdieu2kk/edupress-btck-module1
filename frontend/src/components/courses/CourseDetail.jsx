import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Tabs, Tab, CircularProgress, Grid, useTheme } from "@mui/material";
import axios from "axios";

import Breadcrumbs from "../Breadcrumbs";
import CourseHeroSection from "@/components/courses/CourseHeroSection";
import CourseCard from "@/components/courses/CourseCard";
import Overview from "./CourseDetailTabs/Overview";
import CurriculumTab from "./CourseDetailTabs/Curriculum";
import Instructor from "./CourseDetailTabs/Instructor";
import FAQs from "./CourseDetailTabs/FAQs";
import Reviews from "./CourseDetailTabs/Reviews";
import Footer from "../../pages/Footer";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-tabpanel-${index}`}
      aria-labelledby={`full-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-tab-${index}`,
    "aria-controls": `full-tabpanel-${index}`,
  };
}

const CourseDetail = () => {
  const theme = useTheme();
  const { id } = useParams(); // ✅ lấy _id từ URL
  const [value, setValue] = useState(0);
  const [course, setCourse] = useState(null);
  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (_, newValue) => setValue(newValue);

  useEffect(() => {
  const fetchCourseAndOthers = async () => {
    try {
      // Fetch chi tiết khóa học
      const resCourse = await axios.get(`http://localhost:5000/api/courses/${id}`);
      setCourse(resCourse.data);

      // Fetch tất cả khóa học khác
      const resAll = await axios.get("http://localhost:5000/api/courses");

      // Lấy array an toàn
      let allCourses = [];
      if (Array.isArray(resAll.data)) {
        allCourses = resAll.data;
      } else if (Array.isArray(resAll.data.data)) {
        allCourses = resAll.data.data;
      } else if (Array.isArray(resAll.data.courses)) {
        allCourses = resAll.data.courses;
      }

      const others = allCourses.filter(c => c._id !== id);
      setOtherCourses(others);

    } catch (err) {
      console.error(err);
      setError("Không thể tải dữ liệu khóa học");
    } finally {
      setLoading(false);
    }
  };

  fetchCourseAndOthers();
}, [id]);


  if (loading)
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  if (!course)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Course not found.</Typography>
      </Container>
    );

  const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: course.title },
  ];

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ my: 4 }}>
          <CourseHeroSection course={course} />
        </Box>

        {/* Tabs Layout */}
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="course detail tabs"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Curriculum" {...a11yProps(1)} />
            <Tab label="Instructor" {...a11yProps(2)} />
            <Tab label="Reviews" {...a11yProps(3)} />
            <Tab label="FAQs" {...a11yProps(4)} />
          </Tabs>

          <TabPanel value={value} index={0} dir={theme.direction}>
            <Overview course={course} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CurriculumTab course={course} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Instructor instructor={course.instructor} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Reviews courseId={course._id} />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <FAQs courseId={course._id} />
          </TabPanel>
        </Box>

        {/* Other Courses */}
        {otherCourses.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Other Courses
            </Typography>
            {/* <Grid container spacing={3}>
              {otherCourses.map(c => (
                <Grid item xs={12} sm={6} md={4} key={c._id}>
                  <CourseCard course={c} />
                </Grid>
              ))}
            </Grid> */}
          </Box>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default CourseDetail;
