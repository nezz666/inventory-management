const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const itemRoutes = require('./routes/itemRoutes');
const incomingRoutes = require('./routes/incomingRoutes');
const outgoingRoutes = require('./routes/outgoingRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/items', itemRoutes);
app.use('/api/incoming', incomingRoutes);
app.use('/api/outgoing', outgoingRoutes);
app.use('/api', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Inventory Management API is running...');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));
  })
  .catch(err => console.log('❌ MongoDB connection error:', err));

console.log('Server initialized with routes for items, incoming, outgoing, and authentication.');
console.log('Ensure MongoDB is running and .env file is configured with MONGO_URI.');
