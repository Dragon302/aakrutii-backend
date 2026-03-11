import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  
  // 🚀 ADDED: State to track what the user types in the search bar
  const [navSearch, setNavSearch] = useState('');

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const closeMenu = () => setIsOpen(false);

  // 🚀 ADDED: Function to submit the search to the Products page
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearch)}`);
      setNavSearch(''); // Clear the input after searching
      closeMenu(); // Close mobile menu if it was open
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      // THEME: Frosted glass with warm border
      className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-[#ffe4d6] shadow-sm font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT CORNER: Custom Image Logo & Text */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Aakrutii Logo" 
                className="h-8 w-8 md:h-10 md:w-10 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-3xl font-black tracking-tighter text-[#3A2318] group-hover:text-orange-500 transition-colors duration-300">
                Aakrutii
              </span>
            </Link>
          </div>

          {/* RIGHT CORNER: Links & Icons */}
          <div className="flex items-center">
            
            {/* Desktop Text Links */}
            <div className="hidden lg:flex items-center space-x-6 mr-6 border-r border-[#ffe4d6] pr-6">
              <Link to="/" className="text-[11px] font-bold text-[#5C3E2E] uppercase tracking-widest hover:text-orange-500 transition-colors">Home</Link>
              <Link to="/products" className="text-[11px] font-bold text-[#5C3E2E] uppercase tracking-widest hover:text-orange-500 transition-colors">Products</Link>
              <Link to="/custom-print" className="text-[11px] font-bold text-[#5C3E2E] uppercase tracking-widest hover:text-orange-500 transition-colors">Custom Print</Link>
              <Link to="/about" className="text-[11px] font-bold text-[#5C3E2E] uppercase tracking-widest hover:text-orange-500 transition-colors">About Us</Link>
              <Link to="/contact" className="text-[11px] font-bold text-[#5C3E2E] uppercase tracking-widest hover:text-orange-500 transition-colors">Contact Us</Link>
            </div>

            {/* Icons & Actions */}
            <div className="flex items-center space-x-5">
              
              {/* 🚀 THE NEW DESKTOP SEARCH BAR */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex relative">
                <input 
                  type="text" 
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  placeholder="Search models..."
                  className="bg-white/50 border border-white/60 text-[#3A2318] placeholder-[#5C3E2E]/60 text-xs font-bold px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:bg-white/80 transition-all w-48 lg:w-56"
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C3E2E] hover:text-orange-500 transition-colors">
                  <Search size={14} strokeWidth={2} />
                </button>
              </form>
              
              {/* Orange Admin Badge */}
              {user && user.isAdmin && (
                <Link to="/admin" onClick={closeMenu} className="hidden sm:flex items-center justify-center px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest bg-orange-500 rounded-full hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
                  Admin
                </Link>
              )}

              {/* Profile Icon */}
              <Link to={user ? "/profile" : "/login"} onClick={closeMenu} className="hidden sm:block text-[#5C3E2E] hover:text-orange-500 transition-colors">
                <User size={20} strokeWidth={2} />
              </Link>
              
              {/* Cart Icon */}
              <Link to="/cart" onClick={closeMenu} className="relative text-[#5C3E2E] hover:text-orange-500 transition-colors group">
                <ShoppingBag size={20} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-[#3A2318] hover:text-orange-500 transition-colors ml-2 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#ffe4d6] shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col space-y-3">
              
              {/* 🚀 THE NEW MOBILE SEARCH BAR */}
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <input 
                  type="text" 
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  placeholder="Search models..."
                  className="w-full bg-[#fff5eb] border border-[#ffe4d6] text-[#3A2318] px-4 py-3 pl-10 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C3E2E]">
                  <Search size={16} />
                </button>
              </form>

              <Link to="/" onClick={closeMenu} className="px-4 py-3 bg-[#fff5eb] rounded-xl text-xs font-bold text-[#3A2318] uppercase tracking-widest hover:bg-[#ffe4d6] hover:text-orange-500 transition-colors">Home</Link>
              <Link to="/products" onClick={closeMenu} className="px-4 py-3 bg-[#fff5eb] rounded-xl text-xs font-bold text-[#3A2318] uppercase tracking-widest hover:bg-[#ffe4d6] hover:text-orange-500 transition-colors">Products</Link>
              <Link to="/custom-print" onClick={closeMenu} className="px-4 py-3 bg-[#fff5eb] rounded-xl text-xs font-bold text-[#3A2318] uppercase tracking-widest hover:bg-[#ffe4d6] hover:text-orange-500 transition-colors">Custom Print</Link>
              <Link to="/about" onClick={closeMenu} className="px-4 py-3 bg-[#fff5eb] rounded-xl text-xs font-bold text-[#3A2318] uppercase tracking-widest hover:bg-[#ffe4d6] hover:text-orange-500 transition-colors">About Us</Link>
              <Link to="/contact" onClick={closeMenu} className="px-4 py-3 bg-[#fff5eb] rounded-xl text-xs font-bold text-[#3A2318] uppercase tracking-widest hover:bg-[#ffe4d6] hover:text-orange-500 transition-colors">Contact Us</Link>
              
              <div className="border-t border-[#ffe4d6] my-2"></div>
              
              <Link to={user ? "/profile" : "/login"} onClick={closeMenu} className="flex items-center px-4 py-3 text-xs font-bold text-[#5C3E2E] uppercase tracking-widest hover:text-orange-500 transition-colors">
                <User size={16} className="mr-3" /> {user ? "My Profile" : "Log In / Register"}
              </Link>
              
              {user && user.isAdmin && (
                <Link to="/admin" onClick={closeMenu} className="flex items-center px-4 py-3 text-xs font-black text-orange-500 uppercase tracking-widest hover:bg-[#ffe4d6] rounded-xl transition-colors">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-3 animate-pulse"></span> Admin Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;