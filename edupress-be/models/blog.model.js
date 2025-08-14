const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String },
    image: { type: String },
    author: { type: String, default: "Admin" },
    date: { type: Date, default: Date.now },
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
