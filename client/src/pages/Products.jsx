import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { API } from '../api.js';

const GENRES = ['All', 'Jazz', 'Rock', 'Electronic', 'Pop', 'Classical'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  // Runs every time "search" or "genre" changes: asks Express for matching albums
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (genre !== 'All') params.append('genre', genre);

    fetch(`${API}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, genre]);

  return (
    <>
      <section className="hero">
        <h1>Records worth keeping.</h1>
        <p>Browse albums, search by artist, and build your collection.</p>
      </section>

      <div className="filters">
        <input
          placeholder="Search by album or artist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="chips">
          {GENRES.map((g) => (
            <button
              key={g}
              className={g === genre ? 'chip active' : 'chip'}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading albums...</p>}
      {!loading && products.length === 0 && (
        <p>No albums match your search. Try another name or genre.</p>
      )}
      <div className="grid">
        {products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </>
  );
}
