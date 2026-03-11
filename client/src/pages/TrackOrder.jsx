import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Printer, CheckCircle, Truck, FileCode, Box } from 'lucide-react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  // Simulated Backend Fetch
  const handleTrackOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderData(null);

    // Simulating a backend API call delay
    setTimeout(() => {
      setLoading(false);
      // Let's create a dummy successful search for testing!
      if (orderId.toUpperCase() === 'ORD-12345') {
        setOrderData({
          id: 'ORD-12345',
          date: 'March 4, 2026',
          product: 'Custom 3D Print - Iron Man Helmet',
          status: 'printing', // Can be: 'placed', 'slicing', 'printing', 'shipped', 'delivered'
          estimatedDelivery: 'March 10, 2026'
        });
      } else {
        setError('Order not found. Please check your Order ID and try again. (Hint: Try ORD-12345)');
      }
    }, 1500);
  };

  // Define the timeline steps for a 3D Printing business
  const steps = [
    { id: 'placed', icon: <FileCode size={20} />, label: 'Order Placed', desc: 'Files received' },
    { id: 'slicing', icon: <Box size={20} />, label: 'Slicing & Prep', desc: 'Preparing for machine' },
    { id: 'printing', icon: <Printer size={20} />, label: '3D Printing', desc: 'Currently manufacturing' },
    { id: 'shipped', icon: <Truck size={20} />, label: 'Shipped', desc: 'On the way to you' },
    { id: 'delivered', icon: <CheckCircle size={20} />, label: 'Delivered', desc: 'Package arrived' },
  ];

  // Helper to determine step status
  const getStepStatus = (stepIndex, currentStatus) => {
    const statusIndex = steps.findIndex(s => s.id === currentStatus);
    if (stepIndex < statusIndex) return 'completed';
    if (stepIndex === statusIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Package size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight mb-4">
              Track Your <span className="text-orange-500">Order</span>
            </h1>
            <p className="text-neutral-500 font-medium">Enter your Order ID below to see the current manufacturing and shipping status.</p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 mb-8"
        >
          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-12345"
                required
                className="w-full bg-neutral-50 border border-neutral-200 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-bold text-neutral-900 uppercase tracking-widest"
              />
              <Search size={20} className="absolute left-4 top-4 text-neutral-400" />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-black text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center min-w-[150px]"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Track Order'
              )}
            </button>
          </form>
          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-4 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
        </motion.div>

        {/* Tracking Results Area */}
        {orderData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden"
          >
            {/* Order Info Header */}
            <div className="bg-neutral-950 p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">Order Number</p>
                  <h2 className="text-2xl font-black tracking-widest">{orderData.id}</h2>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">Est. Delivery</p>
                  <p className="text-orange-500 font-bold">{orderData.estimatedDelivery}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <p className="text-sm font-medium text-neutral-300"><span className="text-neutral-500 mr-2">Item:</span> {orderData.product}</p>
              </div>
            </div>

            {/* The Timeline */}
            <div className="p-8 md:p-12">
              <div className="relative">
                {/* Vertical Line for Desktop/Mobile */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-neutral-100"></div>

                <div className="space-y-10 relative">
                  {steps.map((step, index) => {
                    const status = getStepStatus(index, orderData.status);
                    
                    return (
                      <div key={step.id} className="flex items-start">
                        {/* Status Icon */}
                        <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white transition-colors duration-500 ${
                          status === 'completed' ? 'bg-orange-500 text-white' : 
                          status === 'current' ? 'bg-black text-white animate-pulse' : 
                          'bg-neutral-100 text-neutral-300'
                        }`}>
                          {step.icon}
                        </div>

                        {/* Status Text */}
                        <div className="ml-6 pt-2 md:pt-4">
                          <h3 className={`text-sm md:text-base font-black uppercase tracking-widest mb-1 ${
                            status === 'pending' ? 'text-neutral-400' : 'text-neutral-900'
                          }`}>
                            {step.label}
                          </h3>
                          <p className={`text-xs md:text-sm font-medium ${
                            status === 'pending' ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;