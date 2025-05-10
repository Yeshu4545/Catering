import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import logo from '../../../assets/Logo4.png';
import CartModal from '../cart/cartPage';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Sattva" className="logo" />
          <span className="brand-name">Sattva</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/menu" className="nav-link" onClick={closeMenu}>Menu</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
        </nav>

        <div className="nav-actions">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="cart-button"
          >
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
            <Link to="/menu" className="mobile-nav-link" onClick={closeMenu}>Menu</Link>
            <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>About</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
          </nav>
        </div>

        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </header>
  );
};

export default Navbar;