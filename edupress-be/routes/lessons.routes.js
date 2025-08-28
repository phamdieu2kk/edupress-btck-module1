const express = require("express");
const lessonController = require("../controllers/lessons.controller");
const router = express.Router();

router.get("/", lessonController.getAllLessons);
router.get("/course/:courseId", lessonController.getLessonsByCourse);
router.get("/:id", lessonController.getLessonById);
router.post("/", lessonController.createLesson);
router.put("/:id", lessonController.updateLesson);
router.delete("/:id", lessonController.deleteLesson);

module.exports = router;
