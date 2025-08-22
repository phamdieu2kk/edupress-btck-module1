// // routes/course.routes.js
// const express = require('express');
// const Course = require('../models/Course');
// const router = express.Router();

// // GET /api/courses?page=1&limit=8&search=js&category=Commercial,Office&price=Free&review=4&level=Beginner
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 8;
//     const skip = (page - 1) * limit;

//     // Build filter object dynamically
//     const filter = {};

//     // Search by title
//     if (req.query.search) {
//       filter.title = { $regex: req.query.search, $options: 'i' }; // case-insensitive
//     }

//     // Category filter (comma-separated)
//     if (req.query.category) {
//       const categories = req.query.category.split(',');
//       filter.category = { $in: categories };
//     }

//     // Instructor filter (comma-separated)
//     if (req.query.instructor) {
//       const instructors = req.query.instructor.split(',');
//       filter.instructor = { $in: instructors };
//     }

//     // Price filter
//     if (req.query.price) {
//       if (req.query.price === 'Free') filter.price = 0;
//       else if (req.query.price === 'Paid') filter.price = { $gt: 0 };
//     }

//     // Review filter (rating >= value)
//     if (req.query.review) {
//       const rating = parseInt(req.query.review);
//       if (!isNaN(rating)) filter.rating = { $gte: rating };
//     }

//     // Level filter
//     if (req.query.level && req.query.level !== 'All levels') {
//       filter.level = req.query.level;
//     }

//     // Count total documents after filter
//     const total = await Course.countDocuments(filter);

//     // Fetch courses with pagination
//     const courses = await Course.find(filter)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       courses,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /api/courses/:id
// router.get('/:id', async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: 'Course not found' });
//     res.json(course);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;



const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// GET /api/courses?page=1&limit=8&search=js&category=Commercial,Office&price=Free&review=4&level=Beginner
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const filter = {};

    // Search by title
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }

    // Category filter
    if (req.query.category) {
      filter.category = { $in: req.query.category.split(",") };
    }

    // Instructor filter
    if (req.query.instructor) {
      filter.instructor = { $in: req.query.instructor.split(",") };
    }

    // Price filter
    if (req.query.price === "Free") filter.price = 0;
    else if (req.query.price === "Paid") filter.price = { $gt: 0 };

    // Review filter
    if (req.query.review) {
      const rating = parseInt(req.query.review);
      if (!isNaN(rating)) filter.rating = { $gte: rating };
    }

    // Level filter
    if (req.query.level && req.query.level !== "All levels") {
      filter.level = req.query.level;
    }

    const total = await Course.countDocuments(filter);

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      courses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/courses/:id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
