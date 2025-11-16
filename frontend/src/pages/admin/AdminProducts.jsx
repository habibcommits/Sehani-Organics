import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Honey',
    stock: '',
    weight: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formData, config);
      } else {
        await axios.post('/api/products', formData, config);
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      weight: product.weight
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`/api/products/${id}`, config);
      fetchProducts();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'Honey',
      stock: '',
      weight: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) return <AdminLayout><div className="loading">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-products">
        <div className="admin-header">
          <h2>Product Management</h2>
          <button className="btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {showForm && (
          <div className="admin-form">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Weight</label>
                  <input type="text" name="weight" className="form-control" value={formData.weight} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (PKR)</label>
                  <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Image URL</label>
                  <input type="text" name="image" className="form-control" value={formData.image} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="btn">{editingProduct ? 'Update' : 'Create'} Product</button>
            </form>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price} PKR</td>
                <td>{product.stock}</td>
                <td>{product.weight}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminProducts;
