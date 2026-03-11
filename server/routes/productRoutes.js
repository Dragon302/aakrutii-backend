const express = require('express');
const router = express.Router();
// Make sure updateProduct is imported here!
const { getProducts, getProductById, deleteProduct, createProduct, updateProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { createProductReview } = require('../controllers/productController'); // ensure it's imported at the top!

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
  
router.route('/:id/reviews').post(protect, createProductReview);// <-- This is the magic line accepting the update!

module.exports = router;