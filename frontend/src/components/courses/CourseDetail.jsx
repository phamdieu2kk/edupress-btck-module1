import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  CircularProgress,
  useTheme,
} from "@mui/material";
import axios from "axios";

import Breadcrumbs from "../Breadcrumbs";
import CourseHeroSection from "@/components/courses/CourseHeroSection";
import Overview from "./CourseDetailTabs/Overview";
import CurriculumTab from "./CourseDetailTabs/Curriculum";
import Instructor from "./CourseDetailTabs/Instructor";
import FAQs from "./CourseDetailTabs/FAQs";
import Reviews from "./CourseDetailTabs/Reviews";
import Footer from "../../pages/Footer";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
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
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (_, newValue) => setValue(newValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Lấy course info
        const resCourse = await axios.get(
          `http://localhost:5000/api/courses/${id}`
        );
        setCourse(resCourse.data);

        // 2. Lấy lessons theo courseId
        const resLessons = await axios.get(
          `http://localhost:5000/api/lessons`,
          { params: { courseId: id } }
        );
        setLessons(resLessons.data || []);
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu khóa học");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <Container
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      >
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
        <Typography>Course not found</Typography>
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

        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
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
            <CurriculumTab lessons={lessons} /> {/* ✅ truyền lessons trực tiếp */}
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
      </Container>

      <Footer />
    </>
  );
};

export default CourseDetail;
