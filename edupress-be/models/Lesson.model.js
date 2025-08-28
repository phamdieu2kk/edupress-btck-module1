const mongoose = require("mongoose");
const { Schema } = mongoose;

const subLessonSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
});

const lessonSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    section: { type: String }, // Ví dụ: "Chương 1"
    title: { type: String, required: true },
    duration: { type: String },
    order: { type: Number, default: 0 },
    videoUrl: { type: String, default: "" },
    subLessons: [subLessonSchema],
    slug: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
