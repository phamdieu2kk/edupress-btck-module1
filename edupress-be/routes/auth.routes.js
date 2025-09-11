const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);

// OTP
router.post("/send-otp", authController.sendOtp);
router.post("/reset-password-otp", authController.resetPasswordWithOtp);

module.exports = router;
