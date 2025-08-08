const express = require('express');
const router = express.Router();
const Incoming = require('../models/Incoming');
const Item = require('../models/Item');

// Tambah barang masuk
router.post('/', async (req, res) => {
  try {
    const { itemId, quantity, note, addedBy } = req.body;

    const incoming = new Incoming({
      item: itemId,
      quantity,
      note,
      addedBy
    });

    await incoming.save();

    // Tambah stok ke item utama
    await Item.findByIdAndUpdate(itemId, { $inc: { stock: quantity } });

    res.status(201).json(incoming);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lihat semua barang masuk
router.get('/', async (req, res) => {
  const list = await Incoming.find().populate('item');
  res.json(list);
});

module.exports = router;
