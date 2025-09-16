// // src/pages/courses/Courses.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   CircularProgress,
//   Paper,
//   TablePagination,
//   useTheme,
//   useMediaQuery,
//   Stack,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import CourseDetail from "./CourseDetail";
// import { useNavigate } from "react-router-dom";

// const Courses = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();

//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(8);
//   const [total, setTotal] = useState(0);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [selectedCourses, setSelectedCourses] = useState([]);

//   const commonCellSx = { fontWeight: 600, fontSize: "0.875rem" };

//   // Format price to VND
//   const formatVND = (value) => {
//     if (!value) return "0₫";
//     return value.toLocaleString("vi-VN") + "₫";
//   };

//   const fetchCourses = async (page = 0, limit = 5) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:5000/api/courses?page=${page + 1}&limit=${limit}`
//       );
//       setCourses(res.data.courses);
//       setTotal(res.data.pagination.total);
//       setLoading(false);
//     } catch (err) {
//       console.error("❌ Error fetching courses:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses(page, pageSize);
//   }, [page, pageSize]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/courses/${id}`);
//         fetchCourses(page, pageSize);
//         setSelectedCourses(prev => prev.filter(sid => sid !== id));
//       } catch (err) {
//         console.error("❌ Error deleting course:", err);
//       }
//     }
//   };

//   const handleDeleteSelected = async () => {
//     if (selectedCourses.length === 0) return;
//     if (window.confirm(`Are you sure you want to delete ${selectedCourses.length} courses?`)) {
//       try {
//         await Promise.all(
//           selectedCourses.map(id => axios.delete(`http://localhost:5000/api/courses/${id}`))
//         );
//         setSelectedCourses([]);
//         fetchCourses(page, pageSize);
//       } catch (err) {
//         console.error("❌ Error deleting multiple courses:", err);
//       }
//     }
//   };

//   const handleEdit = (course) => {
//     setEditingCourse(course);
//     setOpenDialog(true);
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setPageSize(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           justifyContent: "space-between",
//           alignItems: isMobile ? "flex-start" : "center",
//           mb: 2,
//           gap: 1,
//         }}
//       >
//         <Typography
//           variant={isMobile ? "body1" : "h6"}
//           sx={{ fontWeight: "bold", color: "#FB8C00" }}
//         >
//           Course Management
//         </Typography>
//         <Stack direction="row" spacing={1}>
//           {selectedCourses.length > 0 && (
//             <Button
//               variant="text"
//               sx={{ fontSize: "0.8rem", minWidth: "auto", padding: 0 }}
//               onClick={handleDeleteSelected}
//             >
//               {/* Delete Icon SVG */}
//               <svg
//                 width="22"
//                 height="22"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.25 2H10.5V1.5C10.5 0.672906 9.82709 0 9 0H7C6.17291 0 5.5 0.672906 5.5 1.5V2H2.75C2.06075 2 1.5 2.56075 1.5 3.25V5C1.5 5.27612 1.72387 5.5 2 5.5H2.27325L2.70522 14.5713C2.74338 15.3725 3.4015 16 4.2035 16H11.7965C12.5985 16 13.2567 15.3725 13.2948 14.5713L13.7268 5.5H14C14.2761 5.5 14.5 5.27612 14.5 5V3.25C14.5 2.56075 13.9392 2 13.25 2ZM6.5 1.5C6.5 1.22431 6.72431 1 7 1H9C9.27569 1 9.5 1.22431 9.5 1.5V2H6.5V1.5ZM2.5 3.25C2.5 3.11216 2.61216 3 2.75 3H13.25C13.3878 3 13.5 3.11216 13.5 3.25V4.5C13.3459 4.5 3.13853 4.5 2.5 4.5V3.25ZM12.2959 14.5238C12.2832 14.7908 12.0638 15 11.7965 15H4.2035C3.93616 15 3.71678 14.7908 3.70409 14.5238L3.27437 5.5H12.7256L12.2959 14.5238Z"
//                   fill="#333333"
//                 />
//                 <path
//                   d="M8 14C8.27613 14 8.5 13.7761 8.5 13.5V7C8.5 6.72387 8.27613 6.5 8 6.5C7.72387 6.5 7.5 6.72387 7.5 7V13.5C7.5 13.7761 7.72384 14 8 14Z"
//                   fill="#333333"
//                 />
//                 <path
//                   d="M10.5 14C10.7761 14 11 13.7761 11 13.5V7C11 6.72387 10.7761 6.5 10.5 6.5C10.2239 6.5 10 6.72387 10 7V13.5C10 13.7761 10.2238 14 10.5 14Z"
//                   fill="#333333"
//                 />
//                 <path
//                   d="M5.5 14C5.77613 14 6 13.7761 6 13.5V7C6 6.72387 5.77613 6.5 5.5 6.5C5.22387 6.5 5 6.72387 5 7V13.5C5 13.7761 5.22384 14 5.5 14Z"
//                   fill="#333333"
//                 />
//               </svg>
//             </Button>
//           )}

//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#FB8C00",
//               "&:hover": { backgroundColor: "#FF9800" },
//               fontSize: "0.8rem",
//             }}
//             onClick={() => {
//               setEditingCourse(null);
//               setOpenDialog(true);
//             }}
//           >
//             + Create New Course
//           </Button>
//         </Stack>
//       </Box>

//       {/* Table */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress sx={{ color: "#FB8C00" }} />
//         </Box>
//       ) : (
//         <>
//           <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//             <Table sx={{ minWidth: 650 }}>
//               <TableHead sx={{ bgcolor: "#FFF3E0" }}>
//                 <TableRow>
//                   {/* Select all checkbox */}
//                   <TableCell align="center">
//                     <input
//                       type="checkbox"
//                       checked={selectedCourses.length === courses.length && courses.length > 0}
//                       onChange={(e) => {
//                         if (e.target.checked) setSelectedCourses(courses.map(c => c._id));
//                         else setSelectedCourses([]);
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>No.</TableCell>
//                   <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Course Name</TableCell>
//                   {!isMobile && (
//                     <>
//                       <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Author</TableCell>
//                       <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Price</TableCell>
//                       <TableCell sx={{ ...commonCellSx, color: "#FB8C00", maxWidth: "250px" }}>Description</TableCell>
//                       <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Status</TableCell>
//                     </>
//                   )}
//                   <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {courses.length > 0 ? (
//                   courses.map((course, index) => (
//                     <TableRow key={course._id} sx={{ "&:hover": { backgroundColor: "rgba(251,140,0,0.05)" } }}>
//                       {/* Row checkbox */}
//                       <TableCell align="center">
//                         <input
//                           type="checkbox"
//                           checked={selectedCourses.includes(course._id)}
//                           onChange={(e) => {
//                             if (e.target.checked) setSelectedCourses(prev => [...prev, course._id]);
//                             else setSelectedCourses(prev => prev.filter(id => id !== course._id));
//                           }}
//                         />
//                       </TableCell>

//                       <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.825rem", py: 0.8, px: 1 }}>
//                         {page * pageSize + index + 1}
//                       </TableCell>

//                       <TableCell
//                         sx={{
//                           fontWeight: 600,
//                           fontSize: "0.825rem",
//                           py: 0.8,
//                           px: 1,
//                           cursor: "pointer",
//                           maxWidth: 250,
//                           whiteSpace: "normal",
//                           overflowWrap: "break-word",
//                         }}
//                         onClick={() => navigate(`/admin/lessons/${course._id}`, { state: { courseName: course.title } })}
//                       >
//                         <Stack direction="row" alignItems="center" spacing={1.5}>
//                           <Box
//                             component="img"
//                             src={course?.image && course.image.trim() !== "" ? course.image : "https://dummyimage.com/50x50/cccccc/fff.png&text=No+Img"}
//                             sx={{ width: 45, height: 45, objectFit: "cover", borderRadius: 2, boxShadow: 0.5 }}
//                           />
//                           <Typography
//                             sx={{
//                               color: "#000000ff",
//                               fontWeight: 600,
//                               fontSize: "0.825rem",
//                               wordBreak: "break-word",
//                               cursor: "pointer",
//                               "&:hover": { 
//                                 textDecoration: "underline",
//                                 color: "#FB8C00"
//                               }
//                             }}
//                           >
//                             {course.title}
//                           </Typography>
//                         </Stack>
//                       </TableCell>

//                       {!isMobile && (
//                         <>
//                           <TableCell sx={{ fontWeight: 600, fontSize: "0.825rem", py: 0.8, px: 1 }}>
//                             {course.instructor}
//                           </TableCell>

//                           {/* PRICE in VND */}
//                           <TableCell align="center" sx={commonCellSx}>
//                             {course.price === 0 && course.originalPrice > 0 ? (
//                               <Box display="flex" flexDirection="column" alignItems="center">
//                                 <Typography
//                                   sx={{
//                                     fontSize: "0.8rem",
//                                     textDecoration: "line-through",
//                                     color: "text.secondary",
//                                     fontWeight: 600,
//                                   }}
//                                 >
//                                   {formatVND(course.originalPrice)}
//                                 </Typography>
//                                 <Typography
//                                   sx={{ fontSize: "0.8rem", fontWeight: 600, color: "success.main" }}
//                                 >
//                                   Free
//                                 </Typography>
//                               </Box>
//                             ) : course.price > 0 && course.price < course.originalPrice ? (
//                               <Box display="flex" flexDirection="column" alignItems="center">
//                                 <Typography
//                                   sx={{
//                                     fontSize: "0.8rem",
//                                     textDecoration: "line-through",
//                                     color: "text.secondary",
//                                     fontWeight: 600,
//                                   }}
//                                 >
//                                   {formatVND(course.originalPrice)}
//                                 </Typography>
//                                 <Typography
//                                   sx={{ fontSize: "0.8rem", fontWeight: 600, color: "error.main" }}
//                                 >
//                                   {formatVND(course.price)}
//                                 </Typography>
//                               </Box>
//                             ) : course.price === 0 ? (
//                               <Typography
//                                 sx={{ fontSize: "0.8rem", fontWeight: 600, color: "success.main" }}
//                               >
//                                 Free
//                               </Typography>
//                             ) : (
//                               <Typography
//                                 sx={{ fontSize: "0.8rem", fontWeight: 600, color: "text.primary" }}
//                               >
//                                 {formatVND(course.price)}
//                               </Typography>
//                             )}
//                           </TableCell>

//                           <TableCell sx={{ maxWidth: 150, whiteSpace: "normal", fontStyle: "italic", fontSize: "0.75rem", py: 0.8, px: 1 }}>
//                             {course.description}
//                           </TableCell>

//                           {/* Status */}
//                           <TableCell align="center" sx={{ py: 0.8 }}>
//                             <Button
//                               variant="contained"
//                               sx={{
//                                 backgroundColor: course.status === "active" ? "#4CAF50" : "#F44336",
//                                 color: "#ffffff",
//                                 fontSize: "0.65rem",
//                                 fontWeight: 600,
//                                 padding: "1px 6px",
//                                 width: "auto",
//                                 minWidth: "60px",
//                                 textTransform: "none",
//                                 "&:hover": {
//                                   backgroundColor: course.status === "active" ? "#388E3C" : "#D32F2F",
//                                 },
//                               }}
//                             >
//                               {course.status === "active" ? "Active" : "Inactive"}
//                             </Button>
//                           </TableCell>
//                         </>
//                       )}

//                       {/* Actions */}
//                       <TableCell align="center" sx={{ py: 0.8, px: 1 }}>
//                         <Stack direction="row" spacing={0.5} justifyContent="center">
//                           <IconButton size="small" color="primary" onClick={() => handleEdit(course)}>
//                             <EditIcon sx={{ fontSize: "1rem" }} />
//                           </IconButton>
//                           <IconButton size="small" color="error" onClick={() => handleDelete(course._id)}>
//                             <DeleteIcon sx={{ fontSize: "1rem" }} />
//                           </IconButton>
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={isMobile ? 4 : 8} align="center" sx={{ fontSize: "0.8rem", py: 1 }}>
//                       No courses available
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={total}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={pageSize}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 20, 50]}
//             labelRowsPerPage="Rows per page:"
//           />
//         </>
//       )}

//       {/* Course Detail Dialog */}
//       <CourseDetail
//         open={openDialog}
//         onClose={() => {
//           setOpenDialog(false);
//           setEditingCourse(null);
//         }}
//         onSaved={() => fetchCourses(page, pageSize)}
//         course={editingCourse}
//       />
//     </Box>
//   );
// };

// export default Courses;

// src/pages/courses/Courses.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Paper,
  TablePagination,
  useTheme,
  useMediaQuery,
  Stack,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import CourseDetail from "./CourseDetail";

const Courses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const commonCellSx = { fontWeight: 600, fontSize: "0.875rem" };

  const formatVND = (value) => {
    if (!value) return "0₫";
    return value.toLocaleString("vi-VN") + "₫";
  };

  // ===== FETCH COURSES =====
  const fetchCourses = async (page = 0, limit = 8) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/courses", {
        params: { page: page + 1, limit },
      });
      setCourses(res.data.courses);
      setTotal(res.data.pagination?.total || 0);
    } catch (err) {
      console.error("❌ Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page, pageSize);
  }, [page, pageSize]);

  // ===== DELETE =====
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axiosClient.delete(`/courses/${id}`);
      setSelectedCourses(prev => prev.filter(sid => sid !== id));
      fetchCourses(page, pageSize);
    } catch (err) {
      console.error("❌ Error deleting course:", err);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCourses.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedCourses.length} courses?`)) return;
    try {
      await Promise.all(selectedCourses.map(id => axiosClient.delete(`/courses/${id}`)));
      setSelectedCourses([]);
      fetchCourses(page, pageSize);
    } catch (err) {
      console.error("❌ Error deleting multiple courses:", err);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 2,
          gap: 1,
        }}
      >
        <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: "bold", color: "#FB8C00" }}>
          Course Management
        </Typography>

        <Stack direction="row" spacing={1}>
          {selectedCourses.length > 0 && (
            <Button variant="text" sx={{ fontSize: "0.8rem", minWidth: "auto", padding: 0 }} onClick={handleDeleteSelected}>
              {/* Delete Icon */}
              <DeleteIcon />
            </Button>
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FB8C00",
              "&:hover": { backgroundColor: "#FF9800" },
              fontSize: "0.8rem",
            }}
            onClick={() => {
              setEditingCourse(null);
              setOpenDialog(true);
            }}
          >
            + Create New Course
          </Button>
        </Stack>
      </Box>

      {/* Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "#FB8C00" }} />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "#FFF3E0" }}>
                <TableRow>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={selectedCourses.length === courses.length && courses.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedCourses(courses.map(c => c._id));
                        else setSelectedCourses([]);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>No.</TableCell>
                  <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Course Name</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Author</TableCell>
                      <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Price</TableCell>
                      <TableCell sx={{ ...commonCellSx, color: "#FB8C00", maxWidth: "250px" }}>Description</TableCell>
                      <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Status</TableCell>
                    </>
                  )}
                  <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <TableRow key={course._id} sx={{ "&:hover": { backgroundColor: "rgba(251,140,0,0.05)" } }}>
                      <TableCell align="center">
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course._id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedCourses(prev => [...prev, course._id]);
                            else setSelectedCourses(prev => prev.filter(id => id !== course._id));
                          }}
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.825rem", py: 0.8, px: 1 }}>
                        {page * pageSize + index + 1}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.825rem",
                          py: 0.8,
                          px: 1,
                          cursor: "pointer",
                          maxWidth: 250,
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                        }}
                        onClick={() => navigate(`/admin/lessons/${course._id}`, { state: { courseName: course.title } })}
                      >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Box
                            component="img"
                            src={course?.image?.trim() ? course.image : "https://dummyimage.com/50x50/cccccc/fff.png&text=No+Img"}
                            sx={{ width: 45, height: 45, objectFit: "cover", borderRadius: 2, boxShadow: 0.5 }}
                          />
                          <Typography
                            sx={{
                              color: "#000",
                              fontWeight: 600,
                              fontSize: "0.825rem",
                              wordBreak: "break-word",
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline", color: "#FB8C00" },
                            }}
                          >
                            {course.title}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {!isMobile && (
                        <>
                          <TableCell sx={{ fontWeight: 600, fontSize: "0.825rem", py: 0.8, px: 1 }}>
                            {course.instructor}
                          </TableCell>

                          <TableCell align="center" sx={commonCellSx}>
                            {course.price === 0 ? (
                              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "success.main" }}>Free</Typography>
                            ) : (
                              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "text.primary" }}>
                                {formatVND(course.price)}
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell sx={{ maxWidth: 150, whiteSpace: "normal", fontStyle: "italic", fontSize: "0.75rem", py: 0.8, px: 1 }}>
                            {course.description}
                          </TableCell>

                          <TableCell align="center" sx={{ py: 0.8 }}>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: course.status === "active" ? "#4CAF50" : "#F44336",
                                color: "#fff",
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                padding: "1px 6px",
                                width: "auto",
                                minWidth: "60px",
                                textTransform: "none",
                                "&:hover": { backgroundColor: course.status === "active" ? "#388E3C" : "#D32F2F" },
                              }}
                            >
                              {course.status === "active" ? "Active" : "Inactive"}
                            </Button>
                          </TableCell>
                        </>
                      )}

                      <TableCell align="center" sx={{ py: 0.8, px: 1 }}>
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <IconButton size="small" color="primary" onClick={() => handleEdit(course)}>
                            <EditIcon sx={{ fontSize: "1rem" }} />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(course._id)}>
                            <DeleteIcon sx={{ fontSize: "1rem" }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 4 : 8} align="center" sx={{ fontSize: "0.8rem", py: 1 }}>
                      No courses available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50]}
            labelRowsPerPage="Rows per page:"
          />
        </>
      )}

      <CourseDetail
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingCourse(null);
        }}
        onSaved={() => fetchCourses(page, pageSize)}
        course={editingCourse}
      />
    </Box>
  );
};

export default Courses;