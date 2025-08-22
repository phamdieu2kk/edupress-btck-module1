// import React, { useState, useEffect } from "react";
// import { Box, Container, Typography, TextField, InputAdornment, ToggleButton, ToggleButtonGroup, Pagination, Stack, CircularProgress } from "@mui/material";
// import GridViewIcon from "@mui/icons-material/GridView";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import SearchIcon from "@mui/icons-material/Search";
// import axios from "axios";
// import CourseCard from "./CourseCard";
// import FilterSidebar from "./FilterSidebar";

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewMode, setViewMode] = useState("grid");
//   const [searchText, setSearchText] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;
//   const [filter, setFilter] = useState({ category: [], instructor: [], price: "All", review: 0, level: "All levels" });

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/courses");
//         setCourses(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Cannot load courses");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const filteredCourses = courses.filter(course => {
//     const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase());
//     const matchesCategory = filter.category.length === 0 || filter.category.includes(course.category);
//     const matchesInstructor = filter.instructor.length === 0 || filter.instructor.includes(course.instructor);
//     const matchesPrice =
//       filter.price === "All" ||
//       (filter.price === "Free" && course.price === 0) ||
//       (filter.price === "Paid" && course.price > 0);
//     const matchesLevel = filter.level === "All levels" || course.level === filter.level;
//     const matchesReview = filter.review === 0 || Math.floor(course.rating || 0) === filter.review;
//     return matchesSearch && matchesCategory && matchesInstructor && matchesPrice && matchesLevel && matchesReview;
//   });

//   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
//   const currentCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>;
//   if (error) return <Typography color="error" sx={{ mt: 4 }}>{error}</Typography>;
//   if (!filteredCourses.length) return <Typography sx={{ mt: 4 }}>No courses found</Typography>;

//   return (
//     <Container sx={{ mt: 4 }}>
//       {/* Topbar */}
//       <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
//         <Typography variant="h4" fontWeight="bold">All Courses</Typography>
//         <Box display="flex" alignItems="center" gap={1.5}>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Search courses..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "25px" } }}
//             InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
//           />
//           <ToggleButtonGroup
//             size="small"
//             value={viewMode}
//             exclusive
//             onChange={(e, newView) => newView && setViewMode(newView)}
//             aria-label="view mode"
//             sx={{ backgroundColor: "#f7f7f7", border: "1px solid #ddd", borderRadius: 6 }}
//           >
//             <ToggleButton value="grid" aria-label="grid view"><GridViewIcon fontSize="small" /></ToggleButton>
//             <ToggleButton value="list" aria-label="list view"><FormatListBulletedIcon fontSize="small" /></ToggleButton>
//           </ToggleButtonGroup>
//         </Box>
//       </Box>

//       {/* Main layout */}
//       <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={3}>
//         <Box flex={1}>
//           {viewMode === "grid" ? (
//             <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={3}>
//               {currentCourses.map((course) => <CourseCard key={course._id} course={course} variant="grid" />)}
//             </Box>
//           ) : (
//             <Stack spacing={3}>
//               {currentCourses.map((course) => <CourseCard key={course._id} course={course} variant="list" />)}
//             </Stack>
//           )}
//           {totalPages > 1 && (
//             <Box mt={5} display="flex" justifyContent="center">
//               <Pagination count={totalPages} page={currentPage} onChange={(e, val) => setCurrentPage(val)} color="primary" />
//             </Box>
//           )}
//         </Box>

//         {/* Sidebar */}
//         <Box sx={{ width: { xs: "100%", lg: 300 } }}>
//           <FilterSidebar filter={filter} onFilterChange={(key, value) => setFilter({ ...filter, [key]: value })} />
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default CoursePage;
