// components/ServerError.jsx
import './ServerError.css';

const ServerError = ({ error, onRetry }) => {
  return (
    <div className="server-error-container">
      <div className="error-icon">⚠️</div>
      <h3>Order Processing Failed</h3>
      <p className="error-message">{error}</p>
      
      <div className="error-actions">
        <button onClick={onRetry} className="retry-btn">
          Try Again
        </button>
        <a href="/contact" className="contact-link">
          Contact Support
        </a>
      </div>
      
      <p className="error-note">
        If this continues, please save your order details and contact us.
      </p>
    </div>
  );
};

export default ServerError;