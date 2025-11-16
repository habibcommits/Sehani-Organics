import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.get('/api/admin/users', config);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`/api/admin/users/${userId}`, config);
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  if (loading) return <AdminLayout><div className="loading">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-users">
        <h2>User Management</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? '✓' : '✗'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {!u.isAdmin && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;
