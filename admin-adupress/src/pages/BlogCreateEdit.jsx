// // src/components/admin/BlogCreateEdit.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   CircularProgress,
//   Chip,
//   Paper,
//   Divider,
//   Snackbar,
//   Alert,
//   MenuItem,
// } from "@mui/material";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/blogs";

// const categories = [
//   "Commercial",
//   "Office",
//   "Shop",
//   "Educate",
//   "Academy",
//   "Single family home",
// ];

// const BlogCreateEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [blog, setBlog] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     image: "",
//     author: "",
//     tags: "",
//     date: "",
//     category: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   // Fetch blog data if editing
//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       axios
//         .get(`${BASE_URL}/${id}`)
//         .then((res) => {
//           const data = res.data;
//           setBlog({
//             title: data.title || "",
//             excerpt: data.excerpt || "",
//             content: data.content || "",
//             image: data.image || "",
//             author: data.author || "",
//             tags: data.tags?.join(", ") || "",
//             date: data.date ? new Date(data.date).toISOString().substring(0, 10) : "",
//             category: data.category || "",
//           });
//         })
//         .catch((err) => console.error("❌ Lỗi fetch blog:", err))
//         .finally(() => setLoading(false));
//     }
//   }, [id]);

//   const handleChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     setSaving(true);
//     try {
//       const payload = {
//         title: blog.title,
//         excerpt: blog.excerpt,
//         content: blog.content,
//         image: blog.image,
//         author: blog.author,
//         tags: blog.tags.split(",").map(t => t.trim()),
//         date: blog.date,
//         category: blog.category,
//       };

//       if (id) {
//         await axios.put(`${BASE_URL}/${id}`, payload);
//         setSnackbar({ open: true, message: "Cập nhật bài viết thành công!", severity: "success" });
//       } else {
//         await axios.post(BASE_URL, payload);
//         setSnackbar({ open: true, message: "Tạo bài viết mới thành công!", severity: "success" });
//       }

//       setBlog({ ...payload });
//       navigate("/admin/blog");
//     } catch (err) {
//       console.error("❌ Lỗi lưu blog:", err.response?.data || err.message);
//       setSnackbar({ open: true, message: "Có lỗi xảy ra khi lưu bài viết!", severity: "error" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box p={3} display="flex" justifyContent="center">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const tagList = blog.tags ? blog.tags.split(",").map((tag) => tag.trim()) : [];

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: "1000px", mx: "auto", borderRadius: 3 }}>
//       <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
//         {id ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
//       </Typography>

//       <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
//         {/* Form nhập dữ liệu */}
//         <Stack spacing={2} flex={1}>
//           <TextField label="Tiêu đề" name="title" value={blog.title} onChange={handleChange} fullWidth variant="outlined" />
//           <TextField label="Tác giả" name="author" value={blog.author} onChange={handleChange} fullWidth variant="outlined" />
//           <TextField
//             label="Ngày đăng"
//             name="date"
//             type="date"
//             value={blog.date}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField label="Ảnh (URL)" name="image" value={blog.image} onChange={handleChange} fullWidth variant="outlined" />
//           <TextField label="Excerpt" name="excerpt" value={blog.excerpt} onChange={handleChange} fullWidth multiline rows={2} variant="outlined" />
//           <TextField label="Nội dung bài viết" name="content" value={blog.content} onChange={handleChange} fullWidth multiline rows={6} variant="outlined" />
//           <TextField label="Tags (phân tách bằng ,)" name="tags" value={blog.tags} onChange={handleChange} fullWidth variant="outlined" />

//           {/* Category */}
//           <TextField
//             label="Category"
//             name="category"
//             select
//             value={blog.category}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>
//                 {cat}
//               </MenuItem>
//             ))}
//           </TextField>

//           {/* Nút hành động */}
//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <Button variant="outlined" color="secondary" onClick={() => navigate("/admin/blog")}>
//               Hủy
//             </Button>
//             <Button variant="contained" onClick={handleSubmit} disabled={saving}>
//               {saving ? "Đang lưu..." : id ? "Cập nhật" : "Tạo mới"}
//             </Button>
//           </Stack>
//         </Stack>

//         <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

//         {/* Preview giao diện FE */}
//         <Stack spacing={2} flex={1}>
//           <Typography variant="subtitle1" fontWeight={600}>Xem trước giao diện khách hàng</Typography>
//           {blog.image ? (
//             <Box
//               component="img"
//               src={blog.image}
//               alt="Preview"
//               sx={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 2 }}
//             />
//           ) : (
//             <Box sx={{ width: "100%", height: 200, borderRadius: 2, bgcolor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
//               Ảnh Preview
//             </Box>
//           )}
//           <Typography variant="h6" fontWeight={700}>{blog.title || "Tiêu đề bài viết"}</Typography>
//           <Typography variant="subtitle2" color="text.secondary">
//             {blog.author || "Tác giả"} - {blog.date ? new Date(blog.date).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN")}
//           </Typography>
//           {blog.category && (
//             <Typography variant="body2" color="primary" fontWeight={500}>
//               Category: {blog.category}
//             </Typography>
//           )}
//           <Typography variant="body2" mb={1}>{blog.excerpt || "Tóm tắt ngắn gọn..."}</Typography>
//           <Typography variant="body2">{blog.content || "Nội dung bài viết hiển thị ở đây..."}</Typography>
//           <Stack direction="row" spacing={1} mt={1}>
//             {tagList.map((tag, i) => (
//               <Chip key={i} label={tag} size="small" />
//             ))}
//           </Stack>
//         </Stack>
//       </Stack>

//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Paper>
//   );
// };

// export default BlogCreateEdit;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Chip,
  Paper,
  Divider,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import axiosClient from "../api/axiosClient";
const categories = [
  "Commercial",
  "Office",
  "Shop",
  "Educate",
  "Academy",
  "Single family home",
];

const BlogCreateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    tags: "",
    date: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch blog if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/blogs/${id}`)
        .then((res) => {
          const data = res.data;
          setBlog({
            title: data.title || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            image: data.image || "",
            author: data.author || "",
            tags: data.tags?.join(", ") || "",
            date: data.date ? new Date(data.date).toISOString().substring(0, 10) : "",
            category: data.category || "",
          });
        })
        .catch((err) => {
          console.error("❌ Error fetching blog:", err);
          setSnackbar({ open: true, message: "Cannot fetch blog data!", severity: "error" });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const payload = {
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image,
        author: blog.author,
        tags: blog.tags.split(",").map((t) => t.trim()),
        date: blog.date,
        category: blog.category,
      };

      if (id) {
        await axiosClient.put(`/blogs/${id}`, payload);
        setSnackbar({ open: true, message: "Blog updated successfully!", severity: "success" });
      } else {
        await axiosClient.post("/blogs", payload);
        setSnackbar({ open: true, message: "New blog created successfully!", severity: "success" });
      }

      navigate("/admin/blog");
    } catch (err) {
      console.error("❌ Error saving blog:", err.response?.data || err.message);
      setSnackbar({ open: true, message: "Error saving blog!", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const tagList = blog.tags ? blog.tags.split(",").map((tag) => tag.trim()) : [];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: "1000px", mx: "auto", borderRadius: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
        {id ? "Edit Blog Post" : "Create New Blog Post"}
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Stack spacing={2} flex={1}>
          <TextField label="Title" name="title" value={blog.title} onChange={handleChange} fullWidth />
          <TextField label="Author" name="author" value={blog.author} onChange={handleChange} fullWidth />
          <TextField label="Publish Date" name="date" type="date" value={blog.date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="Image URL" name="image" value={blog.image} onChange={handleChange} fullWidth />
          <TextField label="Excerpt" name="excerpt" value={blog.excerpt} onChange={handleChange} fullWidth multiline rows={2} />
          <TextField label="Content" name="content" value={blog.content} onChange={handleChange} fullWidth multiline rows={6} />
          <TextField label="Tags (comma separated)" name="tags" value={blog.tags} onChange={handleChange} fullWidth />
          <TextField label="Category" name="category" select value={blog.category} onChange={handleChange} fullWidth>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="secondary" onClick={() => navigate("/admin/blogs")}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={saving}>{saving ? "Saving..." : id ? "Update" : "Create"}</Button>
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

        <Stack spacing={2} flex={1}>
          <Typography variant="subtitle1" fontWeight={600}>Customer Preview</Typography>
          {blog.image ? (
            <Box component="img" src={blog.image} alt="Preview" sx={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 2 }} />
          ) : (
            <Box sx={{ width: "100%", height: 200, borderRadius: 2, bgcolor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
              Image Preview
            </Box>
          )}
          <Typography variant="h6" fontWeight={700}>{blog.title || "Blog Title"}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {blog.author || "Author"} - {blog.date ? new Date(blog.date).toLocaleDateString("en-US") : new Date().toLocaleDateString("en-US")}
          </Typography>
          {blog.category && (
            <Typography variant="body2" color="primary" fontWeight={500}>Category: {blog.category}</Typography>
          )}
          <Typography variant="body2" mb={1}>{blog.excerpt || "Short summary..."}</Typography>
          <Typography variant="body2">{blog.content || "Blog content will appear here..."}</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            {tagList.map((tag, i) => (<Chip key={i} label={tag} size="small" />))}
          </Stack>
        </Stack>
      </Stack>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default BlogCreateEdit;
