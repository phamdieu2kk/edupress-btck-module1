const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,
  title: String,
  duration: String,
  order: Number,
  section: String
});

module.exports = mongoose.model("Lesson", lessonSchema);
