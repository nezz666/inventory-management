const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// GET semua item milik user
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find({ createdBy: req.user.username });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST tambah item baru -> otomatis set createdBy dari token
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, stock } = req.body;
    if (!name) return res.status(400).json({ msg: 'Nama item wajib' });

    const newItem = new Item({
      name,
      category,
      stock,
      createdBy: req.user.username
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE hanya jika milik user
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Item.findOneAndDelete({ _id: req.params.id, createdBy: req.user.username });
    if (!deleted) return res.status(404).json({ msg: 'Item tidak ditemukan atau bukan milik Anda' });
    res.json({ msg: 'Item dihapus', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update item (hanya milik user)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, category, stock } = req.body;
    const updated = await Item.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.username },
      { name, category, stock },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'Item tidak ditemukan atau bukan milik Anda' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;