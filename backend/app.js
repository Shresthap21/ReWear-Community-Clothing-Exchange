const express = require('express');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const swapRoutes = require('./routes/swapRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
// app.use('/api/swaps', swapRoutes);
// app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('ReWear API Running'));


module.exports = app;