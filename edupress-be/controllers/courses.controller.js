const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review');
const slugify = require("slugify");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ===== Multer setup =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ảnh sẽ được lưu trong thư mục uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Hàm xử lý duration
const handleDuration = (duration) => {
  if (typeof duration === "string") {
    // Loại bỏ tất cả ký tự không phải là số hoặc từ "week"
    const parsedDuration = duration.replace(/[^0-9]/g, "");
    return parseInt(parsedDuration, 10) || 1;  // Trả về 1 nếu không phải số hợp lệ
  }
  return duration || 1;  // Nếu không có giá trị, trả về 1
};

// API: Liệt kê các khóa học
exports.listCourses = async (req, res) => {
  try {
    const q = { status: "APPROVED" };
    if (req.query.q) q.title = { $regex: req.query.q, $options: "i" };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // Dùng aggregation để trả lessonCount mà không cần populate toàn bộ lesson
    const courses = await Course.aggregate([
      { $match: q },
      {
        $lookup: {
          from: "lessons",
          localField: "_id",
          foreignField: "courseId",
          as: "lessons",
        },
      },
      {
        $addFields: { lessonCount: { $size: "$lessons" } },
      },
      { $project: { lessons: 0 } }, // bỏ mảng lessons để nhẹ
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalCourses = await Course.countDocuments(q);

    res.json({
      courses,
      pagination: {
        total: totalCourses,
        totalPages: Math.ceil(totalCourses / limit),
        page,
        limit,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Chi tiết khóa học (không trả nội dung bài học)
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('provider', 'name');
    if (!course || course.status !== 'APPROVED') {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Đăng ký khóa học
exports.enroll = async (req, res) => {
  try {
    const { id } = req.params; // courseId
    const course = await Course.findById(id);
    if (!course || course.status !== 'APPROVED') return res.status(404).json({ message: 'Course not found' });

    const exists = await Enrollment.findOne({ user: req.user.id, course: id });
    if (exists) return res.status(409).json({ message: 'Already enrolled' });

    const paid = course.price === 0;
    const pricePaid = paid ? 0 : course.price;
    const enroll = await Enrollment.create({ user: req.user.id, course: id, paid, pricePaid });
    res.status(201).json(enroll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Danh sách khóa học đã đăng ký của khách hàng
exports.myCourses = async (req, res) => {
  try {
    const list = await Enrollment.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate({ path: 'course', populate: { path: 'provider', select: 'name' } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Lấy bài học của khóa học đã đăng ký
exports.courseLessons = async (req, res) => {
  try {
    const { id } = req.params; // courseId
    const enrolled = await Enrollment.findOne({ user: req.user.id, course: id });
    if (!enrolled) return res.status(403).json({ message: 'Not enrolled' });

    const lessons = await Lesson.find({ course: id }).sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Đánh giá khóa học
exports.reviewCourse = async (req, res) => {
  try {
    const { id } = req.params; // courseId
    const { rating, comment } = req.body;

    const enrolled = await Enrollment.findOne({ user: req.user.id, course: id });
    if (!enrolled) return res.status(403).json({ message: 'Not enrolled' });

    const review = await Review.create({ user: req.user.id, course: id, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Tạo mới khóa học
exports.createCourse = async (req, res) => {
  try {
    // Xử lý trường 'duration' trước khi lưu
    req.body.duration = handleDuration(req.body.duration);

    if (!req.body.slug && req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("❌ Error creating course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Cập nhật khóa học theo ID
exports.updateCourse = async (req, res) => {
  try {
    // Xử lý trường 'duration' trước khi cập nhật
    req.body.duration = handleDuration(req.body.duration);

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json(updatedCourse);
  } catch (err) {
    console.error("❌ Error updating course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Xóa khóa học theo ID
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// API: Lấy tất cả khóa học kèm bài học
exports.getCoursesWithLessons = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: "lessons",
        options: { sort: { order: 1 } },
      })
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    console.error("❌ getCoursesWithLessons error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
