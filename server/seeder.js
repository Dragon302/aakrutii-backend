const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

// Beautiful Dummy Data
const products = [
  {
    name: "Heavy-Duty Danger Tag (Pack of 50)",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
    description: "Industrial-grade lockout tags engineered to withstand harsh chemical environments, extreme temperatures, and heavy physical wear. Features a writable surface and brass grommets.",
    price: 1299,
    countInStock: 500,
  },
  {
    name: "Premium Equipment Lockout Kit",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop",
    description: "The complete safety solution for your facility. Includes 10 customizable warning tags, 5 steel padlocks, and a highly visible carrying pouch. Essential for OSHA compliance.",
    price: 3499,
    countInStock: 120,
  },
  {
    name: "Yellow Caution Inspection Tags",
    image: "https://images.unsplash.com/photo-1541888069542-a63bc1230c11?q=80&w=2070&auto=format&fit=crop",
    description: "High-visibility caution tags perfect for scaffolding, machinery under repair, and daily inspection logs. Tear-resistant synthetic material ensures your message stays intact.",
    price: 899,
    countInStock: 800,
  },
  {
    name: "Custom Brass Identification Plates",
    image: "https://images.unsplash.com/photo-1563200921-667cb56641e7?q=80&w=2070&auto=format&fit=crop",
    description: "Permanent identification for your most valuable assets. These solid brass tags can be custom engraved and provide unparalleled durability in marine or industrial settings.",
    price: 2499,
    countInStock: 50,
  }
];

const importData = async () => {
  try {
    // Clear out old data
    await Product.deleteMany();
    
    // Insert new data
    await Product.insertMany(products);
    
    console.log('✅ Premium Products Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();