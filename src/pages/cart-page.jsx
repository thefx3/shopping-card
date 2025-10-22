// src/pages/cart-page.jsx
import '../styles/pages/cart-page.css';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/store" className="back-to-store">Go back to store</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h1>Cart</h1>

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-img" />

            <div className="cart-item-details">
              <div className="details">
                  <h3>{item.title}</h3>
                  <p className="category">{capitalizeFirstLetter(item.category)}</p>
              </div>

              <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="price">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Summary</h2>
        <p>Total: <strong>{totalPrice.toFixed(2)} €</strong></p>
        <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;
