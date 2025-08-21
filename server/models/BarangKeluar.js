const mongoose = require("mongoose");

const barangMasukSchema = new mongoose.Schema({
  barangId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Item",
    required: true 
  },
  jumlah: { type: Number, required: true },
  tanggal: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("BarangKeluar", barangMasukSchema);
