const express = require('express');
const router = express.Router();
const MarketplaceItem = require('../models/MarketplaceItem');

// Get all marketplace items
router.get('/', async (req, res) => {
  try {
    const items = await MarketplaceItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new marketplace item
router.post('/', async (req, res) => {
  try {
    const { title, description, price, type, owner, category, condition } = req.body;
    const item = new MarketplaceItem({ title, description, price, type, owner, category, condition });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a marketplace item
router.put('/:id', async (req, res) => {
  try {
    const updated = await MarketplaceItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a marketplace item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MarketplaceItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 