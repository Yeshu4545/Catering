import React, { useState, useEffect } from "react";
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

const Menu = () => {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("https://catering-47l4.onrender.com/api/menu", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load menu. Please try again later.");
        setLoading(false);
        console.log(err);
      }
    };

    fetchMenuItems();
  }, []);

  // Group items by category
  const categorizedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Check if item is in cart
  const isInCart = (itemId) => {
    return cart.some((item) => item._id === itemId);
  };

  // Get quantity in cart
  const getQuantity = (itemId) => {
    const item = cart.find((item) => item._id === itemId);
    return item ? item.quantity : 0;
  };

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Our Catering Menu</h2>
        <button onClick={() => navigate("/checkout")} className="view-cart-btn">
          View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </div>

      <div className="category-tabs">
        {Object.keys(categorizedItems).map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-items">
        {categorizedItems[activeCategory]?.map((item) => (
          <div
            key={item._id}
            className={`menu-item ${
              item.foodType === "Veg" ? "veg" : "non-veg"
            }`}
          >
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <div className="item-meta">
                <span className="item-badge">
                  {item.foodType === "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                </span>
                <span className="item-price">₹{item.price}</span>
              </div>
            </div>

            <div className="cart-controls">
              {isInCart(item._id) ? (
                <div className="quantity-controls">
                  <button onClick={() => addToCart({ ...item, quantity: -1 })}>
                    -
                  </button>
                  <span>{getQuantity(item._id)}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              ) : (
                <button className="add-to-cart" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
