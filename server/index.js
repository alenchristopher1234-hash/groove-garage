const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
app.use(cors());           // lets the React app (another port) talk to this server
app.use(express.json());   // lets the server read JSON sent by React

// ---- Connect to MongoDB ----
mongoose
  .connect('mongodb://127.0.0.1:27017/musicstore')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err.message));

// ---- PRODUCTS (full CRUD) ----

// READ all (with optional search and genre filter)
app.get('/api/products', async (req, res) => {
  const { search, genre } = req.query;
  const filter = {};
  if (genre) filter.genre = genre;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { artist: { $regex: search, $options: 'i' } }
    ];
  }
  const products = await Product.find(filter);
  res.json(products);
});

// READ one
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: 'Bad id' });
  }
});

// CREATE
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// UPDATE
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// DELETE
app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// ---- ORDERS ----
app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

app.listen(5000, () => console.log('Express server running on http://localhost:5000'));
