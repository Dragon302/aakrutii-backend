import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, MessageCircle, AtSign, Box } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand & Socials */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Box size={28} className="text-orange-500" />
              <span className="text-2xl font-black tracking-tighter text-white">AAKRUTI</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-6 font-medium leading-relaxed">
              Bridging the gap between imagination and reality with premium 3D printing and micron-level precision.
            </p>
            
            {/* 🚀 UPDATED SOCIAL MEDIA LINKS */}
            <div className="flex space-x-4">
              {/* WhatsApp */}
              <a href="https://wa.me/918605161763" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <MessageCircle size={20} />
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/aakrutii.in" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@Aakrutii_in" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <Youtube size={20} />
              </a>
              {/* Threads */}
              <a href="https://www.threads.com/@aakrutii.in" target="_blank" rel="noopener noreferrer" title="Threads" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <AtSign size={20} />
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/aakrutii/?viewAsMember=true" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">3D Model Gallery</Link></li>
              <li><Link to="/products" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Premium Resins</Link></li>
              <li><Link to="/custom-print" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Custom Printing</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/track-order" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Track Order</Link></li>
              <li><Link to="/shipping-policy" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Return Policy</Link></li>
              <li><Link to="/contact" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Stay Updated</h3>
            <p className="text-sm text-neutral-400 mb-4">Subscribe for new material drops and exclusive 3D model sales.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter email..." 
                className="bg-neutral-900 border border-neutral-800 text-white px-4 py-2 w-full focus:outline-none focus:border-orange-500 text-sm rounded-l-lg transition-colors"
              />
              <button type="submit" className="bg-orange-500 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors rounded-r-lg">
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 text-center">
          <p className="text-xs text-neutral-500 font-medium">
            &copy; {new Date().getFullYear()} Aakrutii. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;