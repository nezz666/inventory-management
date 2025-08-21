const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
  namaBarang: { type: String, required: true },
  kategori: { type: String, required: true },
  stok: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Barang", barangSchema);
