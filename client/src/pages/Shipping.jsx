import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Truck, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

const Shipping = () => {
  const navigate = useNavigate();

  // Load existing address from local storage if they already entered it before
  const savedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {
    address: '',
    city: '',
    postalCode: '',
    country: 'India', // Defaulting to India
  };

  const [shippingData, setShippingData] = useState(savedAddress);

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Save to local storage
    localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
    // Move to the Payment screen!
    navigate('/payment');
  };

  return (
    <div className="min-h-screen font-sans pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================== */}
        {/* 1. CHECKOUT PROGRESS STEPPER               */}
        {/* ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-16 space-x-2 md:space-x-4"
        >
          <div className="flex items-center text-orange-500 font-bold text-xs uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">1</span> Cart
          </div>
          <div className="w-8 md:w-16 h-px bg-orange-300"></div>
          
          <div className="flex items-center text-[#3A2318] font-black text-xs uppercase tracking-widest bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-sm">
            <span className="w-6 h-6 rounded-full bg-[#3A2318] text-white flex items-center justify-center mr-2">2</span> Shipping
          </div>
          <div className="w-8 md:w-16 h-px bg-white/60"></div>
          
          <div className="flex items-center text-[#5C3E2E]/50 font-bold text-xs uppercase tracking-widest">
            <span className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center mr-2">3</span> Payment
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* 2. SHIPPING FORM                           */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Left Side: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 bg-white/60 backdrop-blur-md p-10 md:p-14 rounded-[2rem] shadow-xl shadow-[#3A2318]/5 border border-white/50"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white text-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                <Truck size={24} />
              </div>
              <h2 className="text-3xl font-black text-[#3A2318] uppercase tracking-tight">Delivery Details</h2>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              
              <div>
                <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">Street Address</label>
                <input 
                  type="text" required name="address" value={shippingData.address} onChange={handleChange}
                  placeholder="e.g. 266/1, Mayur Park, Vaijapur Road"
                  className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium text-[#3A2318] placeholder-[#5C3E2E]/50" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">City / District</label>
                  <input 
                    type="text" required name="city" value={shippingData.city} onChange={handleChange}
                    placeholder="e.g. Chh. Sambhajinagar"
                    className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium text-[#3A2318] placeholder-[#5C3E2E]/50" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">PIN Code</label>
                  <input 
                    type="text" required name="postalCode" value={shippingData.postalCode} onChange={handleChange}
                    placeholder="e.g. 431109"
                    className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium text-[#3A2318] placeholder-[#5C3E2E]/50" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">Country / Region</label>
                <input 
                  type="text" required name="country" value={shippingData.country} onChange={handleChange}
                  className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium text-[#3A2318] placeholder-[#5C3E2E]/50" 
                />
              </div>

              <div className="pt-6 border-t border-white/60 flex justify-end">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-10 py-5 bg-[#3A2318] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center group"
                >
                  Continue to Payment <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Side: Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-1 space-y-6"
          >
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 text-center flex flex-col items-center shadow-sm">
              <ShieldCheck size={40} className="text-orange-500 mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-black text-[#3A2318] uppercase tracking-widest mb-2">Secure Checkout</h3>
              <p className="text-xs font-medium text-[#5C3E2E] leading-relaxed">Your personal details are securely encrypted and never shared with third parties.</p>
            </div>

            <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 text-center flex flex-col items-center shadow-sm">
              <MapPin size={40} className="text-[#3A2318] mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-black text-[#3A2318] uppercase tracking-widest mb-2">Fast Dispatch</h3>
              <p className="text-xs font-medium text-[#5C3E2E] leading-relaxed">All physical 3D prints are securely packaged and dispatched via trusted courier partners.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Shipping;