import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.get('/api/orders', config);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put(`/api/orders/${orderId}/status`, { status }, config);
      fetchOrders();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  if (loading) return <AdminLayout><div className="loading">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-orders">
        <h2>Order Management</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 8)}...</td>
                <td>
                  {order.isGuest ? (
                    <div>
                      <div>{order.guestInfo?.name}</div>
                      <small>{order.guestInfo?.email}</small>
                    </div>
                  ) : (
                    <div>
                      <div>{order.user?.name}</div>
                      <small>{order.user?.email}</small>
                    </div>
                  )}
                </td>
                <td>{order.orderItems.length} items</td>
                <td>{order.totalPrice} PKR</td>
                <td>
                  <span className={`badge badge-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    className="form-control"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;
