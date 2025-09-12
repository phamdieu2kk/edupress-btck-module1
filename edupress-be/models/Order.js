const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status:{ type: String, enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' },
  paymentId: String, // id giao dịch từ cổng thanh toán
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);


// // models/Order.js
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   orderId: { type: String, required: true, unique: true },
//   cart: [
//     {
//       course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//       quantity: Number,
//       checked: Boolean,
//     },
//   ],
//   total: { type: Number, required: true },
//   status: { type: String, default: "pending" },
// });

// module.exports = mongoose.model("Order", orderSchema);
