const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');

// Route: POST /api/payment/create-order
router.post('/create-order', createOrder);

// Route: POST /api/payment/verify
router.post('/verify', verifyPayment);

module.exports = router;