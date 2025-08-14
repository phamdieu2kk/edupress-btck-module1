const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/roles');
const c = require('../controllers/providers.controller');

// Customer -> apply NCC
router.post('/apply', auth, allowRoles('CUSTOMER'), c.applyProvider);

// Provider: courses
router.post('/courses', auth, allowRoles('PROVIDER'), c.createCourse);
router.put('/courses/:id', auth, allowRoles('PROVIDER'), c.updateCourse);
router.delete('/courses/:id', auth, allowRoles('PROVIDER'), c.deleteCourse);

// Provider: lessons
router.post('/courses/:courseId/lessons', auth, allowRoles('PROVIDER'), c.addLesson);
router.put('/lessons/:lessonId', auth, allowRoles('PROVIDER'), c.updateLesson);
router.delete('/lessons/:lessonId', auth, allowRoles('PROVIDER'), c.deleteLesson);

// Provider: discounts
router.post('/discounts', auth, allowRoles('PROVIDER'), c.createDiscount);
router.put('/discounts/:id', auth, allowRoles('PROVIDER'), c.updateDiscount);
router.delete('/discounts/:id', auth, allowRoles('PROVIDER'), c.deleteDiscount);

module.exports = router;
