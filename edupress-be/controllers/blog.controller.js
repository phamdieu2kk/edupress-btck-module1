const Blog = require('../models/blog.model');
const slugify = require('slugify');

// Public: list published blogs (search ?q=)
exports.listBlogs = async (req, res) => {
  const q = { status: 'PUBLISHED' };
  if (req.query.q) q.title = { $regex: req.query.q, $options: 'i' };
  const blogs = await Blog.find(q).sort({ publishedAt: -1 }).populate('author', 'fullName');
  res.json(blogs);
};

// Public: get by slug
exports.getBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: 'PUBLISHED' })
    .populate('author', 'fullName');
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};

// Protected: create
exports.createBlog = async (req, res) => {
  const { title, content, coverImage, tags, status } = req.body;
  const slug = slugify(title, { lower: true, strict: true });

  const exists = await Blog.findOne({ slug });
  if (exists) return res.status(409).json({ message: 'Slug đã tồn tại' });

  const blog = await Blog.create({
    title, slug, content, coverImage, tags, status: status || 'DRAFT',
    author: req.user.id,
    publishedAt: status === 'PUBLISHED' ? new Date() : null
  });
  res.status(201).json(blog);
};

// Protected: update
exports.updateBlog = async (req, res) => {
  const { title, content, coverImage, tags, status } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (title && title !== blog.title) {
    const newSlug = slugify(title, { lower: true, strict: true });
    const exists = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
    if (exists) return res.status(409).json({ message: 'Slug đã tồn tại' });
    blog.slug = newSlug;
  }

  blog.title = title ?? blog.title;
  blog.content = content ?? blog.content;
  blog.coverImage = coverImage ?? blog.coverImage;
  blog.tags = tags ?? blog.tags;
  if (status) {
    blog.status = status;
    blog.publishedAt = status === 'PUBLISHED' ? (blog.publishedAt || new Date()) : null;
  }

  await blog.save();
  res.json(blog);
};

// Protected: delete
exports.deleteBlog = async (req, res) => {
  const del = await Blog.findByIdAndDelete(req.params.id);
  if (!del) return res.status(404).json({ message: 'Blog not found' });
  res.json({ message: 'Deleted' });
};
