import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  section: String,
  title: String,
  duration: String,
  preview: Boolean,
  completed: Boolean,
  locked: Boolean,
  highlight: Boolean,
});

export default mongoose.model("Lesson", LessonSchema);
