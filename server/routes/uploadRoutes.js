const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  // 🚀 THE ULTIMATE ALLOW LIST
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
  const normalizedPath = req.file.path.replace(/\\/g, '/');
  res.send(`/${normalizedPath}`);
});

module.exports = router;