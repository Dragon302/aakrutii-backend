import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import axios from 'axios';

const ProductCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fresh, blank state for a brand new product
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [image, setImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState('');
  const [model3d, setModel3d] = useState(''); 
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  const [uploading, setUploading] = useState(false);

  // Magic File Uploader (Same as your Edit page!)
  const uploadFileHandler = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
      
      if (type === 'image') setImage(data);
      if (type === 'model') setModel3d(data);
      if (type === 'additional') {
        setAdditionalImages(prev => prev ? `${prev}, ${data}` : data);
      }
      
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('File upload failed.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      const imagesArray = additionalImages ? additionalImages.split(',').map(url => url.trim()).filter(url => url !== '') : [];

      // NOTICE: We use POST here to create a new item, instead of PUT!
      await axios.post(`http://localhost:5000/api/products`, {
        name, 
        price, 
        discountPrice, 
        image, 
        additionalImages: imagesArray,
        model3d, 
        countInStock, 
        description,
      }, config);
      
      // Send the admin back to the dashboard when done
      navigate('/admin');
    } catch (error) {
      alert('Failed to create new product. Check your backend console for errors!');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/admin" className="flex items-center text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-orange-500 transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Command Center
        </Link>

        <div className="bg-white p-8 border border-neutral-200 shadow-xl shadow-neutral-200/50 rounded-3xl">
          <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mb-8 border-b border-neutral-100 pb-4">Create New Model</h1>

          <form onSubmit={submitHandler} className="space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Model Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-neutral-50 border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-medium transition-colors" placeholder="e.g. Articulated Dragon" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Regular Price</label>
                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-neutral-50 border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">Sale Price</label>
                <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className="w-full bg-orange-50 border border-orange-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Stock count</label>
                <input type="number" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full bg-neutral-50 border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-medium" />
              </div>
            </div>

            <div className="p-6 border border-neutral-100 bg-neutral-50 rounded-2xl">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Main Product Image</label>
              <div className="flex items-center gap-4">
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border-b border-neutral-300 py-2 focus:outline-none text-sm bg-transparent" placeholder="Image URL or upload..." />
                <label className="cursor-pointer bg-neutral-900 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 flex-shrink-0 flex items-center transition-colors">
                  <UploadCloud size={16} className="mr-2"/> Upload
                  <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, 'image')} />
                </label>
              </div>
            </div>

            <div className="p-6 border border-neutral-100 bg-neutral-50 rounded-2xl">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Additional Images (Gallery)</label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <input type="text" value={additionalImages} onChange={(e) => setAdditionalImages(e.target.value)} className="w-full border-b border-neutral-300 py-2 focus:outline-none text-sm bg-transparent" placeholder="Upload multiple images..." />
                  <label className="cursor-pointer bg-white border border-neutral-300 text-neutral-700 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 flex-shrink-0 flex items-center transition-colors">
                    <UploadCloud size={16} className="mr-2"/> Add Image
                    <input type="file" className="hidden" accept="additionalImages/*"onChange={(e) => uploadFileHandler(e, 'additional')} />
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border border-orange-100 bg-orange-50 rounded-2xl">
              <label className="block text-xs font-bold text-orange-800 uppercase tracking-widest mb-2">Interactive 3D Model (.glb file)</label>
              <div className="flex items-center gap-4">
                <input type="text" value={model3d} onChange={(e) => setModel3d(e.target.value)} className="w-full border-b border-orange-300 py-2 focus:outline-none text-sm bg-transparent" placeholder="Upload a .glb file..." />
                <label className="cursor-pointer bg-orange-500 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-600 flex-shrink-0 flex items-center transition-colors">
                  <UploadCloud size={16} className="mr-2"/> Upload .GLB
                  <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, 'model')} />
                </label>
              </div>
              {uploading && <p className="text-xs text-orange-600 mt-2 font-bold animate-pulse">Uploading file... Please wait.</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2">Description</label>
              <textarea rows="4" required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-neutral-50 border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-medium resize-none"></textarea>
            </div>

            <button type="submit" className="w-full flex justify-center items-center py-5 bg-orange-500 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors mt-8">
              Create Product <Save size={16} className="ml-3" />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;