import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Pure Sidr Honey From Pakistan</h1>
          <p>Experience the authentic taste of nature's golden elixir, harvested with care from the pristine valleys of Pakistan.</p>
          <Link to="/products" className="btn">Shop Now</Link>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About Sehani Organics</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Sehani Organics is dedicated to bringing you the purest, most authentic Sidr Honey directly from the remote valleys of Pakistan. Our honey is harvested using traditional methods that preserve its natural enzymes, antioxidants, and healing properties.</p>
              <p>Each batch of our honey is carefully tested to ensure it meets the highest standards of purity and quality. We work directly with local beekeepers who practice sustainable beekeeping, ensuring the well-being of both the bees and the environment.</p>
              <p>Our Pure Sidr Honey is available in three convenient sizes: 250g, 500g, and 1kg packages. At just 3200 PKR per kg, you can enjoy nature's finest golden nectar at an affordable price.</p>
              <div className="pricing-info">
                <h3>Price: 3200 PKR per kg</h3>
                <p>250g: 800 PKR | 500g: 1600 PKR | 1kg: 3200 PKR</p>
              </div>
            </div>
            <div className="about-image">
              <img src="/images/about.png" alt="About Sehani Organics" />
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-check-circle"></i>
              <h3>100% Pure & Natural</h3>
              <p>No additives, no preservatives</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-leaf"></i>
              <h3>Organic Harvesting</h3>
              <p>Sustainably sourced from Pakistan</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-certificate"></i>
              <h3>Quality Assured</h3>
              <p>Lab tested for purity</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-shipping-fast"></i>
              <h3>Fast Delivery</h3>
              <p>Delivered fresh to your door</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
