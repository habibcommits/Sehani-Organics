import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Sehani Organics</h3>
            <p>Bringing you the purest organic products from Pakistan. Quality and authenticity guaranteed.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="https://wa.me/923001234567"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul className="footer-links">
              <li><i className="fas fa-map-marker-alt"></i> Islamabad, Pakistan</li>
              <li><i className="fas fa-phone"></i> +92 300 1234567</li>
              <li><i className="fas fa-envelope"></i> info@sehaniorganics.com</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 Sehani Organics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
