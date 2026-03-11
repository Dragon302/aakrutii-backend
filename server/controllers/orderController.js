const Order = require('../models/Order');

// Save the complete order to the database
const addOrderItems = async (req, res) => {
  try {
    const { 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      totalPrice, 
      paymentResult 
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id, // This comes from our authMiddleware!
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentResult,
      isPaid: true,
      paidAt: Date.now(),
    });


    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
    
  } catch (error) {
    console.error('Order Save Error:', error);
    res.status(500).json({ message: 'Failed to save order to database' });
  }
};
const getMyOrders = async (req, res) => {
  try {
    // Finds all orders belonging to the logged-in user
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: 'Server error while fetching your orders.' });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders // 🚀 YOU MUST ADD THIS HERE!
};