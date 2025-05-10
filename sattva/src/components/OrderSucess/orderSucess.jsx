import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './orderSucess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails || {};

  // Redirect to home if no order details (prevent direct access)
  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  return (
    <div className="order-success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        
        <div className="order-details">
          <h3>Order Summary</h3>
          <p><strong>Order ID:</strong> {orderDetails._id || 'N/A'}</p>
          <p><strong>Customer Name:</strong> {orderDetails.customerName || 'N/A'}</p>
          <p><strong>Total Amount:</strong> ₹{orderDetails.totalAmount || '0'}</p>
          
          <div className="items-list">
            <h4>Items Ordered:</h4>
            <ul>
              {orderDetails.items?.map((item, index) => (
                <li key={index}>
                  {item.name || 'Item'} × {item.quantity} = ₹{(item.price * item.quantity) || '0'}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="whatsapp-notification">
          <p>A confirmation has been sent to your WhatsApp number.</p>
          <p>We'll notify you when your order is ready.</p>
        </div>

        <button 
          className="back-to-home"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;