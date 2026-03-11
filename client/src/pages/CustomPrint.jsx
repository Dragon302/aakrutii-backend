import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UploadCloud, FileBox, Settings, Zap, CheckCircle } from 'lucide-react';

const CustomPrint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    material: 'PLA',
    color: 'Black',
    details: ''
  });
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a 3D file!");

    try {
      // 1. Upload the File First
      const fileData = new FormData();
      fileData.append('file', file);
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data: fileUrl } = await axios.post('https://aakrutii-backend.onrender.com/api/upload', fileData, config);

      // 2. Save the Request to Database with the File URL
      await axios.post('https://aakrutii-backend.onrender.com/api/forms/prints', { ...formData, fileUrl });
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', material: 'PLA', color: 'Black', details: '' });
      setFile(null);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      alert("Upload failed. Make sure your server is running!");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen  font-sans pb-24">
      
      {/* 1. DARK ORANGE HERO SECTION */}
      <section className="bg-neutral-950 py-24 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-orange-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Settings size={14} /> On-Demand Manufacturing
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6 drop-shadow-lg">
              Upload. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Print.</span> Realize.
            </h1>
            <p className="text-neutral-400 text-lg font-medium leading-relaxed max-w-2xl">
              Have your own 3D model? Upload your .STL or .OBJ file below, choose your materials, and get a professional-grade print shipped directly to your door.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE UPLOAD DASHBOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: How it works */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100">
              <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight mb-6 border-b border-neutral-100 pb-4">How It Works</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-black">1</div>
                  <div className="ml-4">
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">Upload File</h4>
                    <p className="text-sm text-neutral-500 mt-1 font-medium">Drop your .STL or .OBJ file.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-black">2</div>
                  <div className="ml-4">
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">Select Specs</h4>
                    <p className="text-sm text-neutral-500 mt-1 font-medium">Choose material, color, and strength.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-black">3</div>
                  <div className="ml-4">
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">Get Quote</h4>
                    <p className="text-sm text-neutral-500 mt-1 font-medium">We review the file and email your custom price.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-500 p-8 rounded-3xl text-white flex flex-col items-start relative overflow-hidden group">
              <Zap size={100} className="absolute -bottom-4 -right-4 text-orange-400 opacity-50 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-lg font-black uppercase tracking-tight mb-2 relative z-10">Need Design Help?</h3>
              <p className="text-sm text-orange-100 font-medium relative z-10 mb-6">Don't have a 3D file yet? Our engineers can design it for you from scratch.</p>
              <button className="bg-white text-orange-500 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors relative z-10">
                Contact Design Team
              </button>
            </div>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="col-span-1 lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-neutral-200/50 border border-neutral-100">
              
              {isSubmitted ? (
                <div className="text-center py-20">
                  <CheckCircle size={64} className="mx-auto text-orange-500 mb-6" />
                  <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-4">Request Received!</h2>
                  <p className="text-neutral-500 font-medium max-w-md mx-auto">
                    Our engineering team is reviewing your file. We will calculate the print time and material cost, and email you a quote within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* BIG FILE UPLOADER */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-4">Upload 3D Model</label>
                    <label className={`w-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${file ? 'border-orange-500 bg-orange-50' : 'border-neutral-300 bg-neutral-50 hover:border-orange-400 hover:bg-orange-50/30'}`}>
                      {file ? (
                        <>
                          <FileBox size={48} className="text-orange-500 mb-4" />
                          <p className="text-sm font-bold text-neutral-900 uppercase tracking-widest">{file.name}</p>
                          <p className="text-xs text-orange-600 mt-2 font-bold">File Attached - Click to change</p>
                        </>
                      ) : (
                        <>
                          <UploadCloud size={48} className="text-neutral-400 mb-4" />
                          <p className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-1">Drag & Drop or Click to Upload</p>
                          <p className="text-xs text-neutral-500 font-medium">Accepts .STL, .OBJ, .STEP (Max 50MB)</p>
                        </>
                      )}
                      <input type="file" className="hidden" accept=".glb,.gltf,.obj,.stl,.fbx,.blend,.step,.iges,.3ds,.dae,.ply,.zip,.rar,.7z" onChange={handleFileChange} required />
                    </label>
                  </div>

                  {/* USER INFO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Your Name</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Email Address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium" placeholder="john@example.com" />
                    </div>
                  </div>

                  {/* PRINT SPECS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-neutral-50 border border-neutral-100 rounded-2xl">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Material Type</label>
                      <select name="material" value={formData.material} onChange={handleChange} className="w-full bg-white border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-medium cursor-pointer">
                        <option value="PLA">PLA (Standard, Cost-Effective)</option>
                        <option value="PETG">PETG (Durable, Heat Resistant)</option>
                        <option value="ABS">ABS (Strong, Impact Resistant)</option>
                        <option value="Resin">Resin (Ultra High Detail)</option>
                        <option value="TPU">TPU (Flexible/Rubber)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Preferred Color</label>
                      <select name="color" value={formData.color} onChange={handleChange} className="w-full bg-white border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-medium cursor-pointer">
                        <option value="Black">Matte Black</option>
                        <option value="White">Pure White</option>
                        <option value="Grey">Prototyping Grey</option>
                        <option value="Orange">Aakruti Orange</option>
                        <option value="Transparent">Clear / Transparent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Additional Instructions (Optional)</label>
                    <textarea rows="4" name="details" value={formData.details} onChange={handleChange} className="w-full bg-neutral-50 border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium resize-none" placeholder="Do you need 100% solid infill? Specific layer height? Let us know..."></textarea>
                  </div>

                  <button type="submit" className="w-full py-5 bg-orange-500 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all">
                    Submit for Quote
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default CustomPrint;