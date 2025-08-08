const express = require('express');
const router = express.Router();
const Outgoing = require('../models/Outgoing');
const Item = require('../models/Item');

// Tambah barang keluar
router.post('/', async (req, res) => {
  try {
    const { itemId, quantity, note, removedBy } = req.body;

    const outgoing = new Outgoing({
      item: itemId,
      quantity,
      note,
      removedBy
    });

    await outgoing.save();

    // Kurangi stok item utama
    await Item.findByIdAndUpdate(itemId, { $inc: { stock: -quantity } });

    res.status(201).json(outgoing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lihat semua barang keluar
router.get('/', async (req, res) => {
  const list = await Outgoing.find().populate('item');
  res.json(list);
});

module.exports = router;
