const mongoose = require('mongoose');

const providerApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: String,
  description: String,
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('ProviderApplication', providerApplicationSchema);