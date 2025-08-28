// src/pages/lessons/LessonCreateEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Paper,
  Divider,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const LessonCreateEdit = () => {
  const navigate = useNavigate();
  const { id, courseId } = useParams();

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    duration: "",
    section: "",
    order: 1,
    courseId: courseId || "",
    subLessons: [{ title: "", duration: "" }],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load dữ liệu khi edit
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/lessons/${id}`)
        .then((res) =>
          setLesson({
            ...res.data,
            courseId: res.data.courseId || courseId,
            subLessons:
              res.data.subLessons?.length > 0
                ? res.data.subLessons
                : [{ title: "", duration: "" }],
          })
        )
        .catch((err) => console.error(err));
    }
  }, [id, courseId]);

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubLessonChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...lesson.subLessons];
    updated[index][name] = value;
    setLesson({ ...lesson, subLessons: updated });
  };

  const handleAddSubLesson = () => {
    setLesson({
      ...lesson,
      subLessons: [...lesson.subLessons, { title: "", duration: "" }],
    });
  };

  const handleRemoveSubLesson = (index) => {
    setLesson({
      ...lesson,
      subLessons: lesson.subLessons.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...lesson, courseId };

      if (id) {
        await axios.put(`http://localhost:5000/api/lessons/${id}`, payload);
        setSnackbar({
          open: true,
          message: "Cập nhật bài học thành công!",
          severity: "success",
        });
      } else {
        await axios.post(`http://localhost:5000/api/lessons`, payload);
        setSnackbar({
          open: true,
          message: "Tạo bài học mới thành công!",
          severity: "success",
        });
      }

      setTimeout(() => navigate(`/admin/lessons/${courseId}`), 1200);
    } catch (err) {
      console.error("Error saving lesson:", err.response?.data || err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Có lỗi xảy ra!",
        severity: "error",
      });
    }
  };

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      {/* Snackbar nằm trên cùng */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Typography variant="h5" fontWeight={700} mb={3} color="orange">
        {id ? "Chỉnh sửa Bài học" : "Tạo Bài học mới"}
      </Typography>

      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Thông tin bài học */}
            <Stack spacing={2}>
              <TextField
                label="Tiêu đề"
                name="title"
                value={lesson.title}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Mô tả"
                name="description"
                value={lesson.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Thời gian"
                  name="duration"
                  type="number"
                  value={lesson.duration}
                  onChange={handleChange}
                  sx={{ flex: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">phút</InputAdornment>
                    ),
                    inputProps: { min: 0 },
                  }}
                />
                <TextField
                  label="Section"
                  name="section"
                  value={lesson.section}
                  onChange={handleChange}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Thứ tự"
                  type="number"
                  name="order"
                  value={lesson.order}
                  onChange={handleChange}
                  sx={{ width: 120 }}
                  inputProps={{ min: 1 }}
                />
              </Stack>
            </Stack>

            <Divider />

            {/* SubLessons */}
            <Typography variant="h6" fontWeight={600}>
              Sub Lessons
            </Typography>
            <Stack spacing={2}>
              {lesson.subLessons.map((sub, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: "grey.50",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                  >
                    <TextField
                      label="Tiêu đề SubLesson"
                      name="title"
                      value={sub.title}
                      onChange={(e) => handleSubLessonChange(index, e)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Thời gian"
                      name="duration"
                      type="number"
                      value={sub.duration}
                      onChange={(e) => handleSubLessonChange(index, e)}
                      sx={{ width: 150 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">phút</InputAdornment>
                        ),
                        inputProps: { min: 0 },
                      }}
                    />
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveSubLesson(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddSubLesson}
              >
                Thêm SubLesson
              </Button>
            </Stack>

            {/* Nút Submit + Hủy nằm bên phải */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              mt={2}
              justifyContent="flex-end"
            >

             <Button
                variant="outlined"
                sx={{
                  borderColor: "orange",
                  color: "orange",
                  "&:hover": { backgroundColor: "orange", color: "white" },
                }}
                onClick={() => navigate(-1)} // quay lại trang trước
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                  "&:hover": { backgroundColor: "darkorange" },
                }}
              >
                {id ? "Cập nhật" : "Tạo mới"}
              </Button>

             
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default LessonCreateEdit;
