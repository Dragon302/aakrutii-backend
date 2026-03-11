import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get('ref');

  // Confetti effect can go here in a production app!

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-8">
        
        <div className="flex justify-center">
          <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-500" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-black uppercase tracking-tight mb-4">Payment Successful!</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Thank you for choosing Aakruti. Your 3D printing order has been received and is now being queued for fabrication.
          </p>
        </div>

        {referenceNum && (
          <div className="bg-gray-50 p-4 border border-gray-200 text-sm">
            <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Razorpay Reference ID</span>
            <span className="font-mono text-black font-bold">{referenceNum}</span>
          </div>
        )}

        <div className="pt-8 flex flex-col space-y-4">
          <Link 
            to="/profile" 
            className="w-full flex justify-center items-center py-4 border border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
          >
            <Package size={16} className="mr-2" /> View Order Status
          </Link>
          <Link 
            to="/products" 
            className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;