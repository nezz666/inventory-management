const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
});

module.exports = mongoose.model('Item', itemSchema);
