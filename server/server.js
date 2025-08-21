require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboardRoutes");
const barangMasukRoutes = require("./routes/barangMasuk");
const barangKeluarRoutes = require("./routes/barangKeluar");
const reportRoutes = require("./routes/reportRoutes");
const laporanRoutes = require("./routes/laporanRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api', require('./routes/authRoutes'));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/barang-masuk", barangMasukRoutes);
app.use("/api/barang-keluar", barangKeluarRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/laporan", laporanRoutes);

app.get('/api/headers', (req, res) => {
  res.json(req.headers);
});

app.get("/routes/laporan", async (req, res) => {
  try {
    const { jenis, startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Tanggal awal dan akhir harus diisi" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // agar ambil sampai akhir hari

    let query = { tanggal: { $gte: start, $lte: end } };

    if (jenis === "Barang Masuk") {
      query.tipe = "masuk";
    } else if (jenis === "Barang Keluar") {
      query.tipe = "keluar";
    }

    const data = await LaporanModel.find(query).sort({ tanggal: -1 });
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data laporan" });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

