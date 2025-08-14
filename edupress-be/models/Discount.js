const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  percent: { type: Number, min: 0, max: 100 },
  amount: { type: Number, min: 0 },
  startAt: Date,
  endAt: Date,
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);