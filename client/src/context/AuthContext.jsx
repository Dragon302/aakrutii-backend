import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in on app load
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      // 🚀 NEW: We check if the backend secretly told us it failed!
      if (data.success === false) {
        throw new Error(data.message);
      }

      // If it didn't fail, log them in as normal!
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
    } catch (error) {
      // If it's our custom error, show it. Otherwise, show a generic one.
      throw new Error(error.message || "Something went wrong.");
    }
  };

  // Register Function
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return true; // Success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false; // Failed
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};