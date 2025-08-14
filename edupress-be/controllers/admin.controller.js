const User = require('../models/User');
const ProviderApplication = require('../models/ProviderApplication');
const Course = require('../models/Course');

// Duyệt/DS yêu cầu trở thành NCC
exports.listProviderApplications = async (req, res) => {
  const apps = await ProviderApplication.find().sort({ createdAt: -1 }).populate('user', 'name email role');
  res.json(apps);
};

exports.approveProvider = async (req, res) => {
  const { id } = req.params; // applicationId
  const app = await ProviderApplication.findById(id).populate('user');
  if (!app) return res.status(404).json({ message: 'Application not found' });

  app.status = 'APPROVED';
  await app.save();
  await User.findByIdAndUpdate(app.user._id, { role: 'PROVIDER' });

  res.json({ message: 'Approved', appId: id });
};

exports.rejectProvider = async (req, res) => {
  const { id } = req.params;
  const app = await ProviderApplication.findById(id);
  if (!app) return res.status(404).json({ message: 'Application not found' });

  app.status = 'REJECTED';
  await app.save();

  res.json({ message: 'Rejected', appId: id });
};

// Khoá học chờ duyệt
exports.listPendingCourses = async (req, res) => {
  const courses = await Course.find({ status: 'PENDING' })
    .sort({ createdAt: -1 })
    .populate('provider', 'name email');
  res.json(courses);
};

exports.approveCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, { status: 'APPROVED' }, { new: true })
    .populate('provider', 'name email');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

exports.rejectCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, { status: 'REJECTED' }, { new: true })
    .populate('provider', 'name email');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

// Vô hiệu hoá user (customer/provider)
exports.disableUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { isDeleted: true });
  res.json({ message: 'User disabled' });
};
