const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Scholarship = require('../models/Scholarship');

// Middleware for basic admin authentication (simple for now)
const isAdmin = (req, res, next) => {
  // For now, we'll use a simple check. In production, use proper authentication
  const adminKey = req.headers['x-admin-key'];
  if (adminKey === 'admin123') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized. Admin access required.' });
  }
};

// EVENT ROUTES

// Get all events (public)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all events for admin (including inactive)
router.get('/admin/events', isAdmin, async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event (admin only)
router.post('/admin/events', isAdmin, async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update event (admin only)
router.put('/admin/events/:id', isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete event (admin only)
router.delete('/admin/events/:id', isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SCHOLARSHIP ROUTES

// Get all scholarships (public)
router.get('/scholarships', async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all scholarships for admin (including inactive)
router.get('/admin/scholarships', isAdmin, async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new scholarship (admin only)
router.post('/admin/scholarships', isAdmin, async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    const savedScholarship = await scholarship.save();
    res.status(201).json(savedScholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update scholarship (admin only)
router.put('/admin/scholarships/:id', isAdmin, async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete scholarship (admin only)
router.delete('/admin/scholarships/:id', isAdmin, async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN DASHBOARD STATS
router.get('/admin/stats', isAdmin, async (req, res) => {
  try {
    const eventCount = await Event.countDocuments({ isActive: true });
    const scholarshipCount = await Scholarship.countDocuments({ isActive: true });
    const totalEvents = await Event.countDocuments();
    const totalScholarships = await Scholarship.countDocuments();
    
    res.json({
      events: {
        active: eventCount,
        total: totalEvents
      },
      scholarships: {
        active: scholarshipCount,
        total: totalScholarships
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
