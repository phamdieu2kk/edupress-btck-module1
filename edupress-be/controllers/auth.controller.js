// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Register
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
//     }

//     // Kiểm tra email tồn tại
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email đã được đăng ký" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Tạo user mới
//     const user = await User.create({
//       fullName: name,
//       email,
//       password: hashedPassword,
//       role: "CUSTOMER",
//     });

//     res.status(201).json({ message: "Đăng ký thành công", userId: user._id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
//     }

//     // Tạo token JWT
//     const token = jwt.sign(
//       { id: user._id, role: user.role, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.json({
//       message: "Đăng nhập thành công",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
















const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ================= OTP Store (demo, production nên dùng Redis) =================
const otpStore = {}; 

// ================= Register =================
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     console.log("[REGISTER] Body:", req.body);

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log("[REGISTER] Email đã tồn tại:", email);
//       return res.status(400).json({ message: "Email đã được đăng ký" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       fullName: name,
//       email,
//       password: hashedPassword,
//       role: "CUSTOMER",
//     });

//     console.log("[REGISTER] User created:", user.email);
//     res.status(201).json({ message: "Đăng ký thành công", userId: user._id });
//   } catch (err) {
//     console.error("[REGISTER] Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// auth.controller.js - register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("[REGISTER] Body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được đăng ký" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName: name,
      email,
      password: hashedPassword,
      role: "CUSTOMER",
    });

    // 🔑 Tạo token ngay khi đăng ký
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Đăng ký thành công",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[REGISTER] Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};












// ================= Login =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("[LOGIN] Body:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const user = await User.findOne({ email });
    console.log("[LOGIN] User found:", user ? user.email : null);

    if (!user) {
      return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
    }

    console.log("[LOGIN] Comparing mật khẩu...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("[LOGIN] Compare result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[LOGIN] Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Send OTP =================
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log("[SEND OTP] Request email:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("[SEND OTP] Không tìm thấy user:", email);
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expire: Date.now() + 5 * 60 * 1000 };
    console.log("[SEND OTP] OTP generated:", otp, "for", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"EduPress" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP đổi mật khẩu EduPress",
      html: `<p>Mã OTP của bạn là: <strong>${otp}</strong>. Hết hạn sau 5 phút.</p>`,
    });

    console.log("[SEND OTP] OTP email sent to:", email);
    res.json({ message: "OTP đã được gửi vào email" });
  } catch (err) {
    console.error("[SEND OTP] Error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ================= Reset password with OTP =================
// exports.resetPasswordWithOtp = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   console.log("[RESET PASSWORD] Body:", req.body);

//   try {
//     const record = otpStore[email];
//     console.log("[RESET PASSWORD] OTP record:", record);

//     if (!record) {
//       return res.status(400).json({ message: "OTP không tồn tại" });
//     }
//     if (record.otp != otp) {
//       console.log("[RESET PASSWORD] Sai OTP:", otp);
//       return res.status(400).json({ message: "OTP không đúng" });
//     }
//     if (record.expire < Date.now()) {
//       console.log("[RESET PASSWORD] OTP hết hạn");
//       return res.status(400).json({ message: "OTP đã hết hạn" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("[RESET PASSWORD] Không tìm thấy user:", email);
//       return res.status(400).json({ message: "Email không tồn tại" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     delete otpStore[email];
//     console.log("[RESET PASSWORD] Password updated for:", email);

//     res.json({ message: "Đổi mật khẩu thành công" });
//   } catch (err) {
//     console.error("[RESET PASSWORD] Error:", err);
//     res.status(500).json({ message: "Lỗi server" });
//   }
// };



exports.resetPasswordWithOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  console.log("[RESET PASSWORD] Body:", req.body);

  try {
    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: "OTP không tồn tại" });
    if (record.otp != otp) return res.status(400).json({ message: "OTP không đúng" });
    if (record.expire < Date.now()) return res.status(400).json({ message: "OTP đã hết hạn" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    user.password = newPassword; // hash tự động trong pre("save")
    await user.save();

    delete otpStore[email];
    console.log("[RESET PASSWORD] Password updated for:", email);

    // ✅ Tạo token mới và trả về cho FE login ngay
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đổi mật khẩu thành công",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[RESET PASSWORD] Error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
