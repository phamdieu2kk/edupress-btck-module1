// src/components/courses/CourseDetailTabs/CurriculumTab.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import LessonDetail from "../../../../../admin-adupress/src/components/lessons/LessonDetail";
const CurriculumTab = ({ courseId }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/lessons", {
        params: { courseId, populate: "course" },
      });
      setLessons(res.data.lessons || res.data || []); // hỗ trợ cả 2 dạng API
    } catch (err) {
      console.error("❌ Error fetch lessons:", err);
      setSnackbar({
        open: true,
        message: "Không thể tải dữ liệu bài học",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchLessons();
    }
  }, [courseId]);

  return (
    <Box py={2}>
      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : lessons.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Chưa có bài học nào cho khóa học này.
        </Typography>
      ) : (
        <LessonDetail
          lessons={lessons}
          role="Customer" // ẩn edit/delete với khách hàng
          onEdit={() => {}}
          onDelete={() => {}}
        />
      )}

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CurriculumTab;
