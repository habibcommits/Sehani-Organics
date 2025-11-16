import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-navbar">
          <div className="admin-brand">
            <i className="fas fa-shield-alt"></i>
            <h3>Sehani Organics Admin</h3>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>

          <nav className={`admin-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link 
              to="/admin/dashboard" 
              className={`admin-nav-link ${isActive('/admin/dashboard')}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/admin/products" 
              className={`admin-nav-link ${isActive('/admin/products')}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-boxes"></i>
              <span>Products</span>
            </Link>
            <Link 
              to="/admin/orders" 
              className={`admin-nav-link ${isActive('/admin/orders')}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </Link>
            <Link 
              to="/admin/users" 
              className={`admin-nav-link ${isActive('/admin/users')}`}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-users"></i>
              <span>Users</span>
            </Link>
            <button onClick={handleLogout} className="admin-nav-link logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
