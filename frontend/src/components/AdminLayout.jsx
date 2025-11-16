import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <i className="fas fa-shield-alt"></i>
          <h3>Admin Panel</h3>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-link">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className="admin-nav-link">
            <i className="fas fa-boxes"></i>
            <span>Products</span>
          </Link>
          <Link to="/admin/orders" className="admin-nav-link">
            <i className="fas fa-shopping-cart"></i>
            <span>Orders</span>
          </Link>
          <Link to="/admin/users" className="admin-nav-link">
            <i className="fas fa-users"></i>
            <span>Users</span>
          </Link>
          <Link to="/" className="admin-nav-link">
            <i className="fas fa-home"></i>
            <span>View Site</span>
          </Link>
          <button onClick={handleLogout} className="admin-nav-link logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
