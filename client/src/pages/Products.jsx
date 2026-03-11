import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react'; // Imported Search and X icons

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🚀 NEW: State to hold the user's search text
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://aakrutii-backend.onrender.com/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🚀 NEW: Filter products based on what the user types!
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#3A2318]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl font-black text-[#3A2318] uppercase tracking-tight mb-4">
            The Catalog
          </motion.h1>
          <p className="text-[#5C3E2E] font-medium max-w-2xl mx-auto">Explore our premium collection of 3D models and meticulously crafted physical prints.</p>
        </div>

        {/* 🚀 NEW: The Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16 relative"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-6 text-[#5C3E2E] w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for models, planters, materials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/60 backdrop-blur-md border border-white/50 text-[#3A2318] placeholder-[#5C3E2E]/60 px-14 py-5 rounded-full shadow-lg shadow-[#3A2318]/5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/80 transition-all font-medium"
            />
            {/* Clear Search Button */}
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-6 text-[#5C3E2E] hover:text-orange-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* The Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {/* Show a message if no products match the search */}
          {filteredProducts.length === 0 && (
             <div className="col-span-full text-center py-20">
               <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#5C3E2E]">
                  <Search size={32} />
               </div>
               <h3 className="text-2xl font-black text-[#3A2318] uppercase tracking-widest mb-2">No Matches Found</h3>
               <p className="text-[#5C3E2E]">We couldn't find any products matching "{searchTerm}".</p>
             </div>
          )}

          {/* Map through the FILTERED products, not all products */}
          {filteredProducts.map((product, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.05 }} // Faster stagger
              key={product._id} 
              className="bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl shadow-[#3A2318]/5 border border-white/50 group flex flex-col"
            >
              <Link to={`/product/${product._id}`} className="block relative h-64 bg-white/40 overflow-hidden flex items-center justify-center p-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-700"
                />
              </Link>
              
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#3A2318] uppercase tracking-tight mb-2 leading-tight">
                    <Link to={`/product/${product._id}`} className="hover:text-orange-500 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-black text-orange-600">₹{product.price}</span>
                  <Link to={`/product/${product._id}`} className="px-5 py-2 bg-[#3A2318] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-orange-500 hover:shadow-lg transition-all">
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Products;