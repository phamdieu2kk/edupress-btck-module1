import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Tạo mới
router.post("/api/courses", upload.single("image"), async (req, res) => {
  try {
    const { title, description, instructor, originalPrice, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const course = new Course({ title, description, instructor, originalPrice, price, image });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Cập nhật
router.put("/api/courses/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, instructor, originalPrice, price } = req.body;
    const updateData = { title, description, instructor, originalPrice, price };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
