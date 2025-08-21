const BarangMasuk = require("../models/BarangMasuk");
const BarangKeluar = require("../models/BarangKeluar");

exports.getLaporan = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    if (!type) {
      return res.status(400).json({ message: "Jenis laporan harus diisi" });
    }

    // Konversi tanggal
    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;
    if ((startDate && isNaN(start)) || (endDate && isNaN(end))) {
      return res.status(400).json({ message: "Format tanggal tidak valid" });
    }

    if (end) end.setHours(23, 59, 59, 999);

    // Build filter
    let filter = {};
    if (start || end) {
      filter.tanggal = {};
      if (start) filter.tanggal.$gte = start;
      if (end) filter.tanggal.$lte = end;
    }

    // console.log("🔎 Jenis:", type);
    // console.log("🔎 Filter:", filter);
    // console.log("📥 Type:", type); // DEBUG
    // console.log("📥 Start Date:", startDate); // DEBUG
    // console.log("📥 End Date:", endDate); // DEBUG
    // console.log("📥 Query params:", req.query); // DEBUG

    let laporan = [];
    const jenis = type.trim().toLowerCase();

    if (jenis === "barang masuk" || jenis === "barangmasuk") {
      laporan = await BarangMasuk.find(filter)
        .populate("barangId")   // ✅ sesuai schema Barang
        .sort({ tanggal: -1 });

      console.log("📦 Laporan Barang Masuk:", laporan); // DEBUG

      laporan = laporan.map(item => ({
        _id: item._id,
        namaBarang: item.barangId?.name || "-", // ✅ sesuai schema
        jumlah: item.jumlah,
        tanggal: item.tanggal
      }));

    } else if (jenis === "barang keluar" || jenis === "barangkeluar") {
      laporan = await BarangKeluar.find(filter)
        .populate("barangId")
        .sort({ tanggal: -1 });
        console.log("📦 Laporan Barang Keluar:", laporan); // DEBUG

      laporan = laporan.map(item => ({
        _id: item._id,
        namaBarang: item.barangId?.name || "-",
        jumlah: item.jumlah,
        tanggal: item.tanggal
      }));

    } else {
      return res.status(400).json({ message: "Jenis laporan tidak valid" });
    }

    res.json(laporan);
  } catch (err) {
    console.error("❌ Error getLaporan:", err);
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
  }
};
