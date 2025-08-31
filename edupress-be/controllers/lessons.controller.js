const Lesson = require("../models/Lesson.model");
const mongoose = require("mongoose");

// Lấy tất cả lessons
exports.getAllLessons = async (req, res) => {
  try {
    let { courseId, page = 1, limit = 10, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (courseId) {
      if (!mongoose.Types.ObjectId.isValid(courseId))
        return res.status(400).json({ message: "Invalid courseId" });
      filter.courseId = courseId;
    }
    if (search) filter.title = { $regex: search, $options: "i" };

    const total = await Lesson.countDocuments(filter);
    const lessons = await Lesson.find(filter)
      .sort({ order: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      lessons,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("❌ getAllLessons error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 lesson
exports.getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid lesson id" });

    // Populate course info nếu cần
    const lesson = await Lesson.findById(id)
      .populate({ path: "courseId", select: "title" }); // Lấy tên course

    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    res.status(200).json(lesson);
  } catch (err) {
    console.error("❌ getLessonById error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Lấy lessons theo courseId và group section
exports.getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId))
      return res.status(400).json({ message: "Invalid courseId" });

    const lessons = await Lesson.find({ courseId }).sort({ order: 1 }).lean();

    // Group theo section nếu muốn
    const sections = {};
    lessons.forEach((lesson) => {
      const sec = lesson.section || "Default Section";
      if (!sections[sec]) sections[sec] = [];
      sections[sec].push(lesson);
    });

    res.status(200).json({ courseId, sections });
  } catch (err) {
    console.error("❌ getLessonsByCourse error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Tạo lesson mới
exports.createLesson = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(courseId))
      return res.status(400).json({ message: "Invalid courseId" });

    if (!title) return res.status(400).json({ message: "Title is required" });

    const newLesson = new Lesson(req.body);
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    console.error("❌ createLesson error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật lesson
exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid lesson id" });

    const updated = await Lesson.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Lesson not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ updateLesson error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Xóa lesson
exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid lesson id" });

    const deleted = await Lesson.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Lesson not found" });

    res.status(200).json({ message: "Lesson deleted" });
  } catch (err) {
    console.error("❌ deleteLesson error:", err);
    res.status(500).json({ message: err.message });
  }
};