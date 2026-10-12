// Run once with:  npm run seed   -> fills the database with sample albums
const mongoose = require('mongoose');
const Product = require('./models/Product');

const albums = [
  { title: 'Kind of Blue', artist: 'Miles Davis', genre: 'Jazz', price: 499, stock: 12, cover: '🎺' },
  { title: 'Take Five', artist: 'Dave Brubeck', genre: 'Jazz', price: 399, stock: 8, cover: '🎹' },
  { title: 'A Love Supreme', artist: 'John Coltrane', genre: 'Jazz', price: 549, stock: 6, cover: '🎷' },
  { title: 'Abbey Road', artist: 'The Beatles', genre: 'Rock', price: 599, stock: 15, cover: '🎸' },
  { title: 'Back in Black', artist: 'AC/DC', genre: 'Rock', price: 549, stock: 10, cover: '⚡' },
  { title: 'Rumours', artist: 'Fleetwood Mac', genre: 'Rock', price: 499, stock: 9, cover: '🌙' },
  { title: 'Random Access Memories', artist: 'Daft Punk', genre: 'Electronic', price: 649, stock: 7, cover: '🤖' },
  { title: 'Discovery', artist: 'Daft Punk', genre: 'Electronic', price: 599, stock: 5, cover: '🚀' },
  { title: 'Thriller', artist: 'Michael Jackson', genre: 'Pop', price: 599, stock: 20, cover: '🕺' },
  { title: '1989', artist: 'Taylor Swift', genre: 'Pop', price: 549, stock: 14, cover: '🦋' },
  { title: 'Sargam Classics', artist: 'Various Artists', genre: 'Classical', price: 349, stock: 11, cover: '🎻' },
  { title: 'Four Seasons', artist: 'Vivaldi', genre: 'Classical', price: 399, stock: 9, cover: '🍂' }
];

mongoose
  .connect('mongodb://127.0.0.1:27017/musicstore')
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(albums);
    console.log('Added', albums.length, 'albums');
    process.exit(0);
  })
  .catch((e) => { console.log(e.message); process.exit(1); });
