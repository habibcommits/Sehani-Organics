import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Cart from './Cart';
import './Header.css';

function Header() {
  const { getItemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            <i className="fas fa-honey-pot logo-icon"></i>
            <span className="logo-text">Sehani Organics</span>
          </Link>
          <ul className={`nav-links ${showMenu ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setShowMenu(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setShowMenu(false)}>Products</Link></li>
            {user ? (
              <>
                <li><span style={{ color: 'var(--primary)' }}>Hi, {user.name}</span></li>
                {isAdmin() && <li><Link to="/admin/dashboard" onClick={() => setShowMenu(false)}>Admin</Link></li>}
                <li><button onClick={handleLogout} className="btn-link">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setShowMenu(false)}>Login</Link></li>
                <li><Link to="/register" onClick={() => setShowMenu(false)}>Register</Link></li>
              </>
            )}
            <li className="cart-icon" onClick={() => setShowCart(true)}>
              <i className="fas fa-shopping-cart"></i>
              {getItemCount() > 0 && <span className="cart-count">{getItemCount()}</span>}
            </li>
          </ul>
          <div className="mobile-menu" onClick={() => setShowMenu(!showMenu)}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </div>
      <Cart show={showCart} onClose={() => setShowCart(false)} />
    </header>
  );
}

export default Header;
