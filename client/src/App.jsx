import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';     // <-- Add this
import Contact from './pages/Contact';
import OrderSuccess from './pages/OrderSuccess';
import ProductEdit from './pages/ProductEdit';
import CustomPrint from './pages/CustomPrint';
import TrackOrder from './pages/TrackOrder';
import Shipping from './pages/Shipping';


function App() {
  return (
    <Router>
      <Navbar />
      {/* pt-16 pushes the content down so it doesn't hide behind the sticky Navbar */}
      <main className="min-h-screen bg-transparent"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/custom-print" element={<CustomPrint />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/shipping" element={<Shipping />} />
        
          
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;