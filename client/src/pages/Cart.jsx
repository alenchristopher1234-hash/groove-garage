import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function Cart() {
  const { items, changeQty, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1>Your cart is empty</h1>
        <p><Link to="/">Find an album to add</Link></p>
      </div>
    );
  }

  return (
    <>
      <h1>Your cart</h1>
      <table className="table">
        <thead>
          <tr><th>Album</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>
          {items.map(({ product, qty }) => (
            <tr key={product._id}>
              <td>{product.cover} {product.title}</td>
              <td>₹{product.price}</td>
              <td>
                <button className="small" onClick={() => changeQty(product._id, qty - 1)}>-</button>
                <span className="qty">{qty}</span>
                <button className="small" onClick={() => changeQty(product._id, qty + 1)}>+</button>
              </td>
              <td>₹{product.price * qty}</td>
              <td><button className="small danger" onClick={() => removeFromCart(product._id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total: ₹{total}</h2>
      <Link to="/checkout"><button>Go to checkout</button></Link>
    </>
  );
}
