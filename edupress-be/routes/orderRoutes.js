const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const o = require('../controllers/order.controller');

router.post('/', verifyToken, o.createOrder);     // POST /api/orders
router.get('/my', verifyToken, o.myOrders);       // GET  /api/orders/my
router.put('/:id/pay', verifyToken, o.markPaid);  // PUT  /api/orders/:id/pay (demo)

module.exports = router;
