const express = require("express");
const router = express.Router();

const BarangMasuk = require("../models/BarangMasuk");
const Barang = require("../models/Barang");

// POST barang masuk
router.post("/", async (req, res) => {
  try {
    const { barangId, jumlah } = req.body;

    const transaksi = await BarangMasuk.create({ barangId, jumlah });
    await Barang.findByIdAndUpdate(barangId, { $inc: { stok: jumlah } });

    res.status(201).json({ message: "Barang masuk dicatat", transaksi });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET barang masuk (filter tanggal optional)
router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let filter = {};
    if (startDate && endDate) {
      filter.tanggal = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const data = await BarangMasuk.find(filter)
      .populate("barangId", "nama kategori");

    console.log("📦 Data BarangMasuk:", JSON.stringify(data, null, 2)); // cek output
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
