const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors({origin: ['http://localhost:5173', 'https://aakrutii-backend.vercel.app'],credentials: true }));
app.use(express.json()); // Parse JSON bodies

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Route Imports
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const formRoutes = require('./routes/formRoutes');

app.use((req, res, next) => {
  console.log(`[BACKEND TRAFFIC COP] Someone is requesting: ${req.method} ${req.url}`);
  next();
});



app.use('/api/upload', uploadRoutes);


// API Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/forms', formRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));