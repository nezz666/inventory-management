require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());  // <-- PENTING: harus sebelum route

app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api', require('./routes/authRoutes'));

app.get('/api/headers', (req, res) => {
  res.json(req.headers);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
