const ProviderApplication = require('../models/ProviderApplication');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Discount = require('../models/Discount');

// Customer gửi đăng ký thành NCC
exports.applyProvider = async (req, res) => {
  const { companyName, description } = req.body;
  const duplicated = await ProviderApplication.findOne({ user: req.user.id, status: 'PENDING' });
  if (duplicated) return res.status(409).json({ message: 'Application already pending' });

  const app = await ProviderApplication.create({ user: req.user.id, companyName, description });
  res.status(201).json(app);
};

// NCC: tạo khoá học -> mặc định PENDING
exports.createCourse = async (req, res) => {
  const { title, description, objectives, price, thumbnail, tags } = req.body;
  const course = await Course.create({
    title,
    description,
    objectives: objectives || [],
    provider: req.user.id,
    price: price || 0,
    status: 'PENDING',
    thumbnail,
    tags
  });
  res.status(201).json(course);
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOneAndUpdate(
    { _id: id, provider: req.user.id },
    req.body,
    { new: true }
  );
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOneAndDelete({ _id: id, provider: req.user.id });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json({ message: 'Deleted' });
};

// Bài giảng
exports.addLesson = async (req, res) => {
  const { courseId } = req.params;
  const { title, videoUrl, materials, order } = req.body;

  const own = await Course.findOne({ _id: courseId, provider: req.user.id });
  if (!own) return res.status(404).json({ message: 'Course not found' });

  const lesson = await Lesson.create({ course: courseId, title, videoUrl, materials, order });
  res.status(201).json(lesson);
};

exports.updateLesson = async (req, res) => {
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId).populate('course');
  if (!lesson || String(lesson.course.provider) !== req.user.id)
    return res.status(404).json({ message: 'Lesson not found' });

  Object.assign(lesson, req.body);
  await lesson.save();
  res.json(lesson);
};

exports.deleteLesson = async (req, res) => {
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId).populate('course');
  if (!lesson || String(lesson.course.provider) !== req.user.id)
    return res.status(404).json({ message: 'Lesson not found' });

  await lesson.deleteOne();
  res.json({ message: 'Deleted' });
};

// Mã giảm giá
exports.createDiscount = async (req, res) => {
  const { code, percent, amount, startAt, endAt } = req.body;
  const discount = await Discount.create({
    code,
    provider: req.user.id,
    percent,
    amount,
    startAt,
    endAt
  });
  res.status(201).json(discount);
};

exports.updateDiscount = async (req, res) => {
  const { id } = req.params;
  const discount = await Discount.findOneAndUpdate(
    { _id: id, provider: req.user.id },
    req.body,
    { new: true }
  );
  if (!discount) return res.status(404).json({ message: 'Discount not found' });
  res.json(discount);
};

exports.deleteDiscount = async (req, res) => {
  const { id } = req.params;
  const discount = await Discount.findOneAndDelete({ _id: id, provider: req.user.id });
  if (!discount) return res.status(404).json({ message: 'Discount not found' });
  res.json({ message: 'Deleted' });
};
