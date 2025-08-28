const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },

    // 💰 Giá gốc & giá giảm
    originalPrice: { type: Number, required: true, default: 0 }, // ví dụ: 69
    price: { type: Number, required: true, default: 0 }, // giá hiện tại / giá giảm, ví dụ: 59

    duration: { type: String },
    level: { type: String },
    lessons: { type: Number },
    category: { type: String },
    instructor: { type: String, required: true },

    // ✅ Thêm rating để filter/review
    rating: { type: Number, default: 0 },

    // ✅ Các trường mở rộng
    students: { type: Number, default: 0 }, // ví dụ: 790
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Virtual field: finalPrice (hiển thị giá dùng price nếu có, else originalPrice)
courseSchema.virtual("finalPrice").get(function () {
  return this.price && this.price > 0 ? this.price : this.originalPrice;
});

// Đảm bảo virtuals cũng hiển thị khi JSON hóa
courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Course", courseSchema);
