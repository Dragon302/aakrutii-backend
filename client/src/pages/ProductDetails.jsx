import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Star, Box, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [viewMode, setViewMode] = useState('2d'); // Default to 2d gallery, switchable to '3d'
  const [selectedImage, setSelectedImage] = useState('');
  
  // Review States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  const demo3DModelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

  // 1. Merged and Fixed Data Fetching
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
      setSelectedImage(data.image); // Set initial main image
    } catch (error) {
      console.error('Error fetching product', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // 2. Cart & Review Handlers
  const handleAddToCart = () => {
    const productForCart = { ...product, price: product.discountPrice > 0 ? product.discountPrice : product.price };
    addToCart(productForCart, Number(qty));
    navigate('/cart');
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, { rating, comment }, config);
      setComment('');
      setReviewError('');
      fetchProduct(); // Refresh to show new review
    } catch (error) {
      setReviewError(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold uppercase tracking-widest">Loading Specs...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black mb-12 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Catalog
        </button>

        <div className="flex flex-col md:flex-row gap-16 mb-24">
          
          {/* ========================================== */}
          {/* LEFT SIDE: MEDIA VIEWER                    */}
          {/* ========================================== */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            
            {/* View Mode Toggle Buttons */}
            <div className="flex gap-2 mb-2">
              <button 
                onClick={() => setViewMode('2d')} 
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center transition-colors border ${viewMode === '2d' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
              >
                <ImageIcon size={16} className="mr-2" /> Photos
              </button>
              {/* Only show 3D button if the product actually has a 3D model, or use demo */}
              <button 
                onClick={() => setViewMode('3d')} 
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center transition-colors border ${viewMode === '3d' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
              >
                <Box size={16} className="mr-2" /> 3D Viewer
              </button>
            </div>

            {/* Main Display Area */}
            <div className="w-full h-[400px] md:h-[500px] bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200 flex items-center justify-center relative shadow-inner">
              {viewMode === '3d' ? (
                <model-viewer 
                  src={product.model3d && product.model3d.includes('.glb') ? product.model3d : demo3DModelUrl} 
                  auto-rotate 
                  camera-controls 
                  ar 
                  shadow-intensity="1" 
                  style={{ width: '100%', height: '100%' }}
                >
                   <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-neutral-50 z-10">
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest animate-pulse">Loading 3D...</p>
                  </div>
                </model-viewer>
              ) : (
                <img 
                  src={selectedImage || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 drop-shadow-xl transition-all duration-500" 
                />
              )}
            </div>

            {/* Thumbnail Row (Only shows in 2D mode) */}
            {viewMode === '2d' && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.image && (
                  <button 
                    onClick={() => setSelectedImage(product.image)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === product.image ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                )}
                {product.additionalImages && product.additionalImages.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========================================== */}
          {/* RIGHT SIDE: PRODUCT SPECS                  */}
          {/* ========================================== */}
          <div className="flex flex-col justify-center w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-4">{product.name}</h1>
            
            {/* Reviews Summary */}
            <div className="flex items-center mb-6 text-sm text-gray-500 font-bold tracking-widest uppercase">
              <Star size={16} className="text-yellow-400 mr-1 fill-yellow-400" />
              {product.rating > 0 ? product.rating.toFixed(1) : 'No Rating'} ({product.numReviews || 0} Reviews)
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
              {product.discountPrice > 0 ? (
                <>
                  <p className="text-3xl font-extrabold text-red-600">₹{product.discountPrice}</p>
                  <p className="text-lg font-medium text-gray-400 line-through mb-1">₹{product.price}</p>
                </>
              ) : (
                <p className="text-3xl font-extrabold text-black">₹{product.price}</p>
              )}
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-10">{product.description}</p>

            <div className="border-t border-b border-gray-200 py-6 mb-8 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-black">Quantity</span>
              <select value={qty} onChange={(e) => setQty(e.target.value)} className="border-none bg-gray-50 text-black font-bold text-center w-20 py-2 focus:ring-0 cursor-pointer outline-none">
                {[...Array(product.countInStock > 0 ? Math.min(product.countInStock, 10) : 0).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>

            <button onClick={handleAddToCart} disabled={product.countInStock === 0} className={`w-full py-5 text-sm font-bold uppercase tracking-widest transition-colors ${product.countInStock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* BOTTOM SECTION: REVIEWS                    */}
        {/* ========================================== */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-extrabold text-black uppercase tracking-tight mb-8">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Review List */}
            <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4">
              {(!product.reviews || product.reviews.length === 0) && <p className="text-sm text-gray-500 uppercase tracking-widest">No reviews yet. Be the first!</p>}
              {product.reviews && product.reviews.map((review) => (
                <div key={review._id} className="bg-gray-50 p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-black uppercase tracking-wider text-sm">{review.name}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">{review.createdAt.substring(0, 10)}</p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="bg-white border border-gray-200 p-8 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-black uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Write a Review</h3>
              
              {user ? (
                <form onSubmit={submitReview} className="space-y-6">
                  {reviewError && <p className="text-xs font-bold text-red-600 bg-red-50 p-3 uppercase">{reviewError}</p>}
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Rating</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black font-medium text-sm">
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Comment</label>
                    <textarea required rows="4" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors text-sm" placeholder="How did this 3D print turn out?"></textarea>
                  </div>

                  <button type="submit" className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Please log in to share your thoughts.</p>
                  <Link to="/login" className="px-6 py-3 border border-black text-xs font-bold uppercase tracking-widest hover:bg-gray-50 inline-block">Log In</Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProductDetails;