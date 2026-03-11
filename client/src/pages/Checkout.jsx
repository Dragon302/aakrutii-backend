import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CreditCard } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!user) navigate('/login?redirect=/checkout');
    if (cartItems.length === 0) navigate('/cart');
  }, [user, cartItems, navigate]);

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Ask Node.js backend to create a Razorpay Order
      const { data } = await axios.post('https://aakrutii-backend.onrender.com/api/payment/create-order', {
        amount: cartTotal
      });

      // 2. Configure Razorpay Popup options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: data.order.amount,
        currency: 'INR',
        name: 'AAKRUTI 3D',
        description: 'Premium 3D Printing Order',
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // 1. Verify Payment Signature
            const verifyRes = await axios.post('https://aakrutii-backend.onrender.com/api/payment/verify', response);
            
            if (verifyRes.data.success) {
              
              // 2. SAVE THE ORDER TO MONGODB
              const config = {
                headers: { Authorization: `Bearer ${user.token}` }
              };
              
              await axios.post('https://aakrutii-backend.onrender.com/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod: 'Razorpay',
                totalPrice: cartTotal,
                paymentResult: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                }
              }, config);

              // 3. Clear cart and redirect to success page
              cartItems.forEach(item => removeFromCart(item.product));
              navigate(`/order-success?ref=${response.razorpay_payment_id}`);
            }
          } catch (err) {
            console.error("Order completion failed", err);
            alert("Payment verified, but failed to save order. Contact Aakruti Support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#000000' // Aakruti Black
        }
      };

      // 4. Open the Razorpay Window
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();

    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to load payment gateway. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-extrabold text-black uppercase tracking-tight mb-12 border-b border-gray-200 pb-6">
          Secure Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Shipping Form */}
          <div className="w-full lg:w-3/5">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-black border-b border-gray-100 pb-2">1. Shipping Address</h2>
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Street Address</label>
                <input required type="text" name="address" value={shippingAddress.address} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" placeholder="123 Maker Street" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">City</label>
                  <input required type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Postal Code</label>
                  <input required type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" placeholder="400001" />
                </div>
              </div>
            </form>
          </div>

          {/* Right: Order Summary & Pay Button */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-50 p-8 border border-gray-200 sticky top-32">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-black border-b border-gray-200 pb-2">2. Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.product} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-600 flex-1 truncate pr-4">{item.name} <span className="text-black font-bold">x{item.qty}</span></span>
                    <span className="font-medium text-black">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-extrabold text-black mb-8">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : `Pay ₹${cartTotal.toFixed(2)}`}
                <CreditCard size={16} className="ml-2" />
              </button>

              <div className="mt-4 flex items-center justify-center text-xs text-gray-500 uppercase tracking-wider font-bold">
                <ShieldCheck size={16} className="mr-2 text-green-600" /> 100% Secure via Razorpay
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;