import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <section className="products-page">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.stock <= 0 && <div className="out-of-stock">Out of Stock</div>}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">{product.price} PKR</div>
                <p className="product-description">{product.description}</p>
                <p className="product-stock">Stock: {product.stock} available</p>
                <button
                  className="btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
