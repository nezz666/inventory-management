const BarangMasuk = require("../models/BarangMasuk");
const BarangKeluar = require("../models/BarangKeluar");

exports.getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};
    if (startDate && endDate) {
      filter.tanggal = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Hitung total masuk & keluar
    const totalMasuk = await BarangMasuk.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$jumlah" } } }
    ]);

    const totalKeluar = await BarangKeluar.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$jumlah" } } }
    ]);

    // Data tren harian
    const trenMasuk = await BarangMasuk.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$tanggal" } },
          total: { $sum: "$jumlah" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const trenKeluar = await BarangKeluar.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$tanggal" } },
          total: { $sum: "$jumlah" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalMasuk: totalMasuk[0]?.total || 0,
      totalKeluar: totalKeluar[0]?.total || 0,
      trenMasuk,
      trenKeluar
    });
  } catch (err) {
    console.error("❌ Error Dashboard:", err);
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
  }
};
