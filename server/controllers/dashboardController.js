const BarangMasuk = require("../models/BarangMasuk");
const BarangKeluar = require("../models/BarangKeluar");

// 🔹 Summary Data
exports.getSummary = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    // default: hari ini
    if (!startDate || !endDate) {
      const today = new Date();
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
    } else {
      startDate = new Date(startDate)
      startDate.setHours(0, 0, 0, 0); // awal hari
      endDate = new Date(endDate)
      endDate.setHours(23, 59, 59, 999); // akhir hari
    }

    const filter = { tanggal: { $gte: startDate, $lte: endDate } };

    const masuk = await BarangMasuk.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$jumlah" } } },
    ]);

    const keluar = await BarangKeluar.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$jumlah" } } },
    ]);


    res.json({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      masuk: masuk[0]?.total || 0,
      keluar: keluar[0]?.total || 0,
    });
  } catch (err) {
    console.error("Summary error:", err.message);
    res.status(500).json({ message: "Gagal ambil summary" });
  }
};

// 🔹 Series Data (harian)
exports.getSeries = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    // default: hari ini
    if (!startDate || !endDate) {
      const today = new Date();
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
    } else {
      startDate = new Date(startDate)
      startDate.setHours(0, 0, 0, 0); // awal hari
      endDate = new Date(endDate)
      endDate.setHours(23, 59, 59, 999); // akhir hari
    }

    const filter = { tanggal: { $gte: startDate, $lte: endDate } };

    const masuk = await BarangMasuk.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$tanggal" } },
          total: { $sum: "$jumlah" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const keluar = await BarangKeluar.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$tanggal" } },
          total: { $sum: "$jumlah" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // gabungkan masuk & keluar
    const map = {};
    masuk.forEach((m) => {
      map[m._id] = { date: m._id, masuk: m.total, keluar: 0 };
    });
    keluar.forEach((k) => {
      if (!map[k._id]) map[k._id] = { date: k._id, masuk: 0, keluar: 0 };
      map[k._id].keluar = k.total;
    });

    res.json(Object.values(map));
  } catch (err) {
    console.error("Series error:", err.message);
    res.status(500).json({ message: "Gagal ambil series" });
  }
};
