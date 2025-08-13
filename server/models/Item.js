const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  createdBy: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
