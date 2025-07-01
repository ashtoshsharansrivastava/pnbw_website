const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  images: [String],
  status: String,
  rating: Number,
  description: String,
});

module.exports = mongoose.model('Property', propertySchema);
