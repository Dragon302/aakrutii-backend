const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const CustomPrint = require('../models/CustomPrint');
const { protect, admin } = require('../middleware/authMiddleware');

// === CONTACT MESSAGES ===
router.post('/messages', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

router.get('/messages', protect, admin, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

router.delete('/messages/:id', protect, admin, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message Deleted' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

// === CUSTOM PRINTS ===
router.post('/prints', async (req, res) => {
  try {
    const printRequest = await CustomPrint.create(req.body);
    res.status(201).json(printRequest);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

router.get('/prints', protect, admin, async (req, res) => {
  try {
    const prints = await CustomPrint.find({}).sort({ createdAt: -1 });
    res.json(prints);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

router.delete('/prints/:id', protect, admin, async (req, res) => {
  try {
    await CustomPrint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Print Request Deleted' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

module.exports = router;