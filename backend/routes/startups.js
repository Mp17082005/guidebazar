const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');

// Get all startups
router.get('/', async (req, res) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });
    res.json(startups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new startup
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      description, 
      founder, 
      founderLinkedin,
      foundedYear,
      website, 
      location, 
      tags, 
      positions,
      createdBy,
      industry,
      logo
    } = req.body;
    
    const startup = new Startup({ 
      name, 
      description, 
      founder, 
      founderLinkedin,
      foundedYear,
      website, 
      location, 
      tags, 
      positions,
      createdBy,
      industry,
      logo
    });
    
    await startup.save();
    res.status(201).json(startup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a startup
router.put('/:id', async (req, res) => {
  try {
    const updated = await Startup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a startup
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Startup.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;