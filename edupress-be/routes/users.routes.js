const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authmiddleware");
const allowRoles = require("../middlewares/allowRoles.middleware");
const { getAllUsers, getUserProfile, updateUserProfile } = require("../controllers/users.controller");

// Lấy danh sách tất cả user (chỉ admin)
router.get("/", verifyToken, allowRoles("ADMIN"), getAllUsers);

// Lấy thông tin user hiện tại
router.get("/profile", verifyToken, allowRoles("CUSTOMER", "ADMIN"), getUserProfile);

// Cập nhật thông tin user hiện tại
router.put("/profile", verifyToken, allowRoles("CUSTOMER", "ADMIN"), updateUserProfile);

module.exports = router;
