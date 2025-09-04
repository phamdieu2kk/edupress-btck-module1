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

// GET /blogs?category=xxx&tag=yyy&page=1&limit=6
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tag) filter.tags = req.query.tag;

    const total = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const blogs = await Blog.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ blogs, page, totalPages, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET /api/blogs?category=xxx&tag=xxx
router.get('/', async (req, res) => {
  try {
    const { category, tag } = req.query;
    let filter = {};
    if (category) filter.categories = category;
    if (tag) filter.tags = tag;

    const blogs = await Blog.find(filter)
      .populate('categories') // Lấy thông tin category
      .sort({ date: -1 });

    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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

// GET all categories
router.get("/categories/all", async (req, res) => {
  try {
    const blogs = await Blog.find({}, "category").exec();
    const categoryMap = {};
    blogs.forEach((b) => {
      if (b.category) categoryMap[b.category] = (categoryMap[b.category] || 0) + 1;
    });
    const categories = Object.keys(categoryMap).map((cat) => ({
      name: cat,
      count: categoryMap[cat],
    }));
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/tags/all", async (req, res) => {
  try {
    const blogs = await Blog.find({}, "tags").exec();
    const tagsSet = new Set();
    blogs.forEach((b) => b.tags?.forEach((t) => tagsSet.add(t)));
    res.json({ tags: Array.from(tagsSet) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET recent 3 posts
router.get("/recent/:count", async (req, res) => {
  const count = parseInt(req.params.count) || 3;
  const posts = await Blog.find()
    .sort({ date: -1 })
    .limit(count);
  res.json({ posts });
});

// Tạo blog
router.post("/", async (req, res) => {
  try {
    const { title, excerpt, content, image, author, tags, date, category } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const exists = await Blog.findOne({ slug });
    if (exists) return res.status(409).json({ message: "Slug đã tồn tại" });

    const blog = await Blog.create({ title, slug, excerpt, content, image, author, date, tags, category });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật blog
router.put("/:id", async (req, res) => {
  try {
    const { title, excerpt, content, image, author, tags, date, category } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (title && title !== blog.title) {
      const newSlug = title.toLowerCase().replace(/\s+/g, "-");
      const exists = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
      if (exists) return res.status(409).json({ message: "Slug đã tồn tại" });
      blog.slug = newSlug;
    }

    blog.title = title ?? blog.title;
    blog.excerpt = excerpt ?? blog.excerpt;
    blog.content = content ?? blog.content;
    blog.image = image ?? blog.image;
    blog.author = author ?? blog.author;
    blog.tags = tags ?? blog.tags;
    blog.date = date ?? blog.date;
    blog.category = category ?? blog.category; // <== Thêm trường category
    
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa blog
router.delete("/:id", async (req, res) => {
  try {
    const del = await Blog.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
