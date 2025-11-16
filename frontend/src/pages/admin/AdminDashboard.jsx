import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.get('/api/admin/dashboard', config);
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout><div className="loading">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h2>Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <i className="fas fa-shopping-bag"></i>
            <div className="stat-info">
              <h3>{stats?.totalOrders || 0}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-dollar-sign"></i>
            <div className="stat-info">
              <h3>{stats?.totalRevenue || 0} PKR</h3>
              <p>Total Revenue</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <div className="stat-info">
              <h3>{stats?.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-boxes"></i>
            <div className="stat-info">
              <h3>{stats?.totalProducts || 0}</h3>
              <p>Total Products</p>
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>{order.user?.name || order.guestInfo?.name || 'Guest'}</td>
                  <td>{order.totalPrice} PKR</td>
                  <td><span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
