// import React, { useState, useEffect } from "react";
// import {
//   Drawer,
//   Box,
//   Typography,
//   TextField,
//   Stack,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Divider,
//   IconButton,
//   Snackbar,
//   Alert,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// const PLACEHOLDER_IMAGE = "https://dummyimage.com/400x250/cccccc/ffffff.png&text=No+Image";

// const COURSE_CATEGORIES = [
//   "Art & Design",
//   "Development",
//   "Communication",
//   "Marketing",
//   "Photography",
//   "Network",
//   "Content Writing",
//   "Finance",
//   "Videography",
//   "Science",
// ];

// const LEVELS = [
//   { label: "Advanced", value: "Advanced" },
//   { label: "Intermediate", value: "Intermediate" },
//   { label: "Expert", value: "Expert" },
//   { label: "Beginner", value: "Beginner" },
// ];

// const STATUSES = [
//   { label: "Active", value: "active" },
//   { label: "Inactive", value: "inactive" },
// ];

// // Hàm format hiển thị giá
// const formatPriceDisplay = (value) => {
//   if (value === null || value === undefined) return "";
//   return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
// };

// // Hàm parse input từ người dùng
// const parsePriceInput = (input) => {
//   const numeric = input.replace(/\D/g, ""); // loại bỏ mọi ký tự không phải số
//   return numeric ? Number(numeric) * 1000 : 0; // nhân 1000 để lưu VND
// };

// const CourseDetail = ({ open, onClose, onSaved, course }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     instructor: "",
//     price: 0,
//     originalPrice: 0,
//     status: "active",
//     duration: 1,
//     level: "Beginner",
//     students: 0,
//     lessons: 0,
//   });
//   const [category, setCategory] = useState("");
//   const [preview, setPreview] = useState(PLACEHOLDER_IMAGE);
//   const [newImageBase64, setNewImageBase64] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   useEffect(() => {
//     if (course) {
//       // Edit mode
//       setForm({
//         title: course.title || "",
//         description: course.description || "",
//         instructor: course.instructor || "",
//         price: course.price || 0,
//         originalPrice: course.originalPrice || 0,
//         status: STATUSES.some(s => s.value === course.status) ? course.status : "active",
//         duration: course.duration || 1,
//         level: LEVELS.some(l => l.value === course.level) ? course.level : "Beginner",
//         students: course.students || 0,
//         lessons: course.lessons || 0,
//       });
//       setCategory(course.category || "");
//       setPreview(course.image || PLACEHOLDER_IMAGE);
//       setNewImageBase64(null);
//     } else if (open) {
//       // Create mode
//       setForm({
//         title: "",
//         description: "",
//         instructor: "",
//         price: 0,
//         originalPrice: 0,
//         status: "active",
//         duration: 1,
//         level: "Beginner",
//         students: 0,
//         lessons: 0,
//       });
//       setCategory("");
//       setPreview(PLACEHOLDER_IMAGE);
//       setNewImageBase64(null);
//     }
//   }, [course, open]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setNewImageBase64(reader.result);
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const payload = {
//         ...form,
//         category,
//         price: Number(form.price),
//         originalPrice: Number(form.originalPrice),
//         duration: Number(form.duration),
//         students: Number(form.students),
//         lessons: Number(form.lessons),
//         level: LEVELS.some(l => l.value === form.level) ? form.level : "Beginner",
//         status: STATUSES.some(s => s.value === form.status) ? form.status : "active",
//       };
//       if (newImageBase64) payload.image = newImageBase64;

//       if (course) {
//         await axios.put(`${API_URL}/api/courses/${course._id}`, payload);
//         setSnackbar({ open: true, message: "Cập nhật khóa học thành công! 🎉", severity: "success" });
//       } else {
//         await axios.post(`${API_URL}/api/courses`, payload);
//         setSnackbar({ open: true, message: "Tạo khóa học mới thành công! ✨", severity: "success" });
//       }

//       onSaved && onSaved();
//       onClose();
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Có lỗi xảy ra khi lưu khóa học 😔", severity: "error" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <>
//       <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: isMobile ? "100%" : 400, p: 3 } }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FB8C00" }}>
//             {course ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
//           </Typography>
//           <IconButton onClick={onClose}><CloseIcon /></IconButton>
//         </Box>

//         <Divider sx={{ mb: 2 }} />

//         <Stack spacing={2}>
//           <TextField label="Tên khóa học" name="title" value={form.title} onChange={handleChange} required fullWidth />
//           <TextField label="Mô tả" name="description" value={form.description} onChange={handleChange} multiline rows={3} fullWidth />
//           <TextField label="Giảng viên" name="instructor" value={form.instructor} onChange={handleChange} required fullWidth />

//           <Stack direction="row" spacing={2}>
//             <TextField
//               label="Giá gốc"
//               name="originalPrice"
//               value={formatPriceDisplay(form.originalPrice / 1000)}
//               onChange={(e) => setForm({ ...form, originalPrice: parsePriceInput(e.target.value) })}
//               fullWidth
//             />
//             <TextField
//               label="Giá hiện tại"
//               name="price"
//               value={formatPriceDisplay(form.price / 1000)}
//               onChange={(e) => setForm({ ...form, price: parsePriceInput(e.target.value) })}
//               fullWidth
//             />
//           </Stack>

//           <FormControl fullWidth>
//             <InputLabel>Course Category</InputLabel>
//             <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Course Category">
//               {COURSE_CATEGORIES.map((c) => (
//                 <MenuItem key={c} value={c}>{c}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Khóa học bao nhiêu tuần"
//             type="number"
//             name="duration"
//             value={form.duration || 1}
//             onChange={handleChange}
//             fullWidth
//             helperText="Nếu không nhập, mặc định là 1 tuần."
//             InputProps={{
//               endAdornment: <Typography sx={{ marginLeft: 1 }}>Tuần</Typography>,
//             }}
//           />

//           <FormControl fullWidth>
//             <InputLabel>Cấp độ</InputLabel>
//             <Select name="level" value={form.level} onChange={handleChange} label="Cấp độ">
//               {LEVELS.map((level) => (
//                 <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Trạng thái</InputLabel>
//             <Select name="status" value={form.status} onChange={handleChange} label="Trạng thái">
//               {STATUSES.map((s) => (
//                 <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField label="Số lượng học viên" type="number" name="students" value={form.students} onChange={handleChange} fullWidth />
//           <TextField label="Số lượng bài giảng" type="number" name="lessons" value={form.lessons} onChange={handleChange} fullWidth />

//           <Button variant="outlined" component="label">
//             Chọn ảnh khóa học
//             <input type="file" accept="image/*" hidden onChange={handleImageChange} />
//           </Button>

//           {preview && (
//             <Box sx={{ textAlign: "center" }}>
//               <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, objectFit: "contain" }} />
//             </Box>
//           )}

//           <Stack direction="row" spacing={2} mt={2} justifyContent={isMobile ? "center" : "flex-start"}>
//             <Button variant="contained" sx={{ bgcolor: "#FB8C00", "&:hover": { bgcolor: "#FF9800" } }} onClick={handleSave} disabled={saving}>
//               {saving ? "Đang lưu..." : course ? "Cập nhật" : "Tạo"}
//             </Button>
//             <Button variant="outlined" onClick={onClose}>Hủy</Button>
//           </Stack>
//         </Stack>
//       </Drawer>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default CourseDetail;

// src/pages/courses/CourseDetail.jsx
import React, { useEffect, useState } from "react";
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
  "Art & Design", "Development", "Communication", "Marketing",
  "Photography", "Network", "Content Writing", "Finance",
  "Videography", "Science",
];

const LEVELS = [
  { label: "Advanced", value: "Advanced" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
  { label: "Beginner", value: "Beginner" },
];

const STATUSES = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// Format giá hiển thị VND
const formatVND = (value) => {
  if (!value) return "0₫";
  return value.toLocaleString("vi-VN") + "₫";
};

const parsePriceInput = (input) => {
  const numeric = input.replace(/\D/g, "");
  return numeric ? Number(numeric) * 1000 : 0;
};

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
    duration: 1,
    level: "Beginner",
    students: 0,
    lessons: 0,
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
        status: STATUSES.some(s => s.value === course.status) ? course.status : "active",
        duration: course.duration || 1,
        level: LEVELS.some(l => l.value === course.level) ? course.level : "Beginner",
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
        status: "active",
        duration: 1,
        level: "Beginner",
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
      const payload = {
        ...form,
        category,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        duration: Number(form.duration),
        students: Number(form.students),
        lessons: Number(form.lessons),
        level: LEVELS.some(l => l.value === form.level) ? form.level : "Beginner",
        status: STATUSES.some(s => s.value === form.status) ? form.status : "active",
      };
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
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <TextField label="Tên khóa học" name="title" value={form.title} onChange={handleChange} fullWidth />
          <TextField label="Mô tả" name="description" value={form.description} onChange={handleChange} multiline rows={3} fullWidth />
          <TextField label="Giảng viên" name="instructor" value={form.instructor} onChange={handleChange} fullWidth />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Giá gốc"
              name="originalPrice"
              value={formatVND(form.originalPrice)}
              onChange={(e) => setForm({ ...form, originalPrice: parsePriceInput(e.target.value) })}
              fullWidth
            />
            <TextField
              label="Giá hiện tại"
              name="price"
              value={formatVND(form.price)}
              onChange={(e) => setForm({ ...form, price: parsePriceInput(e.target.value) })}
              fullWidth
            />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Danh mục</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Danh mục">
              {COURSE_CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Thời lượng (tuần)"
            type="number"
            name="duration"
            value={form.duration || 1}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Cấp độ</InputLabel>
            <Select name="level" value={form.level} onChange={handleChange}>
              {LEVELS.map(l => <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select name="status" value={form.status} onChange={handleChange}>
              {STATUSES.map(s => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField label="Số học viên" type="number" name="students" value={form.students} onChange={handleChange} fullWidth />
          <TextField label="Số bài giảng" type="number" name="lessons" value={form.lessons} onChange={handleChange} fullWidth />

          <Button variant="outlined" component="label">
            Chọn ảnh
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>

          {preview && <Box sx={{ textAlign: "center" }}><img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} /></Box>}

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
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default CourseDetail;
