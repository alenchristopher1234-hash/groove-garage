import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="card">
      <Link to={`/product/${product._id}`}>
        <div className={`cover genre-${product.genre}`}>{product.cover}</div>
      </Link>
      <h3>{product.title}</h3>
      <p className="muted">{product.artist} · {product.genre}</p>
      <div className="row">
        <strong>₹{product.price}</strong>
        <button onClick={() => addToCart(product)} disabled={product.stock < 1}>
          {product.stock < 1 ? 'Sold out' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}
