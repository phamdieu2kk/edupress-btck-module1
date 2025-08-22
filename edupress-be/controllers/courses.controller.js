const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review');

// Public: danh sách khoá học APPROVED (+search ?q=)
// exports.listCourses = async (req, res) => {
//   const q = { status: 'APPROVED' };
//   if (req.query.q) q.title = { $regex: req.query.q, $options: 'i' };
//   const courses = await Course.find(q).sort({ createdAt: -1 }).populate('provider', 'name');
//   res.json(courses);
// };

// controllers/courseController.js
// controllers/courseController.js


exports.listCourses = async (req, res) => {
  try {
    const q = { status: "APPROVED" };

    // Search by title
    if (req.query.q) {
      q.title = { $regex: req.query.q, $options: "i" };
    }

    // Filter by category (support multiple categories)
    if (req.query.category) {
      const categories = req.query.category.split(",").map((c) => c.trim());
      q.category = { $in: categories }; // match bất kỳ category nào trong mảng
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalCourses = await Course.countDocuments(q);

    const courses = await Course.find(q)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("provider", "name");

    const totalPages = Math.ceil(totalCourses / limit);

    res.json({
      courses,
      pagination: { totalPages },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




// Public: chi tiết khoá học (không trả nội dung bài học)
exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('provider', 'name');
  if (!course || course.status !== 'APPROVED') return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

// Customer: đăng ký khoá học
exports.enroll = async (req, res) => {
  const { id } = req.params; // courseId
  const course = await Course.findById(id);
  if (!course || course.status !== 'APPROVED') return res.status(404).json({ message: 'Course not found' });

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
    .populate({ path: 'course', populate: { path: 'provider', select: 'name' } });
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

  const review = await Review.create({ user: req.user.id, course: id, rating, comment });
  res.status(201).json(review);
};
