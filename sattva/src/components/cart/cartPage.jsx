import { useCart } from '../cart/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Quantity handlers
  const handleDecrease = (id, quantity) => {
    if (quantity > 1) updateQuantity(id, quantity - 1);
  };

  const handleIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  // Checkout handler
  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h3>Your Cart ({cart.length})</h3>
          <button className='close-btn' onClick={onClose}>×</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price} × {item.quantity}</p>
                </div>
                <div className="item-controls">
                  <button onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.id, item.quantity)}>+</button>
                  <button className='remove-btn ' onClick={() => removeFromCart(item.id)}>×</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartModal;