import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { API } from '../api.js';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({ customerName: '', email: '', address: '' });
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    setError('');
    const order = {
      ...form,
      total,
      items: items.map((i) => ({ title: i.product.title, price: i.product.price, qty: i.qty }))
    };
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    if (res.ok) {
      clearCart();
      setPlaced(true);
    } else {
      setError('Could not place the order. Check all fields and try again.');
    }
  };

  if (placed) {
    return (
      <div>
        <h1>Order placed</h1>
        <p>Thank you! Your order has been saved.</p>
        <Link to="/">Keep shopping</Link>
      </div>
    );
  }

  if (items.length === 0) return <p>Your cart is empty. <Link to="/">Go to the shop</Link></p>;

  return (
    <>
      <h1>Checkout</h1>
      <form className="form" onSubmit={placeOrder}>
        <label>Full name
          <input name="customerName" value={form.customerName} onChange={handleChange} required />
        </label>
        <label>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>Delivery address
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </label>
        <h2>Total: ₹{total}</h2>
        {error && <p className="error">{error}</p>}
        <button type="submit">Place order</button>
      </form>
    </>
  );
}
