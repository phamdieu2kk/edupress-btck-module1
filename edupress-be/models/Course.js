const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },

    image: { type: String }, // URL hoặc Base64 của ảnh

    originalPrice: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    duration: { type: Number },  // Chuyển từ String thành Number
    level: { type: String },
    lessons: { type: Number },
    category: { type: String },
    instructor: { type: String, required: true },

    rating: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date },

    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

courseSchema.virtual("finalPrice").get(function () {
  return this.price && this.price > 0 ? this.price : this.originalPrice;
});

courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Course", courseSchema);
