const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy admin user
const admin = {
  username: 'admin',
  password: '$2a$10$0EbeFyl1ZxqQGc8PplK2u.0qlF8t0sqhRCLO5YsvTD5qExhdOYzOa' // hash dari: admin123
};

// POST: /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== admin.username) {
    return res.status(400).json({ msg: 'Username salah' });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ msg: 'Password salah' });

  const token = jwt.sign({ username }, 'secret123', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
