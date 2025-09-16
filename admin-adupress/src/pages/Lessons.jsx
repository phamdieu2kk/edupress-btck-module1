// // src/pages/lessons/Lessons.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Button,
//   CircularProgress,
//   Stack,
//   Card,
//   CardContent,
//   CardActions,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   IconButton,
//   Chip,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Pagination from "@mui/material/Pagination";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axios from "axios";
// import LessonDetail from "../components/lessons/LessonDetail";

// // Orange theme for Pagination
// const theme = createTheme({
//   palette: {
//     primary: { main: "#FB8C00" },
//   },
// });

// const Lessons = ({ role = "Admin" }) => {
//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const location = useLocation();

//   const [lessons, setLessons] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [courseName, setCourseName] = useState(location.state?.courseName || "");
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const [lessonPage, setLessonPage] = useState(0);
//   const [lessonRowsPerPage, setLessonRowsPerPage] = useState(10);
//   const [lessonTotal, setLessonTotal] = useState(0);

//   const [coursePage, setCoursePage] = useState(0);
//   const [courseRowsPerPage, setCourseRowsPerPage] = useState(6);
//   const [courseTotal, setCourseTotal] = useState(0);

//   // ===== FETCH DATA =====
//   const fetchCourseName = async () => {
//     if (!courseId) return;
//     try {
//       const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
//       const course = res.data;
//       setCourseName(course?.title || "");
//       setCourses([course]);
//     } catch (err) {
//       console.error("❌ Error fetching course name:", err);
//       setSnackbar({ open: true, message: "Unable to load course information", severity: "error" });
//     }
//   };

//   const fetchLessons = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/lessons", {
//         params: { page: lessonPage + 1, limit: lessonRowsPerPage, courseId: courseId || undefined },
//       });
//       setLessons(res.data.lessons || []);
//       setLessonTotal(res.data.pagination?.total || 0);
//     } catch (err) {
//       console.error("❌ Error fetching lessons:", err);
//       setSnackbar({ open: true, message: "Unable to load lessons", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllLessons = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/lessons", {
//         params: { page: lessonPage + 1, limit: lessonRowsPerPage, populate: "course" },
//       });
//       setLessons(res.data.lessons || []);
//       setLessonTotal(res.data.pagination?.total || 0);
//     } catch (err) {
//       console.error("❌ Error fetching all lessons:", err);
//       setSnackbar({ open: true, message: "Unable to load lessons", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/courses", {
//         params: { page: coursePage + 1, limit: courseRowsPerPage, populate: "lessons" },
//       });
//       setCourses(res.data.courses || []);
//       setCourseTotal(res.data.pagination?.total || 0);
//     } catch (err) {
//       console.error("❌ Error fetching courses:", err);
//       setSnackbar({ open: true, message: "Unable to load courses", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (courseId) {
//       fetchCourseName();
//       fetchLessons();
//     } else {
//       fetchCourses();
//       fetchAllLessons();
//     }
//   }, [lessonPage, lessonRowsPerPage, coursePage, courseRowsPerPage, courseId]);

//   // ===== HANDLERS =====
//   const handleAddLesson = () => navigate(`/admin/lessons/create/${courseId || "0"}`);
//   const handleEditLesson = (lessonId) => navigate(`/admin/lessons/edit/${lessonId}/${courseId || "0"}`);
//   const handleDeleteLesson = async (lessonId) => {
//     if (!window.confirm("Delete this lesson?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`);
//       setLessons((prev) => prev.filter((l) => l._id !== lessonId));
//       setSnackbar({ open: true, message: "Lesson deleted successfully", severity: "success" });
//       fetchLessons();
//       if (!courseId) fetchAllLessons();
//     } catch (err) {
//       console.error("❌ Error deleting lesson:", err);
//       setSnackbar({ open: true, message: "Failed to delete lesson", severity: "error" });
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box p={{ xs: 2.5, md: 4 }}>
//         {/* HEADER */}
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           alignItems="center"
//           mb={3}
//           spacing={1}
//         >
//           <Typography variant="h5" sx={{ fontWeight: 700, color: "orange" }}>
//             {courseId ? `Course: ${courseName || "Loading..."}` : "Lesson Management"}
//           </Typography>

//           {role !== "Customer" && courseId && (
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddLesson}
//               sx={{
//                 bgcolor: "orange",
//                 color: "white",
//                 fontWeight: 600,
//                 borderRadius: 2,
//                 boxShadow: 2,
//                 fontSize: "1rem",
//                 px: 3,
//                 py: 1.2,
//                 "&:hover": { bgcolor: "darkorange" },
//               }}
//             >
//               CREATE NEW LESSON
//             </Button>
//           )}
//         </Stack>

//         {/* CONTENT */}
//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={5}>
//             <CircularProgress size={50} />
//           </Box>
//         ) : courseId ? (
//           <>
//             {/* Lessons of current course */}
//             <Box mb={3}>
//               <LessonDetail
//                 lessons={lessons}
//                 role={role}
//                 onEdit={handleEditLesson}
//                 onDelete={handleDeleteLesson}
//               />
//             </Box>

//             {lessonTotal > 0 && (
//               <Stack spacing={2.5} alignItems="center" mt={3}>
//                 <Pagination
//                   count={Math.ceil(lessonTotal / lessonRowsPerPage)}
//                   page={lessonPage + 1}
//                   onChange={(e, value) => setLessonPage(value - 1)}
//                   color="primary"
//                   siblingCount={1}
//                   boundaryCount={1}
//                   showFirstButton
//                   showLastButton
//                   size="medium"
//                 />
//               </Stack>
//             )}
//           </>
//         ) : (
//           <>
//             {/* ===== COURSES LIST ===== */}
//             <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={3}>
//               {courses.length === 0 ? (
//                 <Typography variant="body1">No courses available.</Typography>
//               ) : (
//                 courses.map((c) => (
//                   <Card
//                     key={c._id}
//                     sx={{
//                       borderRadius: 3,
//                       boxShadow: 3,
//                       transition: "0.3s",
//                       "&:hover": { boxShadow: 6 },
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <CardContent sx={{ p: 2.5 }}>
//                       <Typography variant="h6" fontWeight={700} color="orange" gutterBottom>
//                         {c.title}
//                       </Typography>
//                       <Divider sx={{ my: 1.5 }} />

//                       {Array.isArray(c.lessons) && c.lessons.length > 0 ? (
//                         <Stack spacing={1.5}>
//                           {c.lessons.map((l) => (
//                             <Paper key={l._id} sx={{ p: 1.5, borderRadius: 2, bgcolor: "grey.50" }}>
//                               <Typography variant="body2" fontWeight={600}>
//                                 {l.title || "Untitled lesson"}
//                               </Typography>
//                             </Paper>
//                           ))}
//                         </Stack>
//                       ) : (
//                         <Typography variant="body2" color="text.secondary">
//                           No lessons available.
//                         </Typography>
//                       )}
//                     </CardContent>

//                     <CardActions sx={{ justifyContent: "flex-end", pr: 2.5, pb: 2.5 }}>
//                       <Button
//                         variant="contained"
//                         size="small"
//                         sx={{ borderRadius: 2, fontSize: "0.95rem", px: 2.5 }}
//                         onClick={() =>
//                           navigate(`/admin/lessons/${c._id}`, { state: { courseName: c.title } })
//                         }
//                       >
//                         View All
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 ))
//               )}
//             </Box>

//             {courseTotal > 0 && (
//               <Stack spacing={2.5} alignItems="center" mt={4}>
//                 <Pagination
//                   count={Math.ceil(courseTotal / courseRowsPerPage)}
//                   page={coursePage + 1}
//                   onChange={(e, value) => setCoursePage(value - 1)}
//                   color="primary"
//                   siblingCount={1}
//                   boundaryCount={1}
//                   showFirstButton
//                   showLastButton
//                   size="medium"
//                 />
//               </Stack>
//             )}
//           </>
//         )}

//         {/* Snackbar */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Lessons;

// src/pages/lessons/Lessons.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  CardActions,
  Divider,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosClient from "../api/axiosClient";
import LessonDetail from "../components/lessons/LessonDetail";

// Orange theme for Pagination
const theme = createTheme({
  palette: {
    primary: { main: "#FB8C00" },
  },
});

const Lessons = ({ role = "Admin" }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();

  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState(location.state?.courseName || "");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [lessonPage, setLessonPage] = useState(0);
  const [lessonRowsPerPage, setLessonRowsPerPage] = useState(10);
  const [lessonTotal, setLessonTotal] = useState(0);

  const [coursePage, setCoursePage] = useState(0);
  const [courseRowsPerPage, setCourseRowsPerPage] = useState(6);
  const [courseTotal, setCourseTotal] = useState(0);

  // ===== FETCH DATA =====
  const fetchCourseName = async () => {
    if (!courseId) return;
    try {
      const res = await axiosClient.get(`/courses/${courseId}`);
      const course = res.data;
      setCourseName(course?.title || "");
      setCourses([course]);
    } catch (err) {
      console.error("❌ Error fetching course name:", err);
      setSnackbar({ open: true, message: "Unable to load course information", severity: "error" });
    }
  };

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/lessons", {
        params: { page: lessonPage + 1, limit: lessonRowsPerPage, courseId: courseId || undefined },
      });
      setLessons(res.data.lessons || []);
      setLessonTotal(res.data.pagination?.total || 0);
    } catch (err) {
      console.error("❌ Error fetching lessons:", err);
      setSnackbar({ open: true, message: "Unable to load lessons", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllLessons = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/lessons", {
        params: { page: lessonPage + 1, limit: lessonRowsPerPage, populate: "course" },
      });
      setLessons(res.data.lessons || []);
      setLessonTotal(res.data.pagination?.total || 0);
    } catch (err) {
      console.error("❌ Error fetching all lessons:", err);
      setSnackbar({ open: true, message: "Unable to load lessons", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/courses", {
        params: { page: coursePage + 1, limit: courseRowsPerPage, populate: "lessons" },
      });
      setCourses(res.data.courses || []);
      setCourseTotal(res.data.pagination?.total || 0);
    } catch (err) {
      console.error("❌ Error fetching courses:", err);
      setSnackbar({ open: true, message: "Unable to load courses", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseName();
      fetchLessons();
    } else {
      fetchCourses();
      fetchAllLessons();
    }
  }, [lessonPage, lessonRowsPerPage, coursePage, courseRowsPerPage, courseId]);

  // ===== HANDLERS =====
  const handleAddLesson = () => navigate(`/admin/lessons/create/${courseId || "0"}`);
  const handleEditLesson = (lessonId) => navigate(`/admin/lessons/edit/${lessonId}/${courseId || "0"}`);
  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await axiosClient.delete(`/lessons/${lessonId}`);
      setLessons((prev) => prev.filter((l) => l._id !== lessonId));
      setSnackbar({ open: true, message: "Lesson deleted successfully", severity: "success" });
      fetchLessons();
      if (!courseId) fetchAllLessons();
    } catch (err) {
      console.error("❌ Error deleting lesson:", err);
      setSnackbar({ open: true, message: "Failed to delete lesson", severity: "error" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={{ xs: 2.5, md: 4 }}>
        {/* HEADER */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          spacing={1}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "orange" }}>
            {courseId ? `Course: ${courseName || "Loading..."}` : "Lesson Management"}
          </Typography>

          {role !== "Customer" && courseId && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddLesson}
              sx={{
                bgcolor: "orange",
                color: "white",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: 2,
                fontSize: "1rem",
                px: 3,
                py: 1.2,
                "&:hover": { bgcolor: "darkorange" },
              }}
            >
              CREATE NEW LESSON
            </Button>
          )}
        </Stack>

        {/* CONTENT */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress size={50} />
          </Box>
        ) : courseId ? (
          <>
            {/* Lessons of current course */}
            <Box mb={3}>
              <LessonDetail
                lessons={lessons}
                role={role}
                onEdit={handleEditLesson}
                onDelete={handleDeleteLesson}
              />
            </Box>

            {lessonTotal > 0 && (
              <Stack spacing={2.5} alignItems="center" mt={3}>
                <Pagination
                  count={Math.ceil(lessonTotal / lessonRowsPerPage)}
                  page={lessonPage + 1}
                  onChange={(e, value) => setLessonPage(value - 1)}
                  color="primary"
                  siblingCount={1}
                  boundaryCount={1}
                  showFirstButton
                  showLastButton
                  size="medium"
                />
              </Stack>
            )}
          </>
        ) : (
          <>
            {/* ===== COURSES LIST ===== */}
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={3}>
              {courses.length === 0 ? (
                <Typography variant="body1">No courses available.</Typography>
              ) : (
                courses.map((c) => (
                  <Card
                    key={c._id}
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: "0.3s",
                      "&:hover": { boxShadow: 6 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="h6" fontWeight={700} color="orange" gutterBottom>
                        {c.title}
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />

                      {Array.isArray(c.lessons) && c.lessons.length > 0 ? (
                        <Stack spacing={1.5}>
                          {c.lessons.map((l) => (
                            <Paper key={l._id} sx={{ p: 1.5, borderRadius: 2, bgcolor: "grey.50" }}>
                              <Typography variant="body2" fontWeight={600}>
                                {l.title || "Untitled lesson"}
                              </Typography>
                            </Paper>
                          ))}
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No lessons available.
                        </Typography>
                      )}
                    </CardContent>

                    <CardActions sx={{ justifyContent: "flex-end", pr: 2.5, pb: 2.5 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ borderRadius: 2, fontSize: "0.95rem", px: 2.5 }}
                        onClick={() =>
                          navigate(`/admin/lessons/${c._id}`, { state: { courseName: c.title } })
                        }
                      >
                        View All
                      </Button>
                    </CardActions>
                  </Card>
                ))
              )}
            </Box>

            {courseTotal > 0 && (
              <Stack spacing={2.5} alignItems="center" mt={4}>
                <Pagination
                  count={Math.ceil(courseTotal / courseRowsPerPage)}
                  page={coursePage + 1}
                  onChange={(e, value) => setCoursePage(value - 1)}
                  color="primary"
                  siblingCount={1}
                  boundaryCount={1}
                  showFirstButton
                  showLastButton
                  size="medium"
                />
              </Stack>
            )}
          </>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Lessons;
