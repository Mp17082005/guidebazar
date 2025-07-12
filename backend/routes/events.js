const express = require('express');
const router = express.Router();

// In-memory storage for events (in production, use a database)
let events = [
  {
    id: 1,
    title: "Tech Startup Summit 2025",
    date: "2025-06-15",
    time: "10:00 AM - 4:00 PM",
    location: "Mumbai",
    type: "startup",
    attendees: 350,
    maxAttendees: 500,
    daysLeft: 12,
    description: "Connect with tech founders and investors from across India.",
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    link: "https://example.com/register/startup-summit-2025"
  },
  {
    id: 2,
    title: "Financial Planning Workshop",
    date: "2025-06-03", 
    time: "2:00 PM - 5:00 PM",
    location: "Online",
    type: "finance",
    attendees: 120,
    maxAttendees: 200,
    daysLeft: 5,
    description: "Learn essential financial skills for students and early professionals.",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb",
    link: "https://zoom.us/meeting/finance-workshop-2025"
  }
];

// Get all events
router.get('/', (req, res) => {
  try {
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
});

// Get event by ID
router.get('/:id', (req, res) => {
  try {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch event', error: error.message });
  }
});

// Create new event
router.post('/', (req, res) => {
  try {
    const { title, description, date, time, location, type, maxAttendees, link } = req.body;
    
    if (!title || !description || !date || !time || !location || !type) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: title, description, date, time, location, type' 
      });
    }

    const newEvent = {
      id: Date.now(), // Simple ID generation
      title,
      description,
      date,
      time,
      location,
      type,
      attendees: 0,
      maxAttendees: maxAttendees || 100,
      daysLeft: Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552", // Default image
      link: link || "" // Event link for registration/joining
    };

    events.push(newEvent);
    res.status(201).json({ success: true, event: newEvent, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create event', error: error.message });
  }
});

// Update event
router.put('/:id', (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const updatedEvent = { ...events[eventIndex], ...req.body, id: eventId };
    events[eventIndex] = updatedEvent;
    
    res.json({ success: true, event: updatedEvent, message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update event', error: error.message });
  }
});

// Delete event
router.delete('/:id', (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    events.splice(eventIndex, 1);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete event', error: error.message });
  }
});

module.exports = router;
