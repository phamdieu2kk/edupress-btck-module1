const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const p = require('../controllers/profile.controller');

router.get('/me', verifyToken, p.getMe);                     // GET    /api/profile/me
router.put('/', verifyToken, p.updateProfile);               // PUT    /api/profile
router.put('/change-password', verifyToken, p.changePassword);// PUT   /api/profile/change-password
router.delete('/', verifyToken, p.deleteAccount);            // DELETE /api/profile
router.post('/request-provider', verifyToken, p.requestProvider); // POST /api/profile/request-provider

module.exports = router;
