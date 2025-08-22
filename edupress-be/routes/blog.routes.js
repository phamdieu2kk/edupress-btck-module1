// const express = require('express');
// const Blog = require('../models/blog.model');
// const router = express.Router();

// // Lấy tất cả blog
// router.get('/', async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Lấy 1 blog theo slug
// router.get('/:slug', async (req, res) => {
//   try {
//     const blog = await Blog.findOne({ slug: req.params.slug });
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



const express = require("express");
const Blog = require("../models/blog.model");
const router = express.Router();

// Lấy tất cả blog với phân trang
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Blog.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      blogs,
      page,
      totalPages,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy 1 blog theo _id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

