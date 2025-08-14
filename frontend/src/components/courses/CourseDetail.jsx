import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";

import Overview from "./CourseDetailTabs/Overview";
import CurriculumTab from "./CourseDetailTabs/Curriculum";
import CourseHeroSection from "@/components/courses/CourseHeroSection";
import Breadcrumbs from "../Breadcrumbs";
import courseList from "@/data/mock-data";
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
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => setValue(newValue);

  const { id } = useParams();
  const course = courseList.find((item) => item.id.toString() === id);

  if (!course) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Course not found.
        </Typography>
      </Container>
    );
  }

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

          {/* Tab content panels */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Overview course={course} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CurriculumTab course={course} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Instructor instructor={course.instructor} />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <Typography>
              <FAQs/>
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Typography>
              <Reviews/>
            </Typography>
          </TabPanel>
          
        </Box>
      </Container>
       <Footer />
    </>
  );
};

export default CourseDetail;
