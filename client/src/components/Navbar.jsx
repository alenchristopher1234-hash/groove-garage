import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function Navbar() {
  const { count } = useCart();
  return (
    <header className="nav">
      <Link to="/" className="logo">Groove Garage</Link>
      <nav>
        <Link to="/">Shop</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/cart" className="cart-link">Cart ({count})</Link>
      </nav>
    </header>
  );
}
