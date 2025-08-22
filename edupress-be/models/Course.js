const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, default: 0 },
    duration: { type: String },
    level: { type: String },
    lessons: { type: Number },
    category: { type: String },
    instructor: { type: String, required: true },

    // ✅ Thêm rating để filter/review
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Course", courseSchema);
