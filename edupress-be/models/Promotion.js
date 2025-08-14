const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['TIME_WINDOW', 'QUANTITY', 'OTHER'], default: 'OTHER' },
  config: {}, // tuỳ nghi
  startAt: Date,
  endAt: Date,
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);