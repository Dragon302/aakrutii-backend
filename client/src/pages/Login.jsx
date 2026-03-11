import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Cleaned up your imports into one line!
import { LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle the redirect quirk
  const redirectParam = location.search ? location.search.split('=')[1] : '/';
  const redirect = redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`;

  useEffect(() => {
    // If already logged in, send them to their destination
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clears old errors
    
    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      // 🚀 The error is caught and saved to state here!
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-12 shadow-sm border border-gray-100">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-black uppercase tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">Sign in to Aakruti 3D</p>
        </div>

        {/* ========================================== */}
        {/* 🚀 THE MISSING PIECE: SHOWING THE ERROR    */}
        {/* ========================================== */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 p-4 flex items-start">
            <AlertCircle size={20} className="text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-1">Login Failed</p>
              <p className="text-xs font-medium text-red-600">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" 
              placeholder="admin@aakruti.com" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full flex justify-center items-center py-4 mt-8 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Sign In <LogIn size={16} className="ml-3" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            New Customer?{' '}
            <Link to={redirect === '/' ? '/register' : `/register?redirect=${redirect}`} className="text-black font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;