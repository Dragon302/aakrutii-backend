const mongoose = require('mongoose');

// Schema for individual reviews
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

// Upgraded Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Main thumbnail image
  additionalImages: [{ type: String }], // Array for multiple extra images
  model3d: { type: String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number }, // Optional: For sales and offers
  countInStock: { type: Number, required: true, default: 0 },
  reviews: [reviewSchema], // Embedded array of reviews
  rating: { type: Number, required: true, default: 0 }, // Average rating (e.g., 4.5)
  numReviews: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);