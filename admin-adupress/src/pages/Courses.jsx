// src/components/Courses.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
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
import axios from "axios";
import CourseDetail from "./courses/CourseDetail";

const Courses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // Style mặc định cho tất cả các TableCell
  const commonCellSx = {
    fontWeight: 700,
  };

  const fetchCourses = async (page = 0, limit = 5) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/courses?page=${page + 1}&limit=${limit}`
      );
      setCourses(res.data.courses);
      setTotal(res.data.pagination.total);
      setLoading(false);
    } catch (err) {
      console.error("❌ Lỗi fetch courses:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page, pageSize);
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        fetchCourses(page, pageSize);
      } catch (err) {
        console.error("❌ Lỗi xóa khóa học:", err);
      }
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        p: isMobile ? 1 : 3,
        
      }}
    >
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
       <Typography
  variant={isMobile ? "h6" : "h5"}
  sx={{ fontWeight: "bold", color: "#FB8C00" }}
>
  Course Management
</Typography>
<Button
  variant="contained"
  sx={{
    backgroundColor: "#FB8C00",
    "&:hover": { backgroundColor: "#FF9800" },
  }}
  onClick={() => setOpenDialog(true)}
>
  Create New Course
</Button>
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
  <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>
    No.
  </TableCell>
  <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>
    Course Name
  </TableCell>
  {!isMobile && (
    <>
      <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>
        Author
      </TableCell>
      <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>
        Price
      </TableCell>
      <TableCell
        sx={{
          ...commonCellSx,
          color: "#FB8C00",
          maxWidth: "250px",
        }}
      >
        Description
      </TableCell>
    </>
  )}
  <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>
    Actions
  </TableCell>
</TableRow>

              </TableHead>

              <TableBody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <TableRow
                      key={course._id}
                      sx={{
                        "&:hover": { backgroundColor: "rgba(251,140,0,0.05)" },
                      }}
                    >
                      <TableCell align="center" sx={commonCellSx}>
                        {page * pageSize + index + 1}
                      </TableCell>

                      <TableCell sx={commonCellSx}>{course.title}</TableCell>

                      {!isMobile && (
                        <>
                          <TableCell sx={commonCellSx}>{course.instructor}</TableCell>

                          <TableCell align="center" sx={commonCellSx}>
                            {course.originalPrice && course.originalPrice > course.price ? (
                              <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography
                                  sx={{
                                    fontSize: "0.95rem",
                                    textDecoration: "line-through",
                                    color: "text.secondary",
                                    fontWeight: 700,
                                  }}
                                >
                                  ${course.originalPrice.toLocaleString()}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                    color: "error.main",
                                  }}
                                >
                                  ${course.price.toLocaleString()}
                                </Typography>
                              </Box>
                            ) : course.price === 0 ? (
                              <Typography
                                sx={{
                                  fontSize: "0.95rem",
                                  fontWeight: 700,
                                  color: "success.main",
                                }}
                              >
                                Free
                              </Typography>
                            ) : (
                              <Typography
                                sx={{
                                  fontSize: "0.95rem",
                                  fontWeight: 700,
                                  color: "text.primary",
                                }}
                              >
                                ${course.price?.toLocaleString()}
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell
                            sx={{
                              maxWidth: "250px",
                              whiteSpace: "normal",
                              fontStyle: "italic", // 👈 override in nghiêng
                            }}
                          >
                            {course.description}
                          </TableCell>
                        </>
                      )}

                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton size="small" color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(course._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 3 : 6} align="center">
                      Không có khóa học nào
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
          />
        </>
      )}

      {/* Drawer tạo khóa học */}
      <CourseDetail
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSaved={() => fetchCourses(page, pageSize)} // refresh bảng sau khi lưu
      />
    </Box>
  );
};

export default Courses;
