import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart({ show, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!show) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className={`cart-modal ${show ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">{item.price} PKR</div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <>
            <div className="cart-total">
              Total: <span className="total-amount">{getTotal()} PKR</span>
            </div>
            <button className="btn checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
