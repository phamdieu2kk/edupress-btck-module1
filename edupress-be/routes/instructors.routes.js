// routes/instructors.routes.js
const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// GET /api/instructors -> trả về danh sách instructor + count
router.get("/", async (req, res) => {
  try {
    const instructors = await Course.aggregate([
      {
        $group: {
          _id: "$instructor",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json(
      instructors.map((i) => ({
        name: i._id,
        count: i.count,
      }))
    );
  } catch (err) {
    console.error("❌ Error fetching instructors:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
