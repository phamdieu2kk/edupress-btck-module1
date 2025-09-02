// src/pages/courses/Courses.jsx
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
import { useNavigate } from "react-router-dom";

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

  const commonCellSx = { fontWeight: 600, fontSize: "0.875rem" };

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
          variant={isMobile ? "body1" : "h6"}
          sx={{ fontWeight: "bold", color: "#FB8C00" }}
        >
          Course Management
        </Typography>
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
          Create New Course
        </Button>
      </Box>

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
                  <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>No.</TableCell>
                  <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Course Name</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Author</TableCell>
                      <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Price</TableCell>
                      <TableCell sx={{ ...commonCellSx, color: "#FB8C00", maxWidth: "250px" }}>Description</TableCell>
                      {/* <-- Thêm cột Status ở đây */}
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
                            src={course?.image && course.image.trim() !== "" ? course.image : "https://dummyimage.com/50x50/cccccc/fff.png&text=No+Img"}
                            sx={{ width: 45, height: 45, objectFit: "cover", borderRadius: 2, boxShadow: 0.5 }}
                          />
                          <Typography
  sx={{
    color: "#000000ff",              // màu chữ mặc định (xanh đẹp cho admin)
    fontWeight: 600,
    fontSize: "0.825rem",
    wordBreak: "break-word",
    cursor: "pointer",
    "&:hover": { 
      textDecoration: "underline",
      color: "#FB8C00"             // màu hover đậm hơn
    }
  }}
>
  {course.title}
</Typography>

                        </Stack>
                      </TableCell>


                      {!isMobile && (
                        <>
                          <TableCell sx={{ fontWeight: 600, fontSize: "0.825rem", py: 0.8, px: 1 }}>{course.instructor}</TableCell>
                          <TableCell align="center" sx={commonCellSx}>
                            {course.price === 0 && course.originalPrice > 0 ? (
                              <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    textDecoration: "line-through",
                                    color: "text.secondary",
                                    fontWeight: 600,
                                  }}
                                >
                                  ${course.originalPrice.toLocaleString()}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "0.8rem", fontWeight: 600, color: "success.main" }}
                                >
                                  Free
                                </Typography>
                              </Box>
                            ) : course.price > 0 && course.price < course.originalPrice ? (
                              <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    textDecoration: "line-through",
                                    color: "text.secondary",
                                    fontWeight: 600,
                                  }}
                                >
                                  ${course.originalPrice.toLocaleString()}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "0.8rem", fontWeight: 600, color: "error.main" }}
                                >
                                  ${course.price.toLocaleString()}
                                </Typography>
                              </Box>
                            ) : course.price === 0 ? (
                              <Typography
                                sx={{ fontSize: "0.8rem", fontWeight: 600, color: "success.main" }}
                              >
                                Free
                              </Typography>
                            ) : (
                              <Typography
                                sx={{ fontSize: "0.8rem", fontWeight: 600, color: "text.primary" }}
                              >
                                ${course.price?.toLocaleString()}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ maxWidth: 150, whiteSpace: "normal", fontStyle: "italic", fontSize: "0.75rem", py: 0.8, px: 1 }}>
                            {course.description}
                          </TableCell>
                          {/* <-- Status */}
                         <TableCell align="center" sx={{ py: 0.8 }}>
  <Button
    variant="contained"
    sx={{
      backgroundColor:
        course.status === "active" ? "#4CAF50" : "#F44336", // Xanh cho active, đỏ cho inactive
      color: "#ffffff", // Chữ màu trắng
      fontSize: "0.65rem", // Giảm kích thước chữ
      fontWeight: 600,
      padding: "1px 6px", // Giảm khoảng cách padding (thun gọn hơn)
      width: "auto", // Tự động điều chỉnh chiều rộng phù hợp với nội dung
      minWidth: "60px", // Đặt chiều rộng tối thiểu
      textTransform: "none", // Không viết hoa tất cả chữ
      "&:hover": {
        backgroundColor:
          course.status === "active" ? "#388E3C" : "#D32F2F", // Hover hiệu ứng
      },
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
                    <TableCell colSpan={isMobile ? 3 : 7} align="center" sx={{ fontSize: "0.8rem", py: 1 }}>
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
            labelRowsPerPage="Số hàng mỗi trang:"
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