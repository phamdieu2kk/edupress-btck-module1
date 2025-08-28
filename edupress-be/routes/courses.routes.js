const express = require("express");
const Course = require("../models/Course");
const slugify = require("slugify");
const router = express.Router();

// =================== GET ===================

// GET /api/courses/check-title
// Endpoint mới để kiểm tra trùng tên khóa học
router.get("/check-title", async (req, res) => {
  try {
    const { title, excludeId } = req.query;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const query = { title: { $regex: new RegExp(`^${title}$`, 'i') } }; // Case-insensitive exact match
    if (excludeId) {
      query._id = { $ne: excludeId }; // Loại trừ chính khóa học đang sửa
    }

    const course = await Course.findOne(query);
    res.json({ exists: !!course });
  } catch (err) {
    console.error("❌ Error checking title:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/courses?page=1&limit=8&search=js&category=Commercial,Office&price=Free&review=4&level=Beginner
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };
    if (req.query.category) filter.category = { $in: req.query.category.split(",") };
    if (req.query.instructor) filter.instructor = { $in: req.query.instructor.split(",") };
    if (req.query.price === "Free") filter.price = 0;
    else if (req.query.price === "Paid") filter.price = { $gt: 0 };
    if (req.query.review) {
      const rating = parseInt(req.query.review);
      if (!isNaN(rating)) filter.rating = { $gte: rating };
    }
    if (req.query.level && req.query.level !== "All levels") filter.level = req.query.level;

    const total = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      courses,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/courses/:id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =================== POST ===================
// POST /api/courses
router.post("/", async (req, res) => {
  try {
    if (!req.body.slug && req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("❌ Error creating course:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =================== PUT ===================
// PUT /api/courses/:id
router.put("/:id", async (req, res) => {
  try {
    // Nếu title thay đổi, tự động cập nhật slug
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json(updatedCourse);
  } catch (err) {
    console.error("❌ Error updating course:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =================== DELETE ===================
// DELETE /api/courses/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting course:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;