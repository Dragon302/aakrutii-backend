import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Printer, CheckCircle, Github, Linkedin, Mail } from 'lucide-react';

const About = () => {
  // Animation variants
  const founderCardVariants = {
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { type: 'spring', bounce: 0.3, duration: 0.8 },
  };

  const textVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const staggerLinks = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    whileHover: { scale: 1.1, y: -2, transition: { duration: 0.2 } },
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen pt-12 pb-24 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================== */}
        {/* PAGE HEADER                                */}
        {/* ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black uppercase tracking-tight mb-6">
            About Aakrutii
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Where your digital models break into the physical world. 
            We are redefining custom manufacturing layer by precise layer.
          </p>
        </div>

        {/* ========================================== */}
        {/* MEET THE FOUNDER SECTION - ANIMATED!       */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 bg-gray-50 p-8 md:p-12 border border-gray-100 rounded-3xl relative overflow-hidden group">
          
          {/* Subtle 3D-inspired background pattern */}
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
            <svg width="100%" height="100%">
              <pattern id="3dgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40 Z" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#3dgrid)" />
            </svg>
          </div>

          {/* Founder Card (Right Side in Grid, Animating from Right) */}
          <motion.div 
            className="md:col-span-4 flex flex-col items-center text-center relative z-10"
            variants={founderCardVariants}
            initial="initial"
            animate="animate"
            whileHover={{ 
              scale: 1.05, 
              rotateY: 10, 
              rotateX: 5, 
              boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-3xl group relative overflow-hidden w-full">
              
              {/* Dynamic illuminated background glow */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-orange-400 rounded-full blur-[70px] opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>

              {/* 🚀 REPLACE THIS IMAGE URL WITH YOUR ACTUAL PHOTO! */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-black mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 mx-auto">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Santosh&backgroundColor=f3f4f6" 
                  alt="Santosh - Founder" 
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-extrabold text-black uppercase tracking-widest mb-1 relative z-10">Santosh</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-6 relative z-10">Founder & Lead Developer</p>
              
              {/* Social Links - Staggered entrance */}
              <motion.div 
                className="flex gap-4 justify-center relative z-10"
                variants={staggerLinks}
                animate="animate"
              >
                <motion.a variants={linkVariants} initial="initial" href="https://github.com/Dragon302" target="_blank" rel="noreferrer" className="h-10 w-10 bg-gray-50 text-black flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                  <Github size={18} />
                </motion.a>
                <motion.a variants={linkVariants} initial="initial" href="#" className="h-10 w-10 bg-gray-50 text-black flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                  <Linkedin size={18} />
                </motion.a>
                <motion.a variants={linkVariants} initial="initial" href="mailto:admin@aakruti.com" className="h-10 w-10 bg-gray-50 text-black flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                  <Mail size={18} />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Founder Text (Left Side, slightly delayed) */}
          <motion.div 
            className="md:col-span-8 relative z-10 self-center"
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-extrabold text-black uppercase tracking-tight mb-6 relative">
              <span className="relative z-10">The Vision Behind Aakrutii</span>
              <div className="absolute bottom-0 left-0 w-24 h-1 bg-black rounded-full -mb-3"></div>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                "I built Aakrutii to merge the worlds of software engineering and physical manufacturing. As a developer, I understand the importance of precision, architecture, and flawless execution. I wanted to bring that exact same engineering mindset to the world of 3D printing."
              </p>
              <p>
                "Every line of code on this website, and every layer of polymer we print, is crafted with absolute care. Whether you are a hobbyist needing a custom part, or a designer bringing a complex model to life, my goal is to provide a platform that delivers perfection right to your doorstep."
              </p>
            </div>
          </motion.div>
          
        </div>

        {/* ========================================== */}
        {/* OUR PROCESS SECTION                        */}
        {/* ========================================== */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">Our Process</h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          
          <div className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 bg-gray-50 flex items-center justify-center rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <Cpu size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-3">1. Design & Slice</h3>
            <p className="text-sm text-gray-500">We optimize your digital CAD/STL models, generating the perfect G-code for flawless structural integrity.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 bg-gray-50 flex items-center justify-center rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <Layers size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-3">2. Material Select</h3>
            <p className="text-sm text-gray-500">From durable PLA+ and ABS to ultra-detailed 8K Resin, we match the exact polymer to your functional needs.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 bg-gray-50 flex items-center justify-center rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <Printer size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-3">3. Fabrication</h3>
            <p className="text-sm text-gray-500">Our industrial farm prints your models layer by layer with micron-level precision and strict climate control.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 bg-gray-50 flex items-center justify-center rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <CheckCircle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-3">4. Post-Processing</h3>
            <p className="text-sm text-gray-500">Supports are carefully removed. Resin is washed and UV cured. Every piece passes a strict quality inspection.</p>
          </div>

        </motion.div> {/* 🚀 FIXED: This now properly closes the motion.div above! */}
        
      </div>
    </motion.div>
  );
};

export default About;