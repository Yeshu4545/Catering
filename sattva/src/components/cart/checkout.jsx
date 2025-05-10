import { useState } from "react";
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    if (cart.length === 0) {
      setError("Your cart is empty");
      return false;
    }
    return true;
  };

  const handleOrder = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://catering-47l4.onrender.com/api/orders",
        {
          customerName: formData.name,
          phoneNumber: formData.phone,
          deliveryAddress: formData.address,
          items: cart.map((item) => ({
            menuItemId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/order-success", {
        state: {
          orderDetails: response.data.order,
        },
      });
    } catch (error) {
      let errorMessage = "Order failed. Please try again.";

      if (error.response) {
        errorMessage =
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage =
          "Server is not responding. Please check your connection.";
      } else {
        errorMessage = error.message || "Network error occurred";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Complete Your Order</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          pattern="[0-9]{10}"
          required
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Delivery Address *</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          required
        />
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item._id} className="order-item">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="order-total">
          <span>Total</span>
          <span>
            ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </span>
        </div>
      </div>

      <button
        onClick={handleOrder}
        disabled={isLoading || cart.length === 0}
        className={isLoading ? "loading" : ""}
      >
        {isLoading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
