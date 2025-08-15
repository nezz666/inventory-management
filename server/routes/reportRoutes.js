// server/routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const Incoming = require("../models/Incoming"); // model barang masuk
const Outgoing = require("../models/Outgoing"); // model barang keluar

// GET laporan filter barang masuk/keluar
router.get("/", async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    if (!type || !startDate || !endDate) {
      return res.status(400).json({ message: "Lengkapi parameter filter" });
    }

    const dateFilter = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    let data = [];

    if (type === "masuk") {
      data = await Incoming.find(dateFilter).populate("itemId");
    } else if (type === "keluar") {
      data = await Outgoing.find(dateFilter).populate("itemId");
    } else {
      return res.status(400).json({ message: "Tipe laporan tidak valid" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
