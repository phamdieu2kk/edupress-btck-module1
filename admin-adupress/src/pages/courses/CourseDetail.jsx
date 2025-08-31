import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER_IMAGE = "https://dummyimage.com/400x250/cccccc/ffffff.png&text=No+Image";

const COURSE_CATEGORIES = [
  "Art & Design",
  "Development",
  "Communication",
  "Marketing",
  "Photography",
  "Network",
  "Content Writing",
  "Finance",
  "Videography",
  "Science",
];

const LEVELS = [
  { label: "Advanced", value: "Advanced" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
  { label: "Beginner", value: "Beginner" },
];

const CourseDetail = ({ open, onClose, onSaved, course }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    price: 0,
    originalPrice: 0,
    status: "active",
    duration: 1,   // Default duration to 1
    level: "all",  // Default level
    students: 0,   // Default students
    lessons: 0,    // Default lessons
  });
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState(PLACEHOLDER_IMAGE);
  const [newImageBase64, setNewImageBase64] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (course) {
      // Edit mode
      setForm({
        title: course.title || "",
        description: course.description || "",
        instructor: course.instructor || "",
        price: course.price || 0,
        originalPrice: course.originalPrice || 0,
        status: course.status || "active",
        duration: course.duration || 1,  // Set duration to course value or default to 1
        level: course.level || "all",
        students: course.students || 0,
        lessons: course.lessons || 0,
      });
      setCategory(course.category || "");
      setPreview(course.image || PLACEHOLDER_IMAGE);
      setNewImageBase64(null);
    } else if (open) {
      // Create mode
      setForm({
        title: "",
        description: "",
        instructor: "",
        price: 0,
        originalPrice: 0,
        status: "Active",
        duration: 1,   // Default duration to 1
        level: "All level",
        students: 0,
        lessons: 0,
      });
      setCategory("");
      setPreview(PLACEHOLDER_IMAGE);
      setNewImageBase64(null);
    }
  }, [course, open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImageBase64(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, category };
      if (newImageBase64) payload.image = newImageBase64;

      if (course) {
        await axios.put(`${API_URL}/api/courses/${course._id}`, payload);
        setSnackbar({ open: true, message: "Cập nhật khóa học thành công! 🎉", severity: "success" });
      } else {
        await axios.post(`${API_URL}/api/courses`, payload);
        setSnackbar({ open: true, message: "Tạo khóa học mới thành công! ✨", severity: "success" });
      }

      onSaved && onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Có lỗi xảy ra khi lưu khóa học 😔", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: isMobile ? "100%" : 400, p: 3 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FB8C00" }}>
            {course ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
          </Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <TextField label="Tên khóa học" name="title" value={form.title} onChange={handleChange} required fullWidth />
          <TextField label="Mô tả" name="description" value={form.description} onChange={handleChange} multiline rows={3} fullWidth />
          <TextField label="Giảng viên" name="instructor" value={form.instructor} onChange={handleChange} required fullWidth />

          <Stack direction="row" spacing={2}>
            <TextField label="Giá gốc" type="number" name="originalPrice" value={form.originalPrice} onChange={handleChange} fullWidth />
            <TextField label="Giá hiện tại" type="number" name="price" value={form.price} onChange={handleChange} fullWidth />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Course Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Course Category">
              {COURSE_CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Thời gian khóa học với từ "week" */}
          <TextField
            label="Khóa học bao nhiêu tuần"
            type="number"
            name="duration"
            value={form.duration || 1}  // Default to 1 if no value is set
            onChange={handleChange}
            fullWidth
            helperText="Nếu không nhập, mặc định là 1 tuần."
            InputProps={{
              endAdornment: <Typography sx={{ marginLeft: 1 }}>Tuần</Typography>,  // Hiển thị từ "Tuần"
            }}
          />

          {/* Level dropdown với các cấp độ */}
          <FormControl fullWidth>
            <InputLabel>Cấp độ</InputLabel>
            <Select name="level" value={form.level} onChange={handleChange} label="Cấp độ">
              {LEVELS.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Số lượng học viên */}
          <TextField label="Số lượng học viên" type="number" name="students" value={form.students} onChange={handleChange} fullWidth />

          {/* Số lượng bài giảng */}
          <TextField label="Số lượng bài giảng" type="number" name="lessons" value={form.lessons} onChange={handleChange} fullWidth />

          <Button variant="outlined" component="label">
            Chọn ảnh khóa học
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>

          {preview && (
            <Box sx={{ textAlign: "center" }}>
              <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, objectFit: "contain" }} />
            </Box>
          )}

          <Stack direction="row" spacing={2} mt={2} justifyContent={isMobile ? "center" : "flex-start"}>
            <Button variant="contained" sx={{ bgcolor: "#FB8C00", "&:hover": { bgcolor: "#FF9800" } }} onClick={handleSave} disabled={saving}>
              {saving ? "Đang lưu..." : course ? "Cập nhật" : "Tạo"}
            </Button>
            <Button variant="outlined" onClick={onClose}>Hủy</Button>
          </Stack>
        </Stack>
      </Drawer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default CourseDetail;
