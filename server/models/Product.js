const mongoose = require('mongoose');

// A "schema" describes what one album looks like in the database
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 10 },
  cover: { type: String, default: '🎵' }   // an emoji used as the album cover
});

module.exports = mongoose.model('Product', productSchema);
