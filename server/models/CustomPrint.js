const mongoose = require('mongoose');

const customPrintSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  material: { type: String, required: true },
  color: { type: String, required: true },
  details: { type: String },
  fileUrl: { type: String, required: true }, // This will hold the .STL file link!
}, { timestamps: true });

module.exports = mongoose.model('CustomPrint', customPrintSchema);