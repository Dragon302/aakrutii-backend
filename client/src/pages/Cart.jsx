import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus } from 'lucide-react'; // 🚀 Added Plus and Minus icons
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  // ==========================================
  // EMPTY CART STATE
  // ==========================================
  if (cartItems.length === 0) {
    return (
      // REMOVED: bg-neutral-50 so the global gradient shows through
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#3A2318] uppercase tracking-tight mb-4">Your Cart is Empty</h2>
          <p className="text-[#5C3E2E] font-medium mb-8 max-w-md">Looks like you haven't added any premium 3D models or materials to your cart yet.</p>
          <Link 
            to="/products" 
            className="px-10 py-4 bg-[#3A2318] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all flex items-center group"
          >
            Return to Shop <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // ACTIVE CART STATE
  // ==========================================
  return (
    <div className="min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="text-4xl font-black text-[#3A2318] uppercase tracking-tight mb-12 border-b border-white/60 pb-6 flex items-center"
        >
          Shopping Cart <span className="ml-4 text-lg text-orange-500 font-bold bg-[#fff5eb] border border-[#ffe4d6] px-3 py-1 rounded-full">{cartItems.length} Items</span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT SIDE: Cart Items List */}
          <div className="w-full lg:w-2/3">
            <motion.ul 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {cartItems.map((item) => (
                <li key={item.product} className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white/50 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-all">
                  
                  {/* Product Image */}
                  <Link to={`/product/${item.product}`} className="h-32 w-32 flex-shrink-0 overflow-hidden bg-white/50 rounded-2xl flex items-center justify-center relative group-hover:bg-white transition-all">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-contain p-2 drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex flex-1 flex-col w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-black text-[#3A2318] uppercase tracking-tight">
                          <Link to={`/product/${item.product}`} className="hover:text-orange-500 transition-colors">{item.name}</Link>
                        </h3>
                        <p className="text-[10px] font-bold text-[#5C3E2E]/60 uppercase tracking-widest mt-1">Digital Download / Print</p>
                      </div>
                      <p className="text-xl font-black text-orange-500 ml-4">₹{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    
                    {/* Controls (Qty & Remove) */}
                    <div className="flex flex-1 items-end justify-between mt-6 border-t border-white/60 pt-4">
                      
                      {/* 🚀 THE NEW PLUS / MINUS CONTROLLER */}
                      <div className="flex items-center bg-white/80 border border-white/50 rounded-full p-1 shadow-sm">
                        <button 
                          onClick={() => item.qty > 1 ? addToCart(item, -1) : removeFromCart(item.product)}
                          className="w-8 h-8 flex items-center justify-center text-[#5C3E2E] hover:text-orange-500 hover:bg-[#fff5eb] rounded-full transition-colors"
                        >
                          <Minus size={16} strokeWidth={2.5} />
                        </button>
                        
                        <span className="w-8 text-center text-sm font-black text-[#3A2318]">
                          {item.qty}
                        </span>
                        
                        <button 
                          onClick={() => addToCart(item, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#5C3E2E] hover:text-orange-500 hover:bg-[#fff5eb] rounded-full transition-colors"
                        >
                          <Plus size={16} strokeWidth={2.5} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.product)}
                        className="font-bold text-[#5C3E2E]/60 hover:text-red-500 transition-colors flex items-center uppercase text-[10px] tracking-widest bg-white/50 hover:bg-red-50 px-4 py-2 rounded-xl"
                      >
                        <Trash2 size={14} className="mr-2" /> Remove
                      </button>

                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT SIDE: Order Summary */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-xl shadow-[#3A2318]/5 border border-white/50 sticky top-32"
            >
              <h2 className="text-xl font-black text-[#3A2318] uppercase tracking-tight mb-8 flex items-center">
                Order Summary
              </h2>
              
              <div className="space-y-4 text-sm font-medium text-[#5C3E2E] mb-8">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="font-bold text-[#3A2318] text-base">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping Estimate</span>
                  <span className="text-orange-500 font-bold text-[10px] uppercase tracking-widest bg-[#fff5eb] border border-[#ffe4d6] px-2 py-1 rounded">Calculated next</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax Estimate</span>
                  <span className="text-[#5C3E2E]/60">₹0.00</span>
                </div>

                <div className="border-t border-white/60 pt-6 mt-6 flex justify-between items-end">
                  <span className="text-sm font-bold text-[#3A2318] uppercase tracking-widest">Order Total</span>
                  <span className="text-3xl font-black text-[#3A2318] tracking-tighter">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={checkoutHandler}
                className="w-full py-5 bg-orange-500 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center group"
              >
                Secure Checkout <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-6 flex items-center justify-center text-[10px] font-bold text-[#5C3E2E]/60 uppercase tracking-widest">
                <X size={12} className="mr-1" /> All payments are secure and encrypted.
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;