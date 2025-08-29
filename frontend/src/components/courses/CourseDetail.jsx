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
import SidebarCourseCard from "@/components/courses/SidebarCourseCard";
import Footer from "../../pages/Footer";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: { xs: 0, md: 3 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return { id: `full-tab-${index}`, "aria-controls": `full-tabpanel-${index}` };
}

const CourseDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (_, newValue) => setValue(newValue);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          params: { populate: "lessons" },
        });
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu khóa học");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
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

      {/* Hero Section with Desktop Sidebar Overlay */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <CourseHeroSection course={course} />

        {/* Sidebar overlay for desktop only */}
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: { xs: 0, md: 120 },
            right: { xs: "auto", md: 180 },
            width: { xs: "100%", md: 340 },
            mx: { xs: 0, md: 0 },
            zIndex: 10,
            display: { xs: "none", md: "block" },
          }}
        >
          <SidebarCourseCard course={course} />
        </Box>
      </Box>

      {/* Main Content: Tabs and Sections */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Mobile Sidebar (visible only on small screens) */}
          <Box
            sx={{
              order: { xs: 1, md: 2 },
              display: { xs: "block", md: "none" },
              width: "100%",
              mt: { xs: 3, sm: 4 },
            }}
          >
            <SidebarCourseCard course={course} />
          </Box>

          {/* Tab Container */}
       <Box
  sx={{
    flex: { xs: 1, md: 2.5 },
    order: { xs: 2, md: 1 },
    width: "100%",
    maxWidth: { xs: "100%", md: "calc(100% - 360px)" }, // chừa space cho sidebar
    mr: { xs: 0, md: 4 }, // desktop: cách sidebar 16px (4 * 4px)
   
    
  }}
>
  <Tabs
  value={value}
  onChange={handleChange}
  indicatorColor="primary"
  textColor="primary"
  variant="scrollable"
  scrollButtons="auto"
  sx={{ borderBottom: 1, borderColor: "divider" }}
>
  <Tab label="Overview" {...a11yProps(0)} />
  <Tab label="Curriculum" {...a11yProps(1)} />
  <Tab label="Instructor" {...a11yProps(2)} />
  <Tab label="FAQs" {...a11yProps(3)} />       {/* Đổi FAQs sang tab 4 */}
  <Tab label="Reviews" {...a11yProps(4)} />    {/* Reviews sang tab 5 */}
</Tabs>

<TabPanel value={value} index={0} dir={theme.direction}>
  <Overview course={course} />
</TabPanel>
<TabPanel value={value} index={1} dir={theme.direction}>
  <CurriculumTab courseId={course._id} />
</TabPanel>
<TabPanel value={value} index={2} dir={theme.direction}>
  <Instructor instructor={course.instructor} />
</TabPanel>
<TabPanel value={value} index={3} dir={theme.direction}>
  <FAQs courseId={course._id} />              {/* Tab 4 = FAQs */}
</TabPanel>
<TabPanel value={value} index={4} dir={theme.direction}>
  <Reviews courseId={course._id} />           {/* Tab 5 = Reviews */}
</TabPanel>

</Box>


        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default CourseDetail;