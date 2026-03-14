const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

// 🚀 1. Configure Cloudinary using your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🚀 2. Tell Multer to send files straight to Cloudinary instead of the local folder
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'aakrutii_uploads', // Cloudinary will create this folder for you
      resource_type: 'auto',      // CRUCIAL: 'auto' tells Cloudinary to accept both images AND 3D models!
      public_id: `${file.fieldname}-${Date.now()}`
    };
  },
});

const fileFilter = (req, file, cb) => {
  // 🚀 THE ULTIMATE ALLOW LIST (Kept exactly as you wrote it!)
  // Includes all images, all 3D formats, and zip/rar archives for bundled textures!
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg|bmp|tiff|glb|gltf|obj|stl|fbx|blend|step|iges|3ds|dae|ply|max|unitypackage|zip|rar|7z/i;
  
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb('Error: Unrecognized 3D Model or Image format!');
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  // 🚀 Cloudinary automatically creates a permanent, secure HTTPS link.
  // We send this link directly back so it saves flawlessly in your MongoDB database!
  res.send(req.file.path);
});

module.exports = router;