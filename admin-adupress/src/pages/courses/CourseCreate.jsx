// src/pages/courses/CourseCreate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import axios from "axios";

const CourseCreate = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/courses", { title, description, instructor, price });
      setLoading(false);
      navigate("/admin/courses");
    } catch (err) {
      console.error("❌ Lỗi tạo khóa học:", err);
      setLoading(false);
    }
  };

  return (
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
      <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "#FB8C00", mb: 3 }}>
        Tạo / Chỉnh sửa khóa học
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          label="Giá"
          variant="outlined"
          type="number"
          fullWidth
          required
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />

        <Stack direction="row" spacing={2} mt={2} justifyContent={isMobile ? "center" : "flex-start"}>
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#FB8C00", "&:hover": { backgroundColor: "#FF9800" } }} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/admin/courses")}>
            Hủy
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default CourseCreate;
