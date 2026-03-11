const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, getOrderById} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Create a new order
router.post('/', protect, addOrderItems);

// @route   GET /api/orders/myorders
// @desc    Get the logged-in user's order history
// 🚀 THIS IS THE ROUTE THAT WAS MISSING (Fixes the 404)
router.get('/myorders', protect, getMyOrders);

module.exports = router;