import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, MessageSquare, Printer, ShoppingCart, Trash2, Edit, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [prints, setPrints] = useState([]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        
        // Fetch Inventory
        const { data: prodData } = await axios.get('http://localhost:5000/api/products');
        setProducts(prodData);

        // Fetch Messages
        const { data: msgData } = await axios.get('http://localhost:5000/api/forms/messages', config);
        setMessages(msgData);

        // Fetch Custom Prints
        const { data: printData } = await axios.get('http://localhost:5000/api/forms/prints', config);
        setPrints(printData);

      } catch (error) {
        console.error('Error fetching admin data', error);
      }
    };
    fetchData();
  }, [user, navigate]);

  // THE NEW QUICK-DRAFT FUNCTION
  const createProductHandler = async () => {
    if (window.confirm('Create a new blank model?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        
        // Creating the empty draft data
        const emptyProduct = {
          name: 'New Draft Model',
          price: 0,
          discountPrice: 0,
          image: '',
          additionalImages: [],
          model3d: '',
          countInStock: 0,
          description: 'Enter description here...'
        };

        // Send it to the database
        const { data } = await axios.post(`http://localhost:5000/api/products`, emptyProduct, config);
        
        // Instantly redirect to edit this new draft!
        const newProductId = data._id || data.product._id; 
        navigate(`/admin/product/${newProductId}/edit`);
      } catch (error) {
        alert('Failed to create empty draft.');
      }
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) { alert('Failed to delete product'); }
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/forms/messages/${id}`, config);
        setMessages(messages.filter((m) => m._id !== id));
      } catch (error) { alert('Failed to delete message'); }
    }
  };

  const deletePrint = async (id) => {
    if (window.confirm('Delete this print request?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/forms/prints/${id}`, config);
        setPrints(prints.filter((p) => p._id !== id));
      } catch (error) { alert('Failed to delete print request'); }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans pb-20">
      
      {/* HEADER */}
      <div className="bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Command Center</h1>
            <p className="text-orange-500 text-sm font-bold uppercase tracking-widest">Aakruti 3D Admin Dashboard</p>
          </div>
          <button onClick={createProductHandler} className="mt-6 md:mt-0 bg-orange-500 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
            + Create New Model
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-20px] relative z-10">
        
        {/* TABS */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 flex overflow-x-auto mb-8 p-2">
          <button onClick={() => setActiveTab('inventory')} className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'inventory' ? 'bg-orange-50 text-orange-600' : 'text-neutral-500 hover:bg-neutral-50'}`}>
            <Package size={16} className="mr-2" /> Inventory
          </button>
          <button onClick={() => setActiveTab('messages')} className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'messages' ? 'bg-orange-50 text-orange-600' : 'text-neutral-500 hover:bg-neutral-50'}`}>
            <MessageSquare size={16} className="mr-2" /> Messages ({messages.length})
          </button>
          <button onClick={() => setActiveTab('prints')} className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'prints' ? 'bg-orange-50 text-orange-600' : 'text-neutral-500 hover:bg-neutral-50'}`}>
            <Printer size={16} className="mr-2" /> Custom Prints ({prints.length})
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-orange-50 text-orange-600' : 'text-neutral-500 hover:bg-neutral-50'}`}>
            <ShoppingCart size={16} className="mr-2" /> Orders
          </button>
        </div>

        {/* TAB CONTENT */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          
          {/* INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <th className="p-4">Image</th>
                    <th className="p-4">Model Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {products.map(product => (
                    <tr key={product._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4"><img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-neutral-200" /></td>
                      <td className="p-4 font-bold text-neutral-900">{product.name}</td>
                      <td className="p-4 font-medium text-neutral-600">₹{product.discountPrice > 0 ? product.discountPrice : product.price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-3">
                        <Link to={`/admin/product/${product._id}/edit`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></Link>
                        <button onClick={() => deleteProduct(product._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* MESSAGES */}
          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.length === 0 && <p className="text-neutral-500 font-bold uppercase p-4">No new messages.</p>}
              {messages.map(msg => (
                <div key={msg._id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 relative">
                  <button onClick={() => deleteMessage(msg._id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">{msg.createdAt?.substring(0, 10)}</p>
                  <h3 className="text-lg font-black text-neutral-900 mb-1">{msg.subject}</h3>
                  <p className="text-sm font-bold text-neutral-600 mb-4">{msg.name} ({msg.email})</p>
                  <p className="text-sm text-neutral-600 bg-neutral-50 p-4 rounded-xl border border-neutral-100">{msg.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* CUSTOM PRINTS */}
          {activeTab === 'prints' && (
            <div className="grid grid-cols-1 gap-6">
              {prints.length === 0 && <p className="text-neutral-500 font-bold uppercase p-4">No custom print requests yet.</p>}
              {prints.map(print => (
                <div key={print._id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">{print.createdAt?.substring(0, 10)}</p>
                    <h3 className="text-lg font-black text-neutral-900 mb-1">{print.name} <span className="text-sm font-medium text-neutral-500">({print.email})</span></h3>
                    <div className="flex gap-4 mt-3">
                      <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Material: {print.material}</span>
                      <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Color: {print.color}</span>
                    </div>
                    {print.details && <p className="text-sm text-neutral-600 mt-4 bg-neutral-50 p-3 rounded-lg">Notes: {print.details}</p>}
                  </div>
                  
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <a href={print.fileUrl?.startsWith('http') ? print.fileUrl : `http://localhost:5000${print.fileUrl}`} download target="_blank" rel="noreferrer" className="flex items-center justify-center bg-orange-500 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
                      <Download size={16} className="mr-2" /> Download File
                    </a>
                    <button onClick={() => deletePrint(print._id)} className="flex items-center justify-center bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors">
                      <Trash2 size={16} className="mr-2" /> Delete Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ORDERS (Placeholder) */}
          {activeTab === 'orders' && (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-neutral-200 text-center">
              <ShoppingCart size={48} className="mx-auto text-neutral-300 mb-4" />
              <h2 className="text-xl font-black text-neutral-900 uppercase tracking-tight mb-2">Order Management</h2>
              <p className="text-neutral-500 font-medium max-w-md mx-auto">
                Once we connect the Razorpay checkout system, all customer orders and shipping addresses will appear here.
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default Admin;