// import React, { useEffect, useState } from 'react';
// import { Box, Container, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import BrushIcon from '@mui/icons-material/Brush';
// import CodeIcon from '@mui/icons-material/Code';
// import ChatIcon from '@mui/icons-material/Chat';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import CampaignIcon from '@mui/icons-material/Campaign';
// import CreateIcon from '@mui/icons-material/Create';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import ScienceIcon from '@mui/icons-material/Science';
// import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
// import axios from 'axios';

// // Chỉ map các category thực tế có trong DB
// const iconMap = {
//   "Art & Design": <BrushIcon fontSize="large" />,
//   Development: <CodeIcon fontSize="large" />,
//   Communication: <ChatIcon fontSize="large" />,
//   Videography: <VideocamIcon fontSize="large" />,
//   Photography: <PhotoCameraIcon fontSize="large" />,
//   Marketing: <CampaignIcon fontSize="large" />,
//   "Content Writing": <CreateIcon fontSize="large" />,
//   Finance: <AttachMoneyIcon fontSize="large" />,
//   Science: <ScienceIcon fontSize="large" />,
//   Network: <NetworkWifiIcon fontSize="large" />,
// };
 
// const PopularCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const theme = useTheme();
//   const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/courses?limit=50');
//       const courses = Array.isArray(res.data.courses) ? res.data.courses : [];

//       // Đếm số lượng khóa học theo category
//       const countObj = {};
//       courses.forEach(course => {
//         if (course.category) {
//           countObj[course.category] = (countObj[course.category] || 0) + 1;
//         }
//       });

//       // Chỉ giữ category có icon
//       const catArray = Object.keys(countObj)
//         .filter(cat => iconMap[cat])
//         .map(cat => ({
//           title: cat,
//           count: countObj[cat],
//           icon: iconMap[cat],
//         }));

//       setCategories(catArray);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       setCategories([]);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleCategoryClick = category => {
//     navigate(`/courses?category=${encodeURIComponent(category)}`);
//   };

//   return (
//     <Box sx={{ bgcolor: '#fafafa', py: 6 }}>
//       <Container>
//          <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: { xs: "flex-start", sm: "center" },
//         flexDirection: { xs: "column", sm: "row" },
//         gap: 2,
//         mb: 4,
//       }}
//     >
//       <Box>
//         <Typography variant="h4" fontWeight={700} gutterBottom>
//           Top Categories
//         </Typography>
//         <Typography variant="subtitle1" sx={{ color: '#6c757d', fontSize: '1.1rem' }}>
//           Explore our most popular learning topics
//         </Typography>
//       </Box>

//       <Button
//                   variant="outlined"
//                   size="large"
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 500,
//                     borderRadius: 2,
//                     px: 3,
//                     py: 1,
//                     color: "primary.main",
//                     borderColor: "primary.main",
//                     "&:hover": { backgroundColor: "primary.main", color: "#fff" },
//                     mt: { xs: 2, sm: 0 }, // margin top khi trên mobile
//                   }}
//                   onClick={() => navigate("/courses")}
//                 >
//                   All Courses
//                 </Button>
//     </Box>

//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', md: 'repeat(5, 1fr)' },
//             gap: { xs: 2, md: 3 },
//           }}
//         >
//           {categories.map((cat, index) => (
//             <Button
//               key={index}
//               variant="outlined"
//               onClick={() => handleCategoryClick(cat.title)}
//               sx={{
//                 textTransform: 'none',
//                 borderRadius: 3,
//                 display: 'flex',
//                 flexDirection: { xs: 'row', md: 'column' },
//                 alignItems: 'center',
//                 justifyContent: { xs: 'flex-start', md: 'center' },
//                 py: { xs: 2, md: 3 },
//                 px: { xs: 2, md: 1 },
//                 '&:hover': { transform: 'translateY(-4px)', boxShadow: 3, backgroundColor: '#f5f5f5' },
//               }}
//             >
//               <Box sx={{ color: '#ed6910ff', mr: { xs: 2, md: 0 }, mb: { xs: 0, md: 1 } }}>
//                 {cat.icon}
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'center' } }}>
//                 <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '1.1rem', color: '#333' }}>
//                   {cat.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#666' }}>
//                   {cat.count} course{cat.count !== 1 ? 's' : ''}
//                 </Typography>
//               </Box>
//             </Button>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default PopularCategories;


// src/components/PopularCategories.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BrushIcon from "@mui/icons-material/Brush";
import CodeIcon from "@mui/icons-material/Code";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CampaignIcon from "@mui/icons-material/Campaign";
import CreateIcon from "@mui/icons-material/Create";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScienceIcon from "@mui/icons-material/Science";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";

import axiosClient from "../api/axiosClient";

// Chỉ map các category thực tế có trong DB
const iconMap = {
  "Art & Design": <BrushIcon fontSize="large" />,
  Development: <CodeIcon fontSize="large" />,
  Communication: <ChatIcon fontSize="large" />,
  Videography: <VideocamIcon fontSize="large" />,
  Photography: <PhotoCameraIcon fontSize="large" />,
  Marketing: <CampaignIcon fontSize="large" />,
  "Content Writing": <CreateIcon fontSize="large" />,
  Finance: <AttachMoneyIcon fontSize="large" />,
  Science: <ScienceIcon fontSize="large" />,
  Network: <NetworkWifiIcon fontSize="large" />,
};

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axiosClient.get("/courses", { params: { limit: 50 } });
      const courses = Array.isArray(res.data.courses) ? res.data.courses : [];

      // Đếm số lượng khóa học theo category
      const countObj = {};
      courses.forEach((course) => {
        if (course.category) {
          countObj[course.category] = (countObj[course.category] || 0) + 1;
        }
      });

      // Chỉ giữ category có icon
      const catArray = Object.keys(countObj)
        .filter((cat) => iconMap[cat])
        .map((cat) => ({
          title: cat,
          count: countObj[cat],
          icon: iconMap[cat],
        }));

      setCategories(catArray);

      console.log("PopularCategories -> BaseURL:", axiosClient.defaults.baseURL);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/courses?category=${encodeURIComponent(category)}`);
  };

  return (
    <Box sx={{ bgcolor: "#fafafa", py: 6 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Top Categories
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#6c757d", fontSize: "1.1rem" }}
            >
              Explore our most popular learning topics
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              px: 3,
              py: 1,
              color: "primary.main",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#fff",
              },
              mt: { xs: 2, sm: 0 },
            }}
            onClick={() => navigate("/courses")}
          >
            All Courses
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(5, 1fr)" },
            gap: { xs: 2, md: 3 },
          }}
        >
          {categories.map((cat, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleCategoryClick(cat.title)}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: "center",
                justifyContent: { xs: "flex-start", md: "center" },
                py: { xs: 2, md: 3 },
                px: { xs: 2, md: 1 },
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Box
                sx={{
                  color: "#ed6910ff",
                  mr: { xs: 2, md: 0 },
                  mb: { xs: 0, md: 1 },
                }}
              >
                {cat.icon}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", md: "center" },
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ fontSize: "1.1rem", color: "#333" }}
                >
                  {cat.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.9rem", color: "#666" }}
                >
                  {cat.count} course{cat.count !== 1 ? "s" : ""}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PopularCategories;
