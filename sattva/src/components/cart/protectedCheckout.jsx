import { Navigate } from 'react-router-dom';
import { useCart } from "../cart/CartContext"
import PropTypes from 'prop-types';

const ProtectedCheckout = ({ children }) => {
  const { cart } = useCart();
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  
  // Otherwise render the checkout component
  return children;
};

ProtectedCheckout.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedCheckout;