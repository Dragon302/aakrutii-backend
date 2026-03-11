import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, user } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  const redirectParam = location.search ? location.search.split('=')[1] : '/';
  const redirect = redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`;

  useEffect(() => {
    if (user) navigate(redirect);
  }, [user, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (error) {
      alert('Registration failed. Email might already be in use.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-12 shadow-sm border border-gray-100">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-black uppercase tracking-tight mb-2">Create Account</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">Join Aakruti 3D</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Full Name</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Email Address</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full flex justify-center items-center py-4 mt-8 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800">
            Register <UserPlus size={16} className="ml-3" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            Already have an account?{' '}
            <Link to={redirect === '/' ? '/login' : `/login?redirect=${redirect}`} className="text-black font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;