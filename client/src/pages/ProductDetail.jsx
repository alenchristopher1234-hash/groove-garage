import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { API, RECOMMENDER } from '../api.js';

export default function ProductDetail() {
  const { id } = useParams();            // the :id from the URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    // 1. Get the album from Express
    fetch(`${API}/products/${id}`)
      .then((res) => res.json())
      .then((p) => {
        setProduct(p);
        // 2. Ask the Flask service for similar albums
        fetch(`${RECOMMENDER}/recommend/${p.genre}?exclude=${p._id}`)
          .then((res) => res.json())
          .then(setSimilar)
          .catch(() => setSimilar([]));
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div className="detail">
        <div className={`cover big genre-${product.genre}`}>{product.cover}</div>
        <div>
          <h1>{product.title}</h1>
          <p className="muted">{product.artist} · {product.genre}</p>
          <h2>₹{product.price}</h2>
          <p>{product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}</p>
          <button onClick={() => addToCart(product)} disabled={product.stock < 1}>
            Add to cart
          </button>
        </div>
      </div>

      {similar.length > 0 && (
        <section>
          <h2>You may also like</h2>
          <div className="grid">
            {similar.map((s) => (
              <Link key={s._id} to={`/product/${s._id}`} className="card">
                <div className={`cover genre-${product.genre}`}>{s.cover}</div>
                <h3>{s.title}</h3>
                <p className="muted">{s.artist}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
