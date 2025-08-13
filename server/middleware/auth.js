const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  console.log("Header Authorization:", authHeader);
  
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  console.log("Token yang didapat:", token);

  if (!token) {
    console.log("Token tidak ditemukan");
    return res.status(401).json({ msg: 'Tidak ada token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Payload decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error verify token:", err.message);
    return res.status(401).json({ msg: 'Token tidak valid' });
  }
};
