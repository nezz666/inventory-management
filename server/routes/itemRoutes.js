const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post('/', async (req, res) => {
  const { name, category, stock } = req.body;
  const newItem = new Item({ name, category, stock });
  await newItem.save();
  res.status(201).json(newItem);
});

module.exports = router;
