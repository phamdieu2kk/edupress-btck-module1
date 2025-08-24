import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CourseDetail = ({ open, onClose, onSaved }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/courses", {
        title,
        description,
        instructor,
        originalPrice,
        discountPrice,
      });
      setSaving(false);
      onClose();
      onSaved();
      setTitle("");
      setDescription("");
      setInstructor("");
      setOriginalPrice(0);
      setDiscountPrice(0);
    } catch (err) {
      console.error("❌ Lỗi tạo khóa học:", err);
      setSaving(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: isMobile ? "100%" : 400, p: 3 } }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FB8C00" }}>
          Tạo khóa học mới
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box component="form" onSubmit={handleSaveCourse} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
        />
        <TextField
          label="Giá giảm"
          variant="outlined"
          type="number"
          fullWidth
          value={discountPrice}
          onChange={(e) => setDiscountPrice(parseFloat(e.target.value))}
        />

        <Stack direction="row" spacing={2} mt={2} justifyContent={isMobile ? "center" : "flex-start"}>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#FB8C00", "&:hover": { backgroundColor: "#FF9800" } }}
            disabled={saving}
          >
            {saving ? "Đang lưu..." : "Tạo"}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Hủy
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CourseDetail;
