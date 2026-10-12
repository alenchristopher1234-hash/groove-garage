import { createContext, useContext, useState } from 'react';

// Context = a "shared box" any component can read, so the cart works on every page
const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ product, qty }]

  const addToCart = (product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product._id === product._id);
      if (found) {
        return prev.map((i) =>
          i.product._id === product._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const changeQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i.product._id === id ? { ...i, qty } : i)));
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((i) => i.product._id !== id));

  const clearCart = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, changeQty, removeFromCart, clearCart, count, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
