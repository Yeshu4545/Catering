// // components/Menu.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Menu() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('Starters');

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/menu/${activeCategory}`);
//         setMenuItems(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [activeCategory]);

//   const addToCart = (item) => {
//     // Implement your cart logic here
//     console.log('Added to cart:', item);
//   };

//   if (loading) return <div>Loading menu...</div>;

//   return (
//     <div className="menu-container">
//       <h1>Our Catering Menu</h1>
      
//       <div className="category-tabs">
//         {['Starters', 'Main Course', 'Desserts'].map(category => (
//           <button
//             key={category}
//             onClick={() => setActiveCategory(category)}
//             className={activeCategory === category ? 'active' : ''}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       <div className="menu-items">
//         {menuItems.map(item => (
//           <div key={item._id} className="menu-item">
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//             <div className="item-details">
//               <span className="price">${item.price}</span>
//               <span className={`food-type ${item.foodType.toLowerCase()}`}>
//                 {item.foodType}
//               </span>
//             </div>
//             <button onClick={() => addToCart(item)}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Menu;