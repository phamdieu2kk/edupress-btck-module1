const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  cart: [
    {
      course: { title: String, price: Number },
      quantity: { type: Number, default: 1 },
      checked: { type: Boolean, default: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
