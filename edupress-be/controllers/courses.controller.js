const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review');
const slugify = require("slugify");
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







// POST /api/courses
exports.createCourse = async (req, res) => {
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
};

// Update a course by ID (PUT /api/courses/:id)
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json(updatedCourse);
  } catch (err) {
    console.error("❌ Error updating course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a course by ID (DELETE /api/courses/:id)
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





// GET /api/courses/with-lessons
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
