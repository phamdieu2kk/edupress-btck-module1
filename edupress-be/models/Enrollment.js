const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  paid: { type: Boolean, default: false },
  pricePaid: { type: Number, default: 0 }
}, { timestamps: true, indexes: [{ fields: { user: 1, course: 1 }, options: { unique: true } }] });

module.exports = mongoose.model('Enrollment', enrollmentSchema);