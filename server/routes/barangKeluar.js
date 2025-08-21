const express = require("express");
const router = express.Router();

const BarangKeluar = require("../models/BarangKeluar");
const Barang = require("../models/Barang");

// POST barang keluar
router.post("/", async (req, res) => {
  try {
    const { barangId, jumlah } = req.body;

    // Catat transaksi keluar
    const transaksi = await BarangKeluar.create({ barangId, jumlah });

    // Kurangi stok barang
    await Barang.findByIdAndUpdate(barangId, { $inc: { stok: -jumlah } });

    res.status(201).json({ message: "Barang keluar dicatat", transaksi });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET barang keluar (filter tanggal optional)
router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let filter = {};
    if (startDate && endDate) {
      filter.tanggal = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const data = await BarangKeluar.find(filter).populate("barangId", "nama kategori");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
