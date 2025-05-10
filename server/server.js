require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const twilio = require('twilio');
const nodemailer = require('nodemailer'); // Added NodeMailer

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Twilio
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// Initialize NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT']
}));
app.use(express.json());

// MongoDB Connection (unchanged)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sattva-catering', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas (unchanged)
const menuItemSchema = new mongoose.Schema({
  // _id: {type: String,  required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Starters', 'Main Course', 'Desserts'], required: true },
  foodType: { type: String, enum: ['Veg', 'Non-Veg'], required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1, min: 1 }
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true, validate: {
    validator: v => /^[0-9]{10}$/.test(v),
    message: props => `${props.value} is not a valid phone number!`
  }},
  deliveryAddress: { type: String, required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['Pending', 'Preparing', 'Ready', 'Delivered'], default: 'Pending' },
  email: { type: String }, // Added email field
  createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Order = mongoose.model('Order', orderSchema);

// Email Notification Function
async function sendOrderEmail(email, orderDetails) {
  if (!email) return false;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation #${orderDetails.orderId}`,
    html: `
      <h1>Thank you for your order, ${orderDetails.customerName}!</h1>
      <h2>Order #${orderDetails.orderId}</h2>
      <h3>Items Ordered:</h3>
      <ul>
        ${orderDetails.items.map(item => `
          <li>${item.name} - ${item.quantity} x ₹${item.price}</li>
        `).join('')}
      </ul>
      <h3>Total Amount: ₹${orderDetails.totalAmount}</h3>
      <p>Delivery Address: ${orderDetails.deliveryAddress}</p>
      <p>We'll notify you when your order is ready!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', email);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// Updated POST /api/orders endpoint
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, phoneNumber, deliveryAddress, items, email } = req.body;
    
    if (!customerName || !phoneNumber || !deliveryAddress || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const menuItems = await MenuItem.find({ _id: { $in: items.map(i => i.menuItemId) } });
    if (menuItems.length !== items.length) {
      return res.status(400).json({ error: 'One or more menu items not found' });
    }

    const orderItems = items.map(item => {
      const menuItem = menuItems.find(mi => mi._id.equals(item.menuItemId));
      return {
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      };
    });

    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = new Order({
      customerName,
      phoneNumber,
      deliveryAddress,
      items: orderItems,
      totalAmount,
      email // Save email with order
    });

    await newOrder.save();

    // Send notifications (both async)
    if (email) {
      sendOrderEmail(email, {
        customerName,
        orderId: newOrder._id,
        items: orderItems,
        totalAmount,
        deliveryAddress
      }).catch(err => console.error('Email error:', err));
    }

    if (twilioClient) {
      // Your existing WhatsApp notification code
    }

    res.status(201).json({
      success: true,
      order: newOrder
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
});
// Add this route
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (twilioClient) console.log('Twilio notifications enabled');
  if (process.env.EMAIL_USER) console.log('Email notifications enabled');
});