// routes/orders.routes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Enrollment = require("../models/Enrollment");

// POST /api/orders
// body: { items: [{ courseId }, ...] }
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Thiếu items" });
    }

    // Lấy giá từ courses
    const courseIds = items.map(i => i.courseId);
    const courses = await require("../models/Course").find({ _id: { $in: courseIds } });
    const mapPrice = new Map(courses.map(c => [String(c._id), c.price || 0]));

    const orderItems = items.map(i => ({
      course: i.courseId,
      price: mapPrice.get(String(i.courseId)) || 0
    }));

    const total = orderItems.reduce((sum, it) => sum + it.price, 0);

    // Tạo order với orderId kiểu string EDP...
    const orderId = "EDP" + Date.now(); // demo
    const order = await Order.create({
      user: req.user.id,
      orderId,
      items: orderItems,
      total,
      status: total === 0 ? "PAID" : "PENDING"
    });

    // Nếu free -> auto enroll
    if (total === 0) {
      for (const it of orderItems) {
        const exists = await Enrollment.findOne({ user: req.user.id, course: it.course });
        if (!exists) {
          await Enrollment.create({ user: req.user.id, course: it.course, paid: true, pricePaid: 0 });
        }
      }
    }

    res.status(201).json({ ok: true, order });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Có lỗi khi tạo order" });
  }
});

// GET /api/orders/my
router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.course");
    res.json({ ok: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi khi lấy orders" });
  }
});

// PUT /api/orders/:id/pay -> demo thanh toán thành công
router.put("/:id/pay", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "PAID") return res.json({ ok: true, order });

    order.status = "PAID";
    order.paymentId = "DEMO-" + Date.now();
    await order.save();

    // Enroll các khoá
    for (const it of order.items) {
      const exists = await Enrollment.findOne({ user: req.user.id, course: it.course });
      if (!exists) {
        await Enrollment.create({
          user: req.user.id,
          course: it.course,
          paid: true,
          pricePaid: it.price
        });
      }
    }

    res.json({ ok: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi khi thanh toán order" });
  }
});

module.exports = router;
