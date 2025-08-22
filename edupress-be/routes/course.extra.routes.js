const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const c = require('../controllers/course.extra.controller');

// Public
router.get('/public', c.listCoursesPublic);         // GET /api/courses/public?q=
router.get('/public/:id', c.getCoursePublic);       // GET /api/courses/public/:id

// Customer actions
router.post('/:id/enroll', verifyToken, c.enroll);        // POST /api/courses/:id/enroll
router.get('/me/enrolled', verifyToken, c.myCourses);      // GET  /api/courses/me/enrolled
router.get('/:id/lessons', verifyToken, c.courseLessons);  // GET  /api/courses/:id/lessons
router.post('/:id/reviews', verifyToken, c.reviewCourse);  // POST /api/courses/:id/reviews

module.exports = router;
 