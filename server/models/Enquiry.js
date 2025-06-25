const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  message: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enquiry', enquirySchema);
