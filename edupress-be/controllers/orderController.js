const Order = require('../models/Order');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// POST /api/orders
// body: { items: [{ courseId }, ...] }
exports.createOrder = async (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Thiếu items' });
  }

  // Lấy giá từ course, tính total
  const courseIds = items.map(i => i.courseId);
  const courses = await Course.find({ _id: { $in: courseIds } });

  const mapPrice = new Map(courses.map(c => [String(c._id), c.price || 0]));
  const orderItems = items.map(i => ({
    course: i.courseId,
    price: mapPrice.get(String(i.courseId)) || 0
  }));

  const total = orderItems.reduce((s, it) => s + it.price, 0);

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    total,
    status: total === 0 ? 'PAID' : 'PENDING',
  });

  // Nếu free -> auto enroll
  if (total === 0) {
    for (const it of orderItems) {
      const exists = await Enrollment.findOne({ user: req.user.id, course: it.course });
      if (!exists) {
        await Enrollment.create({ user: req.user.id, course: it.course, paid: true, pricePaid: 0 });
      }
    }
  }

  res.status(201).json(order);
};

// GET /api/orders/my
exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).populate('items.course');
  res.json(orders);
};

// (Demo) PUT /api/orders/:id/pay  -> giả lập thanh toán thành công
exports.markPaid = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.status === 'PAID') return res.json(order);

  order.status = 'PAID';
  order.paymentId = 'DEMO-' + Date.now();
  await order.save();

  // enroll các khoá
  for (const it of order.items) {
    const exists = await Enrollment.findOne({ user: req.user.id, course: it.course });
    if (!exists) {
      await Enrollment.create({ user: req.user.id, course: it.course, paid: true, pricePaid: it.price });
    }
  }

  res.json(order);
};
