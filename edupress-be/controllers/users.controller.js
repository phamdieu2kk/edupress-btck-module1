const User = require("../models/User");

// Lấy tất cả user (chỉ admin mới được xem)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy thông tin user hiện tại
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật thông tin user (thêm từ code bị comment)
exports.updateUserProfile = async (req, res) => {
  const { fullName, phone, gender, nationality } = req.body;
  const update = { fullName, phone, gender, nationality };
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      update,
      { new: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};