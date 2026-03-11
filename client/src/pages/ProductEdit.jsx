import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // ALL STATE VARIABLES DEFINED HERE
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [image, setImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState(''); // <-- The missing link!
  const [model3d, setModel3d] = useState(''); 
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) return navigate('/');

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setDiscountPrice(data.discountPrice || 0);
        setImage(data.image);
        // Load existing additional images as a comma-separated string
        setAdditionalImages(data.additionalImages ? data.additionalImages.join(', ') : '');
        setModel3d(data.model3d || '');
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };
    fetchProduct();
  }, [id, user, navigate]);

  // THE MAGIC FILE UPLOADER FUNCTION
  const uploadFileHandler = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
      
      // Route the uploaded file to the right box!
      if (type === 'image') setImage(data);
      if (type === 'model') setModel3d(data);
      if (type === 'additional') {
        // Automatically add commas between multiple uploads!
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
      
      // Convert comma-separated string back to a clean array before saving
      const imagesArray = additionalImages.split(',').map(url => url.trim()).filter(url => url !== '');

      await axios.put(`http://localhost:5000/api/products/${id}`, {
        name, 
        price, 
        discountPrice, 
        image, 
        additionalImages: imagesArray, // <-- Saved to DB!
        model3d, 
        countInStock, 
        description,
      }, config);
      
      navigate('/admin');
    } catch (error) {
      alert('Failed to update product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/admin" className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Command Center
        </Link>

        <div className="bg-white p-8 border border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-black mb-8 border-b border-gray-100 pb-4">Edit 3D Model</h1>

          <form onSubmit={submitHandler} className="space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Model Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Regular Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-red-600 uppercase tracking-widest mb-2">Sale Price</label>
                <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className="w-full border-b border-red-300 py-2 focus:outline-none focus:border-red-600" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Stock</label>
                <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
              </div>
            </div>

            {/* MAIN IMAGE UPLOADER */}
            <div className="p-4 border border-gray-200 bg-gray-50">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Main Product Image</label>
              <div className="flex items-center gap-4">
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none text-sm bg-transparent" placeholder="Enter image URL or upload file..." />
                <label className="cursor-pointer bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 flex-shrink-0 flex items-center">
                  <UploadCloud size={16} className="mr-2"/> Upload
                  <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, 'image')} />
                </label>
              </div>
            </div>

            {/* MULTIPLE ADDITIONAL IMAGES UPLOADER */}
            <div className="p-4 border border-gray-200 bg-gray-50">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Additional Images (Gallery)</label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <input type="text" value={additionalImages} onChange={(e) => setAdditionalImages(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none text-sm bg-transparent" placeholder="Upload multiple images for the gallery..." />
                  <label className="cursor-pointer bg-white border border-black text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 flex-shrink-0 flex items-center transition-colors">
                    <UploadCloud size={16} className="mr-2"/> Add Image
                    <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, 'additional')} />
                  </label>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">You can click "Add Image" multiple times to stack them!</p>
              </div>
            </div>

            {/* 3D MODEL UPLOADER */}
            <div className="p-4 border border-blue-100 bg-blue-50/30">
              <label className="block text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">Interactive 3D Model (.glb file)</label>
              <div className="flex items-center gap-4">
                <input type="text" value={model3d} onChange={(e) => setModel3d(e.target.value)} className="w-full border-b border-blue-300 py-2 focus:outline-none text-sm bg-transparent" placeholder="Upload a .glb file for the 3D viewer..." />
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-blue-700 flex-shrink-0 flex items-center">
                  <UploadCloud size={16} className="mr-2"/> Upload .GLB
                  <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, 'model')} />
                </label>
              </div>
              {uploading && <p className="text-xs text-blue-600 mt-2 font-bold animate-pulse">Uploading file... Please wait.</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Description</label>
              <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors text-sm"></textarea>
            </div>

            <button type="submit" className="w-full flex justify-center items-center py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors mt-8">
              Save Changes <Save size={16} className="ml-3" />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;