import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Settings, Target, Cpu, ShieldCheck, Award } from 'lucide-react'; // 🚀 NEW ICONS ADDED

const Home = () => {
    const [featuredProduct, setFeaturedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProduct = async () => {
            try {
                const { data } = await axios.get('https://aakrutii-backend.onrender.com/api/products');
                if (data && data.length > 0) {
                    setFeaturedProduct(data[0]); 
                }
            } catch (error) {
                console.error("Error fetching featured product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProduct();
    }, []);

    // Framer Motion Animation Variants for the staggered grid
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: "spring", stiffness: 100, damping: 15 } 
        }
    };

    return (
        <div className="overflow-hidden font-sans">
            
            {/* ========================================== */}
            {/* 1. HERO SECTION                            */}
            {/* ========================================== */}
            <section className="min-h-[90vh] flex items-center relative pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Side: Typography & Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center lg:text-left space-y-8 z-10 lg:pr-12"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#3A2318] tracking-tight leading-[1.1] drop-shadow-sm">
                                Shaping Ideas, <br className="hidden md:block" /> Layer by Layer.
                            </h1>
                            
                            <p className="text-lg md:text-xl text-[#5C3E2E] font-serif max-w-md mx-auto lg:mx-0 leading-relaxed">
                                {featuredProduct 
                                    ? `Featuring our latest release: ${featuredProduct.name}.` 
                                    : "The first luxury 3D-printed planter that breathes modern minimalism."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link 
                                    to={featuredProduct ? `/product/${featuredProduct._id}` : "/products"} 
                                    className="bg-white text-[#3A2318] font-extrabold px-12 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-300 text-sm text-center"
                                >
                                    Buy Now
                                </Link>
                                <Link 
                                    to="/products" 
                                    className="bg-white/20 backdrop-blur-md text-[#3A2318] font-medium px-12 py-4 rounded-full transition-all duration-300 text-sm text-center border border-white/40 hover:bg-white/40"
                                >
                                    Shop All
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Side: Product Image */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative flex justify-center lg:justify-end mt-12 lg:mt-0"
                        >
                            {!loading && (
                                <motion.img 
                                    whileHover={{ scale: 1.05, y: -10 }} 
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    src={featuredProduct ? featuredProduct.image : "/hero-product.png"} 
                                    alt={featuredProduct ? featuredProduct.name : "Featured 3D Print"} 
                                    className="relative z-10 w-full max-w-[300px] md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl h-[500px] cursor-pointer"
                                />
                            )}
                            {loading && (
                                <div className="relative z-10 h-[500px] flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                                </div>
                            )}
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ========================================== */}
            {/* 2. ANIMATED "WHY CHOOSE" SECTION           */}
            {/* ========================================== */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-[#3A2318] tracking-tight drop-shadow-sm mb-6">
                            Why Choose Aakrutii?
                        </h2>
                        <div className="w-24 h-1.5 bg-orange-400 mx-auto rounded-full opacity-70"></div>
                    </motion.div>

                    {/* 🚀 THE NEW ANIMATED GRID */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Card 1 */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white/40 backdrop-blur-md border border-white/50 p-10 rounded-[2rem] shadow-lg shadow-[#3A2318]/5 hover:bg-white/60 hover:shadow-xl transition-all duration-300 group flex flex-col items-start"
                        >
                            <div className="w-16 h-16 bg-orange-100/80 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm">
                                <Settings size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-[#3A2318] mb-4 tracking-wide">Precision Robotics Engineering</h3>
                            <p className="text-[#5C3E2E] font-medium leading-relaxed">
                                We don't just "print" products; we engineer functional art using the principles of Automation and Robotics.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white/40 backdrop-blur-md border border-white/50 p-10 rounded-[2rem] shadow-lg shadow-[#3A2318]/5 hover:bg-white/60 hover:shadow-xl transition-all duration-300 group flex flex-col items-start"
                        >
                            <div className="w-16 h-16 bg-orange-100/80 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:-rotate-12 transition-all duration-500 shadow-sm">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-[#3A2318] mb-4 tracking-wide">The Perfection of 100+ Prototypes</h3>
                            <p className="text-[#5C3E2E] font-medium leading-relaxed">
                                We spent 6 months failing and refining over 100 prototypes to ensure your product is nothing less than flawless.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white/40 backdrop-blur-md border border-white/50 p-10 rounded-[2rem] shadow-lg shadow-[#3A2318]/5 hover:bg-white/60 hover:shadow-xl transition-all duration-300 group flex flex-col items-start"
                        >
                            <div className="w-16 h-16 bg-orange-100/80 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                                <Cpu size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-[#3A2318] mb-4 tracking-wide">A Complete Tech Ecosystem</h3>
                            <p className="text-[#5C3E2E] font-medium leading-relaxed">
                                We bridge the gap between high-tech robotics and everyday living through our unique mix of decor and educational kits.
                            </p>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white/40 backdrop-blur-md border border-white/50 p-10 rounded-[2rem] shadow-lg shadow-[#3A2318]/5 hover:bg-white/60 hover:shadow-xl transition-all duration-300 group flex flex-col items-start"
                        >
                            <div className="w-16 h-16 bg-orange-100/80 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-[#3A2318] mb-4 tracking-wide">Built for Durability and Logic</h3>
                            <p className="text-[#5C3E2E] font-medium leading-relaxed">
                                Every design is stress-tested to ensure industrial-grade structural integrity that standard decor simply can't match.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* 🚀 THE HIGHLIGHTED BOTTOM CARD */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
                        whileHover={{ y: -8, scale: 1.01 }}
                        className="mt-8 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md border border-white/60 p-10 md:p-14 rounded-[2rem] shadow-xl shadow-[#3A2318]/5 hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden"
                    >
                        {/* Subtle animated background glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-300 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

                        <div className="w-20 h-20 bg-white/80 text-orange-500 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 shadow-md relative z-10">
                            <Award size={40} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-[#3A2318] mb-4 tracking-wide relative z-10">
                            3 Years of Technical Mastery
                        </h3>
                        <p className="text-[#5C3E2E] text-lg font-medium leading-relaxed max-w-2xl relative z-10">
                            Our foundation is built on years of hands-on experience, from leading workshops in 2024 to managing professional print farms today.
                        </p>
                    </motion.div>
                    
                </div>
            </section>
        </div>
    );
};

export default Home;