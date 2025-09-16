// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Card,
//   Typography,
//   TextField,
//   Button,
//   useTheme,
//   useMediaQuery,
//   Stack,
// } from "@mui/material";
// import axios from "axios";

// const CourseCreate = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [instructor, setInstructor] = useState("");
//   const [price, setPrice] = useState(0);
//   const [imageFile, setImageFile] = useState(null); // File ảnh thực sự
//   const [preview, setPreview] = useState(""); // URL preview ảnh
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setPreview(URL.createObjectURL(file)); // Preview ảnh ngay
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("instructor", instructor);
//       formData.append("price", price);
//       if (imageFile) {
//         formData.append("image", imageFile); // Gửi file ảnh
//       }

//       await axios.post("http://localhost:5000/api/courses", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setLoading(false);
//       navigate("/admin/courses");
//     } catch (err) {
//       console.error("❌ Lỗi tạo khóa học:", err);
//       setLoading(false);
//     }
//   };

//   return (
//     <Card
//       sx={{
//         p: isMobile ? 2 : 4,
//         borderRadius: 3,
//         bgcolor: "#fff",
//         border: "1px solid #FB8C00",
//         boxShadow: "0 3px 10px rgba(251,140,0,0.2)",
//         maxWidth: 600,
//         margin: "20px auto",
//       }}
//     >
//       <Typography
//         variant={isMobile ? "h6" : "h5"}
//         sx={{ fontWeight: "bold", color: "#FB8C00", mb: 3 }}
//       >
//         Tạo / Chỉnh sửa khóa học
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//       >
//         <TextField
//           label="Tên khóa học"
//           variant="outlined"
//           fullWidth
//           required
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <TextField
//           label="Mô tả"
//           variant="outlined"
//           fullWidth
//           multiline
//           minRows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <TextField
//           label="Giảng viên"
//           variant="outlined"
//           fullWidth
//           required
//           value={instructor}
//           onChange={(e) => setInstructor(e.target.value)}
//         />
//         <TextField
//           label="Giá"
//           variant="outlined"
//           type="number"
//           fullWidth
//           required
//           value={price}
//           onChange={(e) => setPrice(parseFloat(e.target.value))}
//         />

//         {/* Upload ảnh */}
//         <Box>
//           <Button
//             variant="outlined"
//             component="label"
//             sx={{ mb: 1 }}
//           >
//             Chọn ảnh khóa học
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleImageChange}
//             />
//           </Button>
//           {preview && (
//             <Box
//               component="img"
//               src={preview}
//               alt="Preview"
//               sx={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 1 }}
//             />
//           )}
//         </Box>

//         <Stack
//           direction="row"
//           spacing={2}
//           mt={2}
//           justifyContent={isMobile ? "center" : "flex-start"}
//         >
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ backgroundColor: "#FB8C00", "&:hover": { backgroundColor: "#FF9800" } }}
//             disabled={loading}
//           >
//             {loading ? "Đang lưu..." : "Lưu"}
//           </Button>
//           <Button variant="outlined" onClick={() => navigate("/admin/courses")}>
//             Hủy
//           </Button>
//         </Stack>
//       </Box>
//     </Card>
//   );
// };

// export default CourseCreate;


// src/pages/courses/CourseCreate.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER_IMAGE = "https://dummyimage.com/400x250/cccccc/ffffff.png&text=No+Image";

// Format VND
const formatVND = (value) => {
  if (!value) return "0₫";
  return value.toLocaleString("vi-VN") + "₫";
};

// Parse input số tiền
const parsePriceInput = (input) => {
  const numeric = input.replace(/\D/g, "");
  return numeric ? Number(numeric) * 1000 : 0;
};

const CourseCreate = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    price: 0,
  });
  const [imageBase64, setImageBase64] = useState(null);
  const [preview, setPreview] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };
      if (imageBase64) payload.image = imageBase64;

      await axios.post(`${API_URL}/api/courses`, payload);
      setSnackbar({ open: true, message: "Tạo khóa học thành công! ✨", severity: "success" });

      setTimeout(() => navigate("/admin/courses"), 1000);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Có lỗi khi tạo khóa học 😔", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 3,
          bgcolor: "#fff",
          border: "1px solid #FB8C00",
          boxShadow: "0 3px 10px rgba(251,140,0,0.2)",
          maxWidth: 600,
          margin: "20px auto",
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", color: "#FB8C00", mb: 3 }}
        >
          Tạo khóa học mới
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Tên khóa học"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Mô tả"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Giảng viên"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Giá (VNĐ)"
            name="price"
            value={form.price ? form.price / 1000 : ""}
            onChange={(e) => setForm({ ...form, price: parsePriceInput(e.target.value) })}
            fullWidth
            required
          />

          {/* Upload ảnh */}
          <Button variant="outlined" component="label">
            Chọn ảnh khóa học
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {preview && (
            <Box sx={{ textAlign: "center" }}>
              <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} />
            </Box>
          )}

          <Stack direction="row" spacing={2} mt={2} justifyContent={isMobile ? "center" : "flex-start"}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#FB8C00", "&:hover": { bgcolor: "#FF9800" } }}
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
            <Button variant="outlined" onClick={() => navigate("/admin/courses")}>
              Hủy
            </Button>
          </Stack>
        </Box>
      </Card>

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

export default CourseCreate;
