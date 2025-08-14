const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/roles');
const c = require('../controllers/admin.controller');

router.use(auth, allowRoles('ADMIN'));

router.get('/providers/applications', c.listProviderApplications);
router.post('/providers/applications/:id/approve', c.approveProvider);
router.post('/providers/applications/:id/reject', c.rejectProvider);

router.get('/courses/pending', c.listPendingCourses);
router.post('/courses/:id/approve', c.approveCourse);
router.post('/courses/:id/reject', c.rejectCourse);

router.post('/users/:id/disable', c.disableUser);

module.exports = router;
