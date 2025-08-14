const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  instructor: { type: String },
  category: { type: String },
  rating: { type: Number },
  lessons: { type: Number },
  students: { type: Number },
  duration: { type: String },
  level: { type: String },
  price: { type: Number },
  publishedAt: { type: Date },
  isFeatured: { type: Boolean },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
