import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Stack, IconButton, Button,
  CircularProgress, useTheme, useMediaQuery
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const LessonManagement = () => {
  const { courseId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch all lessons for the given courseId
  const fetchLessons = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/lessons/course/${courseId}`);
      
      // The API returns a flat array, so we can directly set it to state.
      // We don't need a separate transformation function anymore.
      setLessons(res.data); 

    } catch (err) {
      console.error("Fetch lessons error:", err);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/lessons/${id}`);
        // Re-fetch the data to update the UI
        fetchLessons();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Xóa thất bại!");
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexDirection: isMobile ? "column" : "row",
          gap: 1
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", color: "#FB8C00" }}
        >
          Quản lý bài học
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FB8C00", "&:hover": { backgroundColor: "#FF9800" } }}
          component={Link}
          to={`/admin/lessons/create?courseId=${courseId}`}
        >
          + Thêm bài học
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#FFF3E0" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700, color: "#FB8C00" }}>
                STT
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#FB8C00" }}>
                Tiêu đề
              </TableCell>
              {!isMobile && (
                <TableCell sx={{ fontWeight: 700, color: "#FB8C00" }}>
                  Thời lượng
                </TableCell>
              )}
              <TableCell align="center" sx={{ fontWeight: 700, color: "#FB8C00" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 3 : 4} align="center">
                  Không có bài học nào
                </TableCell>
              </TableRow>
            ) : (
              lessons.map((lesson, index) => (
                <TableRow key={lesson._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{lesson.title}</TableCell>
                  {!isMobile && <TableCell>{lesson.duration || "-"}</TableCell>}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        size="small"
                        color="primary"
                        component={Link}
                        to={`/admin/lessons/${lesson._id}/edit`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(lesson._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LessonManagement;