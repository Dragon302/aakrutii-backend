import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Clock, CheckCircle, LogOut, ShieldAlert } from 'lucide-react'; // Added ShieldAlert
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🚀 CHANGED: We no longer auto-kick them! 
    // We just fetch orders IF they are logged in.
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  const fetchMyOrders = async () => {
    try {
      // 🚀 We MUST pass the user's token so the backend knows who is asking!
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ==========================================
  // 🚀 NEW: THE "NOT LOGGED IN" GUEST VIEW
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center font-sans px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white/60 backdrop-blur-md p-10 md:p-14 rounded-[2.5rem] shadow-xl shadow-[#3A2318]/5 border border-white/50 text-center"
        >
          <div className="w-20 h-20 bg-orange-100/80 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-white">
            <ShieldAlert size={36} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-black text-[#3A2318] uppercase tracking-tight mb-4">Guest Access</h2>
          <p className="text-[#5C3E2E] font-medium text-sm leading-relaxed mb-10">
            Please log in or create a free Aakrutii account to track your 3D print orders and manage your profile.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-5 bg-[#3A2318] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center"
            >
              Log In to Account
            </button>
            <button 
              onClick={() => navigate('/register')} // Make sure your register route is '/register'!
              className="w-full py-5 bg-white/50 border border-white/60 text-[#3A2318] rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-sm transition-all flex items-center justify-center"
            >
              Create New Account
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // THE NORMAL LOGGED-IN PROFILE VIEW
  // ==========================================
  return (
    <div className="min-h-screen font-sans pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-[#3A2318] uppercase tracking-tight mb-12 border-b border-white/60 pb-6"
        >
          My Profile
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* LEFT COLUMN: User Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-xl shadow-[#3A2318]/5 border border-white/50 text-center flex flex-col items-center sticky top-32">
              <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white">
                <User size={40} />
              </div>
              <h2 className="text-xl font-black text-[#3A2318] uppercase tracking-tight mb-1">{user.name}</h2>
              <p className="text-sm font-medium text-[#5C3E2E] mb-8">{user.email}</p>

              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-white/50 border border-white/60 text-[#3A2318] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center group cursor-pointer"
              >
                <LogOut size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Log Out
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Order History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-xl shadow-[#3A2318]/5 border border-white/50">
              <div className="flex items-center justify-between mb-8 border-b border-white/60 pb-6">
                <h2 className="text-2xl font-black text-[#3A2318] uppercase tracking-tight flex items-center">
                  <Package className="text-orange-500 mr-3" size={28} /> Order History
                </h2>
                <span className="text-xs font-bold text-orange-500 bg-[#fff5eb] px-3 py-1 rounded-full uppercase tracking-widest border border-[#ffe4d6]">
                  {orders.length} Orders
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/50 text-[#5C3E2E]/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/60">
                    <Package size={24} />
                  </div>
                  <h3 className="text-lg font-black text-[#3A2318] uppercase tracking-tight mb-2">No Orders Yet</h3>
                  <p className="text-[#5C3E2E] font-medium text-sm">When you purchase a 3D print, it will show up here!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white/40 border border-white/60 rounded-2xl p-6 hover:shadow-md transition-shadow group">
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-white/60 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-[#5C3E2E]/60 uppercase tracking-widest mb-1">Order ID</p>
                          <p className="text-sm font-black text-[#3A2318] tracking-wider">{order._id}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#5C3E2E]/60 uppercase tracking-widest mb-1">Date Placed</p>
                          <p className="text-sm font-bold text-[#5C3E2E]">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#5C3E2E]/60 uppercase tracking-widest mb-1">Total Amount</p>
                          <p className="text-lg font-black text-orange-500">₹{order.totalPrice.toFixed(2)}</p>
                        </div>
                        
                        <div>
                          {order.isDelivered ? (
                            <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-200 shadow-sm">
                              <CheckCircle size={14} className="mr-1.5" /> Delivered
                            </span>
                          ) : (
                            <span className="flex items-center text-xs font-bold text-orange-700 bg-[#fff5eb] px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#ffe4d6] shadow-sm">
                              <Clock size={14} className="mr-1.5" /> Processing
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center overflow-x-auto pb-2 gap-4 custom-scrollbar">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="flex items-center min-w-max bg-white/50 p-2 rounded-xl pr-6 border border-white/40 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 mr-3 shadow-sm" />
                            <div>
                              <p className="text-xs font-black text-[#3A2318] truncate w-32">{item.name}</p>
                              <p className="text-[10px] font-bold text-[#5C3E2E]/60 uppercase tracking-widest mt-0.5">Qty: {item.qty}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Profile;