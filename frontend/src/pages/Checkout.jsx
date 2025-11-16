import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        orderItems: cart.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: getTotal(),
        guestInfo: !user ? formData : null,
        userId: user?._id || null
      };

      await axios.post('/api/orders', orderData);
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h2 className="section-title">Checkout</h2>
          <p style={{ textAlign: 'center', padding: '2rem' }}>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h2 className="section-title">Checkout</h2>
        <div className="checkout-content">
          <div className="checkout-form">
            <h3>Delivery Information</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div key={item._id} className="summary-item">
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.name}</p>
                  <p className="summary-item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="summary-item-price">{item.price * item.quantity} PKR</p>
              </div>
            ))}
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>{getTotal()} PKR</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
