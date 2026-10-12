import { useEffect, useState } from 'react';
import { API } from '../api.js';

const EMPTY = { title: '', artist: '', genre: 'Rock', price: '', stock: 10, cover: '🎵' };

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const load = () => {
    fetch(`${API}/products`).then((r) => r.json()).then(setProducts);
    fetch(`${API}/orders`).then((r) => r.json()).then(setOrders);
  };
  useEffect(load, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // CREATE or UPDATE depending on whether we are editing
  const save = async (e) => {
    e.preventDefault();
    const url = editingId ? `${API}/products/${editingId}` : `${API}/products`;
    await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) })
    });
    setForm(EMPTY);
    setEditingId(null);
    load();
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({ title: p.title, artist: p.artist, genre: p.genre, price: p.price, stock: p.stock, cover: p.cover });
    window.scrollTo(0, 0);
  };

  // DELETE
  const remove = async (id) => {
    if (!window.confirm('Delete this album?')) return;
    await fetch(`${API}/products/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <>
      <h1>Admin: manage albums</h1>
      <form className="form" onSubmit={save}>
        <label>Title <input name="title" value={form.title} onChange={handleChange} required /></label>
        <label>Artist <input name="artist" value={form.artist} onChange={handleChange} required /></label>
        <label>Genre
          <select name="genre" value={form.genre} onChange={handleChange}>
            {['Jazz', 'Rock', 'Electronic', 'Pop', 'Classical'].map((g) => <option key={g}>{g}</option>)}
          </select>
        </label>
        <label>Price (₹) <input name="price" type="number" value={form.price} onChange={handleChange} required /></label>
        <label>Stock <input name="stock" type="number" value={form.stock} onChange={handleChange} /></label>
        <label>Cover emoji <input name="cover" value={form.cover} onChange={handleChange} /></label>
        <button type="submit">{editingId ? 'Save changes' : 'Add album'}</button>
        {editingId && (
          <button type="button" className="small" onClick={() => { setEditingId(null); setForm(EMPTY); }}>
            Cancel
          </button>
        )}
      </form>

      <table className="table">
        <thead>
          <tr><th>Album</th><th>Artist</th><th>Genre</th><th>Price</th><th>Stock</th><th></th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.cover} {p.title}</td>
              <td>{p.artist}</td>
              <td>{p.genre}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="small" onClick={() => startEdit(p)}>Edit</button>
                <button className="small danger" onClick={() => remove(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Orders received ({orders.length})</h2>
      {orders.length === 0 && <p>No orders yet. Place one from the shop.</p>}
      {orders.map((o) => (
        <div className="order" key={o._id}>
          <strong>{o.customerName}</strong> · {o.email} · ₹{o.total}
          <div className="muted">{o.items.map((i) => `${i.title} x${i.qty}`).join(', ')}</div>
        </div>
      ))}
    </>
  );
}
