import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, PencilRuler, Timer, MessageCircleMore, MonitorPlay, ShoppingCart, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://aakrutii-backend.onrender.com/api/forms/messages', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      alert("Failed to send message.");
    }
  };

  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="min-h-screen font-sans pb-24">
      
      {/* ========================================== */}
      {/* 1. "WHAT WE DELIVER" SECTION */}
      {/* ========================================== */}
      <section className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black text-[#3A2318] uppercase tracking-tight drop-shadow-sm">
              What we Deliver
            </h1>
          </motion.div>

          <motion.div 
            variants={containerVariants} initial="hidden" animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 text-center max-w-5xl mx-auto relative"
          >
            {/* Top Left */}
            <motion.div variants={itemVariants} className="flex flex-col items-center md:col-start-1 md:row-start-1 group cursor-default">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="w-20 h-20 mb-6 text-[#3A2318] group-hover:text-orange-500 transition-colors duration-300 flex items-center justify-center">
                <PencilRuler size={64} strokeWidth={1.2} />
              </motion.div>
              <h3 className="text-xl font-black text-[#3A2318] leading-tight">Custom Engineering<br/>Solutions</h3>
            </motion.div>

            {/* Top Right */}
            <motion.div variants={itemVariants} className="flex flex-col items-center md:col-start-3 md:row-start-1 group cursor-default">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="w-20 h-20 mb-6 text-[#3A2318] group-hover:text-orange-500 transition-colors duration-300 flex items-center justify-center">
                <Timer size={64} strokeWidth={1.2} />
              </motion.div>
              <h3 className="text-xl font-black text-[#3A2318] leading-tight">Rapid Prototyping<br/>& R&D</h3>
            </motion.div>

            {/* Center */}
            <motion.div variants={itemVariants} className="flex flex-col items-center md:col-start-2 md:row-start-2 group cursor-default">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="w-20 h-20 mb-6 text-[#3A2318] group-hover:text-orange-500 transition-colors duration-300 flex items-center justify-center">
                <MessageCircleMore size={64} strokeWidth={1.2} />
              </motion.div>
              <h3 className="text-xl font-black text-[#3A2318] leading-tight">Technical Consultation</h3>
            </motion.div>

            {/* Bottom Left */}
            <motion.div variants={itemVariants} className="flex flex-col items-center md:col-start-1 md:row-start-3 group cursor-default">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="w-20 h-20 mb-6 text-[#3A2318] group-hover:text-orange-500 transition-colors duration-300 flex items-center justify-center">
                <MonitorPlay size={64} strokeWidth={1.2} />
              </motion.div>
              <h3 className="text-xl font-black text-[#3A2318] leading-tight">Professional Training<br/>& Workshops</h3>
            </motion.div>

            {/* Bottom Right */}
            <motion.div variants={itemVariants} className="flex flex-col items-center md:col-start-3 md:row-start-3 group cursor-default">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="w-20 h-20 mb-6 text-[#3A2318] group-hover:text-orange-500 transition-colors duration-300 flex items-center justify-center">
                <ShoppingCart size={64} strokeWidth={1.2} />
              </motion.div>
              <h3 className="text-xl font-black text-[#3A2318] leading-tight">Bulk & Batch Manufacturing<br/>for Home & Office</h3>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="text-center mt-20">
            <button 
              onClick={scrollToForm}
              className="bg-white text-[#3A2318] font-extrabold px-12 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Contact Us
            </button>
          </motion.div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 2. CONTACT INFO & FORM SECTION */}
      {/* ========================================== */}
      <section id="contact-form" className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Left Column: Contact Details */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="col-span-1 space-y-8">
              
              <a href="mailto:contact@aakrutii.in" className="block bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-lg shadow-[#3A2318]/5 border border-white/50 flex flex-col items-start group hover:bg-white/80 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-white text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                  <Mail size={24} />
                </div>
                <h3 className="text-sm font-black text-[#3A2318] uppercase tracking-widest mb-2">Email Us</h3>
                <p className="text-[#5C3E2E] text-sm font-medium">contact@aakrutii.in</p>
              </a>

              <a href="https://wa.me/919637757818" target="_blank" rel="noopener noreferrer" className="block bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-lg shadow-[#3A2318]/5 border border-white/50 flex flex-col items-start group hover:bg-white/80 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-white text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-sm font-black text-[#3A2318] uppercase tracking-widest mb-2">WhatsApp Us</h3>
                <p className="text-[#5C3E2E] text-sm font-medium">+91 9637757818</p>
                <p className="text-[#5C3E2E]/70 text-xs font-medium mt-1">Mon-Sat, 9am - 6pm</p>
              </a>

              {/* Added smooth scroll down to the map when clicking the location card */}
              <button onClick={() => document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' })} className="w-full text-left block bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-lg shadow-[#3A2318]/5 border border-white/50 flex flex-col items-start group hover:bg-white/80 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-white text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                  <MapPin size={24} />
                </div>
                <h3 className="text-sm font-black text-[#3A2318] uppercase tracking-widest mb-2">Studio Location</h3>
                <p className="text-[#5C3E2E] text-sm font-medium leading-relaxed">
                  Aakrutii 266/1, Mayur Park, Vaijapur Road, Gangapur, Dist Chh. Sambhajinagar 431109
                </p>
              </button>
            </motion.div>

            {/* Right Column: The Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="col-span-1 md:col-span-2">
              <div className="bg-white/60 backdrop-blur-md p-10 md:p-14 rounded-[2rem] shadow-xl shadow-[#3A2318]/5 border border-white/50">
                <h2 className="text-3xl font-black text-[#3A2318] uppercase tracking-tight mb-8">Send a Message</h2>
                
                {isSubmitted && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-orange-100/50 border border-orange-200 text-orange-700 rounded-xl text-sm font-bold flex items-center backdrop-blur-sm">
                    <Send size={16} className="mr-2" /> Message sent successfully! We will reply soon.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">Your Name</label>
                      <input 
                        required type="text" name="name" value={formData.name} onChange={handleChange}
                        className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium text-[#3A2318] placeholder-[#5C3E2E]/50" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">Email Address</label>
                      <input 
                        required type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium text-[#3A2318] placeholder-[#5C3E2E]/50" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">Subject</label>
                    <input 
                      required type="text" name="subject" value={formData.subject} onChange={handleChange}
                      className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium text-[#3A2318] placeholder-[#5C3E2E]/50" 
                      placeholder="Custom 3D Print Quote"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C3E2E] uppercase tracking-widest mb-2">Message</label>
                    <textarea 
                      required rows="6" name="message" value={formData.message} onChange={handleChange}
                      className="w-full bg-white/50 border border-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-sm font-medium resize-none text-[#3A2318] placeholder-[#5C3E2E]/50" 
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full md:w-auto px-10 py-5 bg-[#3A2318] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center group"
                  >
                    Send Message <Send size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 🚀 3. THE LIVE MAP SECTION                 */}
      {/* ========================================== */}
      <section id="map-section" className="pt-10 pb-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="bg-white/60 backdrop-blur-md p-4 rounded-[2.5rem] shadow-xl shadow-[#3A2318]/5 border border-white/50 overflow-hidden"
          >
            <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden relative">
              <iframe 
                title="Aakrutii Studio Location"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                /* Searching Google Maps for your specific region */
                src="https://maps.google.com/maps?q=Mayur%20Park,%20Vaijapur%20Road,%20Gangapur,%20Sambhajinagar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;