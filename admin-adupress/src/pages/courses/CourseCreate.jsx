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
import axiosClient from "../../api/axiosClient";

const CourseCreate = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null); // Actual file
  const [preview, setPreview] = useState(""); // Preview URL
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview immediately
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("instructor", instructor);
      formData.append("price", price);
      if (imageFile) {
        formData.append("image", imageFile); // Send file
      }

      await axiosClient.post("/api/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      navigate("/admin/courses");
    } catch (err) {
      console.error("❌ Error creating course:", err);
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
      <Typography
        variant={isMobile ? "h6" : "h5"}
        sx={{ fontWeight: "bold", color: "#FB8C00", mb: 3 }}
      >
        Create / Edit Course
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Course Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Instructor"
          variant="outlined"
          fullWidth
          required
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          required
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />

        {/* Upload image */}
        <Box>
          <Button
            variant="outlined"
            component="label"
            sx={{ mb: 1 }}
          >
            Choose Course Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 1 }}
            />
          )}
        </Box>

        <Stack
          direction="row"
          spacing={2}
          mt={2}
          justifyContent={isMobile ? "center" : "flex-start"}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#FB8C00", "&:hover": { backgroundColor: "#FF9800" } }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/admin/courses")}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default CourseCreate;
