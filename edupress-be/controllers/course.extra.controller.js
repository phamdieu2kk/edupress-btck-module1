const Course = require('../models/Course');
const Lesson = require('../models/Lesson.model');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review');

// Public: danh sách khoá học (giữ nguyên nếu bạn đã có status)
exports.listCoursesPublic = async (req, res) => {
  const q = {};
  if (req.query.q) q.title = { $regex: req.query.q, $options: 'i' };
  const courses = await Course.find(q).sort({ createdAt: -1 });
  res.json(courses);
};

// Public: chi tiết khoá học
exports.getCoursePublic = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

// Customer: đăng ký khoá học
exports.enroll = async (req, res) => {
  const { id } = req.params; // courseId
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const exists = await Enrollment.findOne({ user: req.user.id, course: id });
  if (exists) return res.status(409).json({ message: 'Already enrolled' });

  const paid = course.price === 0;
  const pricePaid = paid ? 0 : course.price;

  const enroll = await Enrollment.create({ user: req.user.id, course: id, paid, pricePaid });
  res.status(201).json(enroll);
};

// Customer: danh sách khoá học đã đăng ký
exports.myCourses = async (req, res) => {
  const list = await Enrollment.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate('course');
  res.json(list);
};

// Customer: lấy bài học của khoá học đã đăng ký
exports.courseLessons = async (req, res) => {
  const { id } = req.params; // courseId
  const enrolled = await Enrollment.findOne({ user: req.user.id, course: id });
  if (!enrolled) return res.status(403).json({ message: 'Not enrolled' });

  const lessons = await Lesson.find({ course: id }).sort({ order: 1 });
  res.json(lessons);
};

// Customer: đánh giá khoá học
exports.reviewCourse = async (req, res) => {
  const { id } = req.params; // courseId
  const { rating, comment } = req.body;

  const enrolled = await Enrollment.findOne({ user: req.user.id, course: id });
  if (!enrolled) return res.status(403).json({ message: 'Not enrolled' });

  try {
    const review = await Review.create({ user: req.user.id, course: id, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    // unique index (user, course) => 11000
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Bạn đã đánh giá khóa học này' });
    }
    throw err;
  }
};
