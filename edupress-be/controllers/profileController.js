const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET /api/profile/me
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

// PUT /api/profile
exports.updateProfile = async (req, res) => {
  const { fullName, phone, gender, nationality } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Không cho đổi email ở đây
  user.fullName = fullName ?? user.fullName;
  user.phone = phone ?? user.phone;
  user.gender = gender ?? user.gender;
  user.nationality = nationality ?? user.nationality;

  await user.save();
  res.json({ message: 'Updated', user: { id: user._id, fullName: user.fullName, email: user.email } });
};

// PUT /api/profile/change-password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Thiếu thông tin' });

  const user = await User.findById(req.user.id);
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Đổi mật khẩu thành công' });
};

// DELETE /api/profile
exports.deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: 'Tài khoản đã được xóa' });
};

// POST /api/profile/request-provider
exports.requestProvider = async (req, res) => {
  // Tùy thiết kế: tạo cờ yêu cầu, hoặc tạo hồ sơ NCC, hoặc gửi notify
  // Ở đây demo set field tạm: providerRequestAt
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { providerRequestAt: new Date() } },
    { new: true }
  ).select('-password');
  res.json({ message: 'Đã gửi yêu cầu trở thành NCC', user });
};
