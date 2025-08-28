import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CourseDetail = ({ open, onClose, onSaved, course }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [saving, setSaving] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setDescription(course.description || "");
      setInstructor(course.instructor || "");
      setOriginalPrice(course.originalPrice || 0);
      setPrice(course.price || 0);
    } else {
      setTitle("");
      setDescription("");
      setInstructor("");
      setOriginalPrice(0);
      setPrice(0);
    }
  }, [course]);

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { title, description, instructor, originalPrice, price };

    try {
      // ✅ Kiểm tra trùng tên
      const checkRes = await axios.get(
        `http://localhost:5000/api/courses/check-title?title=${encodeURIComponent(title)}${
          course ? `&excludeId=${course._id}` : ""
        }`
      );

      if (checkRes.data.exists) {
        setSnackbarMessage("Tên khóa học đã tồn tại! 😔");
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
        setSaving(false);
        return;
      }

      if (course) {
        await axios.put(`http://localhost:5000/api/courses/${course._id}`, payload);
        setSnackbarMessage("Cập nhật khóa học thành công! 🎉");
        setSnackbarSeverity("success");
      } else {
        await axios.post("http://localhost:5000/api/courses", payload);
        setSnackbarMessage("Tạo khóa học mới thành công! ✨");
        setSnackbarSeverity("success");
      }

      setSnackbarOpen(true);
      setSaving(false);
      onClose();
      onSaved();
    } catch (err) {
      console.error("❌ Lỗi lưu khóa học:", err);
      setSnackbarMessage("Có lỗi xảy ra khi lưu khóa học! 😔");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setSaving(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: isMobile ? "100%" : 400, p: 3 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FB8C00" }}>
            {course ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box
          component="form"
          onSubmit={handleSaveCourse}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Tên khóa học"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Mô tả"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Giảng viên"
            variant="outlined"
            fullWidth
            required
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
          <TextField
            label="Giá gốc"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={originalPrice}
            onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
          />
          <TextField
            label="Giá hiện tại"
            variant="outlined"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          />

          <Stack direction="row" spacing={2} mt={2} justifyContent={isMobile ? "center" : "flex-start"}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#FB8C00", "&:hover": { backgroundColor: "#FF9800" } }}
              disabled={saving}
            >
              {saving ? "Đang lưu..." : course ? "Cập nhật" : "Tạo"}
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Hủy
            </Button>
          </Stack>
        </Box>
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CourseDetail;
