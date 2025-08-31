const express = require('express'); // PHẢI DÙNG express
const router = express.Router();
const authController = require('../controllers/auth.controller');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");
// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      to: email,
      from: "no-reply@yourapp.com",
      subject: "Password Reset Request",
      text: `You are receiving this email because you (or someone else) have requested to reset your password.
            Please click the following link to reset your password: 
            http://localhost:3000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ message: "Error sending email", error: err });
  }
});


module.exports = router;
